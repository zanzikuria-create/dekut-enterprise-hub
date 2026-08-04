from models import Product

products = [
    Product(
        id=1,
        name="DeKUT Coffee",
        category="Beverage",
        price=350,
        description="Premium coffee produced by DeKUT.",
        location="Enterprise Shop",
        available=True,
        image="coffee.jpg"
    ),

    Product(
        id=2,
        name="DeKUT Yogurt",
        category="Dairy",
        price=80,
        description="Fresh and nutritious yogurt.",
        location="Dairy Unit",
        available=True,
        image="yogurt.jpg"
    ),

    Product(
        id=3,
        name="Fresh Milk",
        category="Dairy",
        price=70,
        description="Fresh milk from the university dairy farm.",
        location="Dairy Unit",
        available=True,
        image="milk.jpg"
    ),

    Product(
        id=4,
        name="Natural Honey",
        category="Natural Products",
        price=600,
        description="Pure natural honey harvested by DeKUT.",
        location="Enterprise Shop",
        available=True,
        image="honey.jpg"
    ),

    Product(
        id=5,
        name="Tree Seedlings",
        category="Agriculture",
        price=150,
        description="High-quality tree seedlings.",
        location="Agriculture Department",
        available=True,
        image="seedlings.jpg"
    ),

    Product(
        id=6,
        name="Branded Merchandise",
        category="Merchandise",
        price=1200,
        description="Official DeKUT hoodies, T-shirts, caps and notebooks.",
        location="University Bookshop",
        available=True,
        image="merchandise.jpg"
    ),

    Product(
        id=7,
        name="Conference & Accommodation",
        category="Services",
        price=4500,
        description="Conference facilities and guest accommodation services.",
        location="Conference Centre",
        available=True,
        image="conference.jpg"
    ),

    Product(
        id=8,
        name="Groceries",
        category="Retail",
        price=0,
        description="Daily grocery products available on campus.",
        location="University Shop",
        available=True,
        image="groceries.jpg"
    ),

    Product(
        id=9,
        name="Detergents",
        category="Household Products",
        price=200,
        description="Cleaning and detergent products.",
        location="University Shop",
        available=True,
        image="detergent.jpg"
    )
]