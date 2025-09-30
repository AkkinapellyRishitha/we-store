// Product data with relevant images
const products = [
    {
        id: 1,
        name: "Floral Summer Dress",
        price: 1299,
        category: "women",
        image: "https://glossnglitters.com/wp-content/uploads/2019/05/Vintage-Clothing-Floral-Maxi-Dress.png",
        description: "A beautiful floral print dress perfect for summer outings. Made from breathable cotton fabric.",
        badge: "New"
    },
    {
        id: 2,
        name: "Classic White Shirt",
        price: 899,
        category: "shirts",
        image: "https://castlecrown.co.in/cdn/shop/files/4_ff17f862-2f1e-4462-884a-1bd2f48fe919.png?v=1746163934",
        description: "A timeless white shirt that can be dressed up or down. Perfect for any occasion.",
        badge: "Bestseller"
    },
    {
        id: 3,
        name: "Kids Cartoon T-Shirt",
        price: 499,
        category: "kids",
        image: "https://prabhubhakti.com/cdn/shop/files/y15_1024x.png?v=1714629537",
        description: "Fun and colorful t-shirt with cartoon prints that kids will love. Made from soft, comfortable cotton.",
        badge: "Sale"
    },
    {
        id: 4,
        name: "Men's Denim Jeans",
        price: 1599,
        category: "men",
        image: "https://i.pinimg.com/736x/2e/b8/e1/2eb8e1bc9902fb644009c45242530c43.jpg",
        description: "Classic fit denim jeans with a modern twist. Durable and stylish for everyday wear.",
        badge: "Popular"
    },
    {
        id: 5,
        name: "Women's Handbag",
        price: 1999,
        category: "women",
        image: "https://24thspoke.in/cdn/shop/files/tb-image_share_1722789151391_jpg.png?v=1722789185&width=1024",
        description: "Elegant handbag with multiple compartments. Perfect for work or casual outings.",
        badge: "Limited"
    },
    {
        id: 6,
        name: "Kids Summer Shorts",
        price: 399,
        category: "kids",
        image: "https://i.ebayimg.com/images/g/nlgAAOSwLqxnW8Eh/s-l400.png",
        description: "Comfortable shorts for kids made from soft fabric. Available in various colors.",
        badge: "Sale"
    },
    {
        id: 7,
        name: "Men's Polo Shirt",
        price: 799,
        category: "men",
        image: "https://epg.in/cdn/shop/files/EPGHalfSleeve_sPureCottonMen_sPoloTShirt-Maroon.png?v=1686728575",
        description: "Classic polo shirt in a variety of colors. Perfect for a smart-casual look.",
        badge: "New"
    },
    {
        id: 8,
        name: "Women's Casual Top",
        price: 699,
        category: "women",
        image: "https://5.imimg.com/data5/SELLER/Default/2022/9/JB/GQ/AB/158199555/m-bb-2203-dps-black-brusa-original-imaggxf8qxrswgcj-500x500.png",
        description: "Stylish casual top that can be paired with jeans or skirts for a chic look.",
        badge: "Trending"
    },
    {
        id: 9,
        name: "Checkered Shirt",
        price: 999,
        category: "shirts",
        image: "https://unclutteredcloset.in/cdn/shop/files/FullSleevelcCheckCottonLinenBlend-blue_3.png?v=1755110140",
        description: "Classic checkered pattern shirt that never goes out of style. Perfect for a casual look.",
        badge: "Classic"
    },
    {
        id: 10,
        name: "Kids Party Dress",
        price: 899,
        category: "kids",
        image: "https://e7.pngegg.com/pngimages/690/220/png-clipart-cocktail-dress-gown-children-s-clothing-dress-cocktail-dress-gown.png",
        description: "Beautiful party dress for kids with elegant design and comfortable fit.",
        badge: "Special"
    },
    {
        id: 11,
        name: "Men's Casual Shirt",
        price: 849,
        category: "men",
        image: "https://store.digitalteamindia.com/assets/images/products/14042023015939_3417.png",
        description: "Comfortable casual shirt perfect for weekend outings. Made from breathable fabric.",
        badge: "Comfort"
    },
    {
        id: 12,
        name: "Women's Maxi Dress",
        price: 1499,
        category: "women",
        image: "https://rimzimfashion.com/cdn/shop/files/12.png?v=1722925144",
        description: "Elegant maxi dress with a flattering silhouette. Perfect for special occasions.",
        badge: "Elegant"
    }
];

