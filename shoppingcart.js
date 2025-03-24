console.log(JSON.parse(localStorage.getItem("cartItems")));


const cartItems = JSON.parse(localStorage.getItem("cartItems"));
document.getElementById('bookList').innerHTML = cartItems ? cartItems : "No items in the cart";