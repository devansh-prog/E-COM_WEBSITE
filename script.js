const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click',()=>{
        nav.classList.add('active')
    })
}
if (close) {
    close.addEventListener('click',()=>{
        nav.classList.remove('active')
    })
}
document.addEventListener("DOMContentLoaded", () => {
    const cartButtons = document.querySelectorAll(".cart");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            // Get product details
            const product = button.closest(".pro");
            const productName = product.querySelector("h5").innerText;
            const productPrice = product.querySelector("h4").innerText;
            const productImage = product.querySelector("img").src;

            const item = {
                id: index, // You can use a unique identifier
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1,
            };

            // Check if the item already exists in the cart
            const exists = cart.find(cartItem => cartItem.id === item.id);

            if (exists) {
                exists.quantity += 1;
            } else {
                cart.push(item);
            }

            // Save cart to local storage
            localStorage.setItem("cart", JSON.stringify(cart));

            alert("Item added to cart!");
        });
    });
});

// Initialize cart array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add click event listeners to all cart icons
document.addEventListener('DOMContentLoaded', () => {
    const cartIcons = document.querySelectorAll('.fa-shopping-cart');
    
    cartIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get the parent product container
            const productCard = e.target.closest('.pro');
            
            // Extract product details
            const product = {
                id: Date.now(), // Using timestamp as a simple unique ID
                name: productCard.querySelector('h5').textContent,
                price: parseFloat(productCard.querySelector('h4').textContent.replace('₹', '')),
                image: productCard.querySelector('img').src,
                brand: productCard.querySelector('span').textContent,
                quantity: 1
            };
            
            // Check if product already exists in cart
            const existingProductIndex = cart.findIndex(item => 
                item.name === product.name && item.price === product.price
            );
            
            if (existingProductIndex !== -1) {
                // If product exists, increase quantity
                cart[existingProductIndex].quantity += 1;
                showNotification('Product quantity updated in cart!');
            } else {
                // If product doesn't exist, add it to cart
                cart.push(product);
                showNotification('Product added to cart!');
            }
            
            // Save cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update cart count if you have a cart counter element
            updateCartCount();
        });
    });
});

// Function to show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    
    // Add notification to page
    document.body.appendChild(notification);
    
    // Remove notification after 2 seconds
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Function to update cart count
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    // If you have a cart count element, update it here
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}
// Get the Add to Cart button
var addToCartButton = document.getElementById("addToCart");

// Add a click event listener to the button
addToCartButton.addEventListener("click", function () {
    // Action to perform when button is clicked
    alert("Item added to cart!");
    // Optional: Add functionality to update cart count or send data to a server
});

// Example: Update cart count
var cartCount = 0; // Initialize cart count
var cartIcon = document.getElementById("lg-bag");

addToCartButton.addEventListener("click", function () {
    cartCount++; // Increment cart count
   
    // Update cart count display
    var cartBadge = document.createElement("span");
    cartBadge.textContent = cartCount;
    cartBadge.style.backgroundColor = "#088178";
    cartBadge.style.color = "white";
    cartBadge.style.borderRadius = "50%";
    cartBadge.style.padding = "2px 6px";
    cartBadge.style.position = "absolute";
    cartBadge.style.top = "-5px";
    cartBadge.style.right = "-5px";
    cartIcon.appendChild(cartBadge);
});
