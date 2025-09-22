// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 129.99,
        description: "High-quality wireless headphones with noise cancellation",
        image: "https://via.placeholder.com/300x300?text=Wireless+Headphones"
    },
    {
        id: 2,
        name: "Smartphone",
        price: 699.99,
        description: "Latest smartphone with high-resolution camera",
        image: "https://via.placeholder.com/300x300?text=Smartphone"
    },
    {
        id: 3,
        name: "Laptop",
        price: 999.99,
        description: "Thin and light laptop with long battery life",
        image: "https://via.placeholder.com/300x300?text=Laptop"
    },
    {
        id: 4,
        name: "Smart Watch",
        price: 249.99,
        description: "Fitness tracker and smartwatch with heart rate monitor",
        image: "https://via.placeholder.com/300x300?text=Smart+Watch"
    },
    {
        id: 5,
        name: "Bluetooth Speaker",
        price: 79.99,
        description: "Portable speaker with excellent sound quality",
        image: "https://via.placeholder.com/300x300?text=Bluetooth+Speaker"
    },
    {
        id: 6,
        name: "Gaming Console",
        price: 499.99,
        description: "Next-gen gaming console with immersive gameplay",
        image: "https://via.placeholder.com/300x300?text=Gaming+Console"
    }
];

// Cart array to store added products
let cart = [];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const overlay = document.getElementById('overlay');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');

// Display products
function displayProducts() {
    productsGrid.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });

    // Add event listeners to Add to Cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
    openCart();
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update quantity of item in cart
function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity > 0 ? newQuantity : 1;
        updateCart();
    }
}

// Update cart UI
function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        count += item.quantity;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = count;

    // Add event listeners to quantity buttons
    const decreaseButtons = document.querySelectorAll('.decrease');
    const increaseButtons = document.querySelectorAll('.increase');
    const removeButtons = document.querySelectorAll('.remove-item');
    const quantityInputs = document.querySelectorAll('.quantity-input');

    decreaseButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            const item = cart.find(item => item.id === id);
            if (item) {
                updateQuantity(id, item.quantity - 1);
            }
        });
    });

    increaseButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            const item = cart.find(item => item.id === id);
            if (item) {
                updateQuantity(id, item.quantity + 1);
            }
        });
    });

    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(id);
        });
    });

    quantityInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            const newQuantity = parseInt(e.target.value);
            if (!isNaN(newQuantity) && newQuantity > 0) {
                updateQuantity(id, newQuantity);
            }
        });
    });
}

// Open cart sidebar
function openCart() {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close cart sidebar
function closeCartSidebar() {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event listeners
cartIcon.addEventListener('click', openCart);
closeCart.addEventListener('click', closeCartSidebar);
overlay.addEventListener('click', closeCartSidebar);

// Initialize the page
displayProducts();
