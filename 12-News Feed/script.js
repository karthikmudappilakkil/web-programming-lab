var loadButton = document.getElementById("loadButton");
var newsList = document.getElementById("newsList");
var message = document.getElementById("message");

function addText(parent, tagName, className, text) {
  var element = document.createElement(tagName);
  element.className = className;
  element.textContent = text;
  parent.appendChild(element);
  return element;
}

function showArticles(articles) {
  newsList.innerHTML = "";

  if (articles.length === 0) {
    message.textContent = "No news articles are available.";
    return;
  }

  for (var i = 0; i < articles.length; i++) {
    var article = articles[i];
    var card = document.createElement("article");
    var content = document.createElement("div");
    var image = document.createElement("img");
    addText(content, "h2", "", article.title || "Untitled article");
    var published = new Date(article.published_at);

    card.className = "news-card";
    content.className = "news-content";
    image.src = article.image_url || "";
    image.alt = article.title || "News image";
    image.addEventListener("error", function() {
      this.hidden = true;
    });

    addText(content, "p", "", article.summary || "No description available.");
    addText(content, "p", "news-meta", "Source: " + (article.news_site || "Unknown"));
    addText(content, "p", "news-meta", "Published: " + published.toLocaleDateString());

    var link = document.createElement("a");
    link.href = article.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Read article";
    content.appendChild(link);
    card.appendChild(image);
    card.appendChild(content);
    newsList.appendChild(card);
  }

  message.textContent = "";
}

async function loadNews() {
  loadButton.disabled = true;
  message.textContent = "Loading articles...";

  try {
    var response = await fetch("https://api.spaceflightnewsapi.net/v4/articles/?limit=12");
    if (!response.ok) {
      throw new Error("The news service returned an error.");
    }

    var data = await response.json();
    showArticles(data.results || []);
  } catch (error) {
    newsList.innerHTML = "";
    message.textContent = "News is unavailable. Check your internet connection and try again.";
  } finally {
    loadButton.disabled = false;
  }
}

loadButton.addEventListener("click", loadNews);
loadNews();
