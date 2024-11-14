// src/apiService.js

// Existing function to search products
export async function searchProducts(query) {
    const response = await fetch(`http://127.0.0.1:5000/search_sorted?query=${query}`);
    if (!response.ok) {
        throw new Error("Failed to fetch data from the backend");
    }
    return response.json();
}

// Existing function to fetch all products
export async function fetchAllProducts() {
    const response = await fetch("http://127.0.0.1:5000/products");
    if (!response.ok) {
        throw new Error("Failed to fetch all products from the backend");
    }
    return response.json();
}

// New function to fetch only fashion products
export async function fetchFashionProducts() {
    const response = await fetch("http://127.0.0.1:5000/products/fashion");
    if (!response.ok) {
        throw new Error("Failed to fetch fashion products from the backend");
    }
    return response.json();
}

// Function to fetch products by category
export async function fetchProductsByCategory(category) {
    const response = await fetch(`http://127.0.0.1:5000/products/${category}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${category} products from the backend`);
    }
    return response.json();
}

// Individual category functions (optional for clarity)
export async function fetchJewelryProducts() {
    return fetchProductsByCategory('jewelry');
}

export async function fetchWomenProducts() {
    return fetchProductsByCategory('women');
}

export async function fetchMenProducts() {
    return fetchProductsByCategory('men');
}

export async function fetchPackagingProducts() {
    return fetchProductsByCategory('packaging');
}

export async function fetchBulkOrderProducts() {
    return fetchProductsByCategory('bulk orders');
}

export async function fetchChildrenProducts() {
    return fetchProductsByCategory('children');
}

export async function fetchHandmadeGifts() {
    return fetchProductsByCategory('handmadeProducts'); 
}