// Cart data
let cart = [];
let likedProducts = new Set();

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderProducts('all');
    updateCartCount();
});

// Render products based on category
function renderProducts(category) {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';
    
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            <img src="${product.image}" alt="${product.name}" class="product-image" onclick="showProductDetail(${product.id})">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">₹${product.price}</p>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="btn btn-like ${likedProducts.has(product.id) ? 'liked' : ''}" onclick="toggleLike(${product.id})">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Filter products by category
function filterProducts(category) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Render filtered products
    renderProducts(category);
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    showToast(`${product.name} added to cart!`);
}

// Update cart count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

// Toggle like status
function toggleLike(productId) {
    if (likedProducts.has(productId)) {
        likedProducts.delete(productId);
    } else {
        likedProducts.add(productId);
    }
    
    // Update the like button
    const likeButtons = document.querySelectorAll('.btn-like');
    likeButtons.forEach(btn => {
        if (btn.onclick.toString().includes(productId)) {
            btn.classList.toggle('liked');
        }
    });
}

// Open cart modal
function openCartModal() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.add('active');
    renderCartItems();
}

// Close cart modal
function closeCartModal() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.remove('active');
}

// Render cart items
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        document.getElementById('cartTotal').textContent = '0';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-price">₹${item.price}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="quantity-btn" onclick="removeFromCart(${item.id})" style="margin-left: 10px; background-color: var(--primary-color); color: white;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
        
        total += item.price * item.quantity;
    });
    
    document.getElementById('cartTotal').textContent = total;
}

// Update item quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            renderCartItems();
            updateCartCount();
        }
    }
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    renderCartItems();
    updateCartCount();
    showToast('Item removed from cart');
}

// Show product detail
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    const modal = document.getElementById('productDetailModal');
    const content = document.getElementById('productDetailContent');
    
    content.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-detail-image">
        <div class="product-detail-info">
            <h3>${product.name}</h3>
            <p class="product-detail-price">₹${product.price}</p>
            <p class="product-detail-description">${product.description}</p>
            <div class="product-actions">
                <button class="btn btn-primary" onclick="addToCart(${product.id}); closeProductDetailModal();">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
                <button class="btn btn-like ${likedProducts.has(product.id) ? 'liked' : ''}" onclick="toggleLike(${product.id}); showProductDetail(${product.id});">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

// Close product detail modal
function closeProductDetailModal() {
    const modal = document.getElementById('productDetailModal');
    modal.classList.remove('active');
}

// Open checkout modal
function openCheckoutModal() {
    closeCartModal();
    const modal = document.getElementById('checkoutModal');
    const content = document.getElementById('checkoutContent');
    
    if (cart.length === 0) {
        showToast('Your cart is empty');
        return;
    }
    
    let total = 0;
    let checkoutItems = '';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        checkoutItems += `
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid #eee;">
                <div>
                    <h4>${item.name}</h4>
                    <p>Quantity: ${item.quantity} × ₹${item.price}</p>
                </div>
                <div style="text-align: right;">
                    <p style="font-weight: bold;">₹${itemTotal}</p>
                </div>
            </div>
        `;
    });
    
    content.innerHTML = `
        <h3 style="margin-bottom: 20px;">Order Summary</h3>
        ${checkoutItems}
        <div style="display: flex; justify-content: space-between; margin-top: 20px; padding-top: 20px; border-top: 2px solid #eee;">
            <h3>Total Amount</h3>
            <h3 style="color: var(--primary-color);">₹${total}</h3>
        </div>
        <div style="margin-top: 30px;">
            <h3 style="margin-bottom: 15px;">Payment Information</h3>
            <p style="margin-bottom: 10px;">This is a demo checkout. In a real application, you would be redirected to a payment gateway.</p>
            <button class="btn-checkout" style="width: 100%;" onclick="processPayment()">
                <i class="fas fa-lock"></i> Secure Payment
            </button>
        </div>
    `;
    
    modal.classList.add('active');
}

// Close checkout modal
function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    modal.classList.remove('active');
}

// Process payment (demo)
function processPayment() {
    showToast('Payment successful! Thank you for your order.');
    cart = [];
    updateCartCount();
    closeCheckoutModal();
}

// Show toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
}