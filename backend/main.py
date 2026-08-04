from fastapi import FastAPI
from routes import products

app = FastAPI(
    title="DeKUT Enterprise Hub API",
    description="Quality Products. Proudly DeKUT.",
    version="1.0.0"
)

@app.get("/")
def home():
    return {
        "message": "Welcome to DeKUT Enterprise Hub API",
        "slogan": "Quality Products. Proudly DeKUT."
    }


@app.get("/products")
def get_products():
    return products
@app.get("/products/{product_id}")
def get_product(product_id: int):
    for product in products:
        if product.id == product_id:
            return product

    return {
        "error": "Product not found."
    }