// Product information is stored as an array of objects.
var products = [
  { name: "Wireless Mouse", price: 18, category: "Electronics" },
  { name: "USB Keyboard", price: 25, category: "Electronics" },
  { name: "Desk Lamp", price: 22, category: "Electronics" },
  { name: "Web Design Basics", price: 14, category: "Books" },
  { name: "JavaScript Guide", price: 19, category: "Books" },
  { name: "Notebook", price: 4, category: "Stationery" },
  { name: "Blue Pen Set", price: 3, category: "Stationery" },
  { name: "Cotton T-Shirt", price: 16, category: "Clothing" }
];

var searchInput = document.getElementById("searchInput");
var categorySelect = document.getElementById("categorySelect");
var productList = document.getElementById("productList");
var message = document.getElementById("message");

function showProducts() {
  var searchText = searchInput.value.toLowerCase();
  var selectedCategory = categorySelect.value;
  var foundProducts = [];

  // Keep products that match both selected filters.
  for (var i = 0; i < products.length; i++) {
    var nameMatches = products[i].name.toLowerCase().includes(searchText);
    var categoryMatches = selectedCategory === "All" ||
      products[i].category === selectedCategory;

    if (nameMatches && categoryMatches) {
      foundProducts.push(products[i]);
    }
  }

  productList.innerHTML = "";
  message.textContent = "";

  if (foundProducts.length === 0) {
    message.textContent = "No products found.";
    return;
  }

  for (var j = 0; j < foundProducts.length; j++) {
    var product = foundProducts[j];
    var card = document.createElement("article");
    card.className = "product";
    card.innerHTML = "<h2>" + product.name + "</h2>" +
      "<p class=\"price\">$" + product.price.toFixed(2) + "</p>" +
      "<p>Category: " + product.category + "</p>";
    productList.appendChild(card);
  }
}

searchInput.addEventListener("input", showProducts);
categorySelect.addEventListener("change", showProducts);
showProducts();
