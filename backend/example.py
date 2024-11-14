import requests
from bs4 import BeautifulSoup

# URL of the Etsy product page
url = 'https://www.etsy.com/in-en/listing/1319905508/relaxed-mohair-sweater-in-lava-hand-knit?ref=anchored_listing&frs=1'

# Set headers to mimic a browser visit
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}

# Send a request to the page
response = requests.get(url, headers=headers)

# Parse the HTML content
soup = BeautifulSoup(response.content, 'html.parser')

# Extract product title
title = soup.find('h1', {'data-buy-box-listing-title': True})
if title:
    print(f"Product Title: {title.get_text(strip=True)}")

# Extract product details (like description or bullet points)
description = soup.find('p', {'class': 'wt-text-body-01 wt-break-word'})
if description:
    print(f"Description: {description.get_text(strip=True)}")

# Extract price if available
price = soup.find('p', {'class': 'wt-text-title-03'})
if price:
    print(f"Price: {price.get_text(strip=True)}")
