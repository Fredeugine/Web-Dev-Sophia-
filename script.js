document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // FEATURE 1: Favorites Tracker (products.html)
    // ==========================================
    const favoritesListEl = document.getElementById("favorites-list");

    // We only run this logic if we are on the products page
    if (favoritesListEl) {

        // Rubric Requirement: Use at least two arrays and two objects
        const bakeryCatalog = [
            { id: "bread1", name: "Artisan Bread Loaf", price: "$6.00" },
            { id: "bread2", name: "Signature Sourdough", price: "$8.00" },
            { id: "pastry1", name: "Morning Pastry", price: "$4.50" },
            { id: "cake1", name: "Celebration Cake", price: "$45.00" }
        ];

        let userFavorites = [];

        // Function to load data from localStorage
        function loadFavorites() {
            const stored = localStorage.getItem("bakeryFavorites");
            if (stored) {
                userFavorites = JSON.parse(stored); // Convert string back to array
                renderFavorites();
            } else {
                favoritesListEl.innerHTML = "<li>No favorites added yet!</li>";
            }
        }

        // Function to update the DOM
        function renderFavorites() {
            favoritesListEl.innerHTML = ""; // Clear list
            if (userFavorites.length === 0) {
                favoritesListEl.innerHTML = "<li>No favorites added yet!</li>";
                return;
            }

            userFavorites.forEach(item => {
                const li = document.createElement("li");
                li.textContent = `${item.name} - ${item.price}`;
                favoritesListEl.appendChild(li);
            });
        }

        // Global function attached to buttons to add items
        window.addToFavorites = function(itemId) {
            const selectedItem = bakeryCatalog.find(item => item.id === itemId);

            // Check if it exists and isn't already in the list
            if (selectedItem && !userFavorites.some(fav => fav.id === itemId)) {
                userFavorites.push(selectedItem);
                localStorage.setItem("bakeryFavorites", JSON.stringify(userFavorites)); // Save to storage
                renderFavorites();
                alert(`${selectedItem.name} has been added to your wishlist!`);
            } else {
                alert("This item is already in your favorites.");
            }
        };

        // Initialize on page load
        loadFavorites();
    }

    // ==========================================
    // FEATURE 2: Form Validation (contact.html)
    // ==========================================
    const bakeryForm = document.getElementById("bakeryForm");

    // We only run this logic if we are on the contact page
    if (bakeryForm) {
        bakeryForm.addEventListener("submit", function(event) {
            let isValid = true;

            // 1. Required Field Validation (Name)
            const nameInput = document.getElementById("fullName");
            const nameError = document.getElementById("nameError");

            if (nameInput.value.trim() === "") {
                nameError.style.display = "block";
                nameError.textContent = "Error: Full Name is required.";
                isValid = false;
            } else {
                nameError.style.display = "none";
            }

            // 2. Pattern Validation (Email Format)
            const emailInput = document.getElementById("emailAddr");
            const emailError = document.getElementById("emailError");
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(emailInput.value.trim())) {
                emailError.style.display = "block";
                emailError.textContent = "Error: Please enter a valid email address (e.g., user@email.com).";
                isValid = false;
            } else {
                emailError.style.display = "none";
            }

            // Prevent form submission if validation fails
            if (!isValid) {
                event.preventDefault();
            }
        });
    }
});