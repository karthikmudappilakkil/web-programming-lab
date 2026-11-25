Experiment 12 - News Feed

Aim:
To retrieve and display articles dynamically from a public REST API.

Basic algorithm:
1. Use Fetch to request recent articles from the Spaceflight News API.
2. Convert the response to JSON.
3. Loop through the articles and create a card for each one.
4. Display the title, image, description, source, date and article link.
5. Show a message if the API request fails or has no articles.

Important JavaScript concepts:
Fetch API, async/await, arrays, loops, functions, DOM element creation and try/catch.

How to execute:
Open index.html in a browser with an internet connection. No API key is needed.
Click Load News to request the articles again.

Expected output:
Recent space-related articles appear as cards, without a page refresh. Cards show an
image when provided by the source, plus title, description, source, date and a link.
