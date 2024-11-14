from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from PIL import Image

from io import BytesIO


app = Flask(__name__)
CORS(app)  # Enables CORS for all routes

# Load the product data from products.csv
try:
    product_data = pd.read_csv('products.csv')
except FileNotFoundError:
    print("Error: products.csv file not found. Make sure it's in the same directory as app.py.")
    exit()

# Define a base carbon footprint mapping based on material type
MATERIAL_FOOTPRINT = {
    'cotton': 5,
    'plastic': 20,
    'metal': 15,
    'wood': 7,
    'glass': 10,
    'ceramic': 8,
    'leather': 12
}

# Calculate carbon footprint for each product
def calculate_carbon_footprint(manufacturing_type, material):
    base_footprint = 10  # Base footprint for non-handmade items
    if manufacturing_type.lower() == 'handmade':
        base_footprint *= 0.6  # 40% reduction for handmade
    material_footprint = MATERIAL_FOOTPRINT.get(material.lower(), 0)
    return base_footprint + material_footprint

# Apply the carbon footprint calculation and add a new column
product_data['carbon_footprint'] = product_data.apply(
    lambda row: calculate_carbon_footprint(row['type'], row['material']),
    axis=1
)

# Dummy function to extract image features from URL
def extract_image_features_from_url(image_url):
    try:
        # Fetch image from URL
        response = requests.get(image_url)
        response.raise_for_status()  # Check if the request was successful

        # Open image from the fetched content
        image = Image.open(BytesIO(response.content))
        image = image.convert("L").resize((64, 64))  # Convert to grayscale and resize
        
        # Flatten image for feature extraction
        return np.array(image).flatten()
    except Exception as e:
        print(f"Error processing image at {image_url}: {e}")
        return np.zeros((64 * 64,))  # Return a zero vector if there's an error

# Apply feature extraction to product data
product_data['feature_vector'] = product_data['image'].apply(extract_image_features_from_url)

# Endpoint to fetch products by category
@app.route('/products/<category>', methods=['GET'])
def get_products_by_category(category):
    filtered_data = product_data[product_data['category'].str.lower() == category.lower()]
    results = filtered_data[['id', 'name', 'price', 'image', 'link', 'material', 'type', 'carbon_footprint']].to_dict(orient='records')
    return jsonify(results)

# Endpoint to handle text search and image search
@app.route('/search', methods=['POST'])
def search():
    if 'text' in request.json:
        # Handle text search
        search_text = request.json['text'].lower()
        filtered_data = product_data[product_data['name'].str.lower().str.contains(search_text)]
        results = filtered_data[['id', 'name', 'price', 'image', 'link', 'material', 'type', 'carbon_footprint']].to_dict(orient='records')
        return jsonify(results)
    
    if 'image' in request.files:
        # Handle image search
        uploaded_image = request.files['image']
        try:
            # Process the uploaded image
            image = Image.open(uploaded_image)
            image = image.convert("L").resize((64, 64))
            query_vector = np.array(image).flatten().reshape(1, -1)

            # Compute similarity between the query image and product images
            product_vectors = np.stack(product_data['feature_vector'].values)
            similarities = cosine_similarity(query_vector, product_vectors).flatten()

            # Get the top 5 most similar products
            top_indices = similarities.argsort()[-5:][::-1]
            similar_products = product_data.iloc[top_indices][['id', 'name', 'price', 'image', 'link', 'material', 'type', 'carbon_footprint']].to_dict(orient='records')

            return jsonify(similar_products)
        
        except Exception as e:
            print(f"Error processing uploaded image: {e}")
            return jsonify({'error': 'Failed to process the image'}), 500
    
    return jsonify({'error': 'No valid search parameters provided'}), 400

if __name__ == "__main__":
    app.run(debug=True)
