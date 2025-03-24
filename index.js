// objects
const books = [
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "fiction" },
    { title: "To Kill a Mockingbird", author: "Harper Lee", category: "fiction" },
    { title: "Educated", author: "Tara Westover", category: "non-fiction" },
    { title: "The Hobbit", author: "J.R.R. Tolkien", category: "fantasy" },
    { title: "Dune", author: "Frank Herbert", category: "science-fiction" },
    { title: "Pride and Prejudice", author: "Jane Austen", category: "fiction" },
    { title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", category: "non-fiction" },
    { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", category: "fantasy" },
    { title: "Foundation", author: "Isaac Asimov", category: "science-fiction" },
    { title: "The Book Thief", author: "Markus Zusak", category: "historical-fiction" },
    { title: "The Da Vinci Code", author: "Dan Brown", category: "mystery" }
];

const categories = ["mystery", "historical-fiction", "science-fiction", "fantasy", "non-fiction", "fiction"];

//  render the books
function renderBooks(booksToRender) {
    let bookListHTML = document.getElementById('bookList');
    bookListHTML.innerHTML = ''; // Clear the list first
    
    // Loop through each book and create the necessary HTML elements
    for (let i = 0; i < booksToRender.length; i++) {
        let book = booksToRender[i];
        let bookHTML = document.createElement('div');
        bookHTML.className = "book";

        let bookTitleHTML = document.createElement("h3");
        bookTitleHTML.innerText = book.title;

        let bookAuthorHTML = document.createElement("p");
        bookAuthorHTML.innerText = "Author: " + book.author;

        
        let addToCartButtonHTML = document.createElement("button");
        addToCartButtonHTML.className = "add-to-cart";
        addToCartButtonHTML.innerText = "Add to Cart";
        addToCartButtonHTML.addEventListener("click", function() {
            // Get the cart from localStorage, or initialize as empty array
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

           
            cart.push(book.title);

            // Save the updated cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

           
            renderCart();
        });

        bookHTML.appendChild(bookTitleHTML);
        bookHTML.appendChild(bookAuthorHTML);
        bookHTML.appendChild(addToCartButtonHTML);
        bookListHTML.appendChild(bookHTML);
    }
}

function renderCategories(categoriesToRender){
    let categoriesListHTML = document.getElementById("categoryList");

    
    let allCategoryHTML = document.createElement("li");
    allCategoryHTML.className = "category";
    allCategoryHTML.innerText = "ALL";
    allCategoryHTML.addEventListener('click', function() {
        renderFilteredBooksByCategory(undefined, books);
    });
    categoriesListHTML.append(allCategoryHTML);

    
    for(let i = 0; i < categoriesToRender.length; i++){
        let category = categoriesToRender[i];

        let categoryHTML = document.createElement("li");
        categoryHTML.className = "category";
        categoryHTML.innerText = category.toUpperCase();
        categoryHTML.addEventListener('click', function() {
            renderFilteredBooksByCategory(category, books);
        });

        categoriesListHTML.appendChild(categoryHTML);
    }
}

// Function to filter and render books by category
function renderFilteredBooksByCategory(category, booksToRender) {
    let filteredBooks = [];

    for (let i = 0; i < booksToRender.length; i++) {
        let book = booksToRender[i];
        if (!category || book.category === category) {
            filteredBooks.push(book);
        }
    }

    renderBooks(filteredBooks);
}

// Function to render the cart items from localStorage
function renderCart() {
    let cartList = document.getElementById('cart-list');
    cartList.innerHTML = ''; // Clear the cart list before adding items

    // Get cart data from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Loop through the cart array and render each item
    cart.forEach(function(item) {
        const cartItem = document.createElement('li');
        cartItem.className = 'cart-item';
        cartItem.textContent = item;
        cartList.appendChild(cartItem);
    });
}


let clearCartButton = document.getElementById("clear-cart");
clearCartButton.addEventListener("click", function(){
    
    localStorage.removeItem('cart');

    
    renderCart();
});


document.addEventListener('DOMContentLoaded', function() {
    
    renderCategories(categories);
    renderBooks(books);

   
    renderCart();
});
