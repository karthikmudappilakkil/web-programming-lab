var searchInput = document.getElementById("searchInput");
var results = document.getElementById("results");
var message = document.getElementById("message");
var users = [];

function showUsers(searchText) {
  var search = searchText.toLowerCase().trim();
  var matches = [];
  results.innerHTML = "";

  for (var i = 0; i < users.length; i++) {
    var user = users[i];

    if (user.name.toLowerCase().includes(search) ||
        user.city.toLowerCase().includes(search) ||
        user.company.toLowerCase().includes(search)) {
      matches.push(user);
    }
  }

  if (matches.length === 0) {
    message.textContent = "No matching users found.";
    return;
  }

  message.textContent = matches.length + " result(s)";

  for (var j = 0; j < matches.length; j++) {
    var item = document.createElement("li");
    var userName = document.createElement("span");
    userName.className = "user-name";
    userName.textContent = matches[j].name;
    item.appendChild(userName);
    item.appendChild(document.createTextNode(
      " — City: " + matches[j].city + ", Company: " + matches[j].company
    ));
    results.appendChild(item);
  }
}

searchInput.addEventListener("input", function() {
  showUsers(searchInput.value);
});

async function loadCountries() {
  try {
    // Load the data once, then filter it as the user types.
    var response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Could not load search data.");
    }

    var data = await response.json();
    for (var i = 0; i < data.length; i++) {
      users.push({
        name: data[i].name,
        city: data[i].address.city,
        company: data[i].company.name
      });
    }

    searchInput.disabled = false;
    showUsers("");
  } catch (error) {
    message.textContent = "Search data is unavailable. Please try again later.";
  }
}

loadCountries();
