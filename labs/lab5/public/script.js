const artistInput = document.querySelector("#artistInput");
const searchBtn = document.querySelector("#searchBtn");
const results = document.querySelector("#results");
const recommendations = document.querySelector("#recommendations");
const statusMessage = document.querySelector("#statusMessage");

function showStatus(message) {
  statusMessage.textContent = message;
}

function makeArtistCard(artist, showButton) {
  const card = document.createElement("article");
  card.className = "card";

  const image = document.createElement("img");
  if (artist.image && artist.image.startsWith("http")) {
    image.src = artist.image;
  } else {
    image.src = "https://via.placeholder.com/300x300?text=No+Image";
  }
  image.alt = artist.name || "Artist image";

  const title = document.createElement("h3");
  title.textContent = artist.name || "Unknown Artist";

  const genres = document.createElement("p");
  if (artist.genres && artist.genres.length > 0) {
    genres.textContent = "Genres: " + artist.genres.slice(0, 3).join(", ");
  } else {
    genres.textContent = "Genres: Not available";
  }

  const followers = document.createElement("p");
  if (artist.followers !== undefined && artist.followers !== null) {
    followers.textContent = "Followers: " + artist.followers.toLocaleString();
  } else {
    followers.textContent = "Followers: Not available";
  }

  const link = document.createElement("a");
  if (artist.url && artist.url.startsWith("http")) {
    link.href = artist.url;
  } else {
    link.href = "#";
  }
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "Open in Spotify";

  card.appendChild(image);
  card.appendChild(title);
  card.appendChild(genres);
  card.appendChild(followers);
  card.appendChild(link);

  if (showButton) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Find Similar Artists";
    button.addEventListener("click", function () {
      loadRelatedArtists(artist.id, artist.name);
    });
    card.appendChild(button);
  }

  return card;
}


function displayArtists(artists, container, showButton) {
  container.innerHTML = "";

  if (!artists || artists.length === 0) {
    const message = document.createElement("p");
    message.className = "empty-message";

    message.textContent = "No artists found.";
    container.appendChild(message);
    return;
  }

  for (let i = 0; i < artists.length; i++) {
    const card = makeArtistCard(artists[i], showButton);
    container.appendChild(card);
  }
}

async function searchArtists() {
  const query = artistInput.value.trim();

  if (query === "") {
    showStatus("Please enter an artist name.");
    artistInput.focus();

    return;
  }

  showStatus("Searching for artists...");
  results.innerHTML = "";


  recommendations.innerHTML = "";



  try {
    const response = await fetch(`/.netlify/functions/search-artist?q=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Could not search for artists.");
    }

    displayArtists(data.artists, results, true);

    if (data.artists.length === 0) {
      showStatus("No artists found. Try another name.");
    } else {
      showStatus("Search finished. Click one artist to get recommendations.");
    }
  } catch (error) {
    console.error("Search error:", error);
    showStatus("Error: " + error.message);

  }
}

async function loadRelatedArtists(artistId, artistName) {
  showStatus("Finding artists related to " + artistName + "...");
  recommendations.innerHTML = "";

  try {
    const response = await fetch(`/.netlify/functions/related-artists?id=${encodeURIComponent(artistId)}`);
    const data = await response.json();


    if (!response.ok) {
      throw new Error(data.error || "Could not load related artists.");
    }

    displayArtists(data.artists, recommendations, false);


    if (data.artists.length === 0) {
      showStatus("No related artists found for " + artistName + ".");
    } else {
      showStatus("Showing artists related to " + artistName + ".");
    }
  } catch (error) {
    console.error("Related artists error:", error);
    showStatus("Error: " + error.message);
  }
}

searchBtn.addEventListener("click", function () {
  searchArtists();

});

artistInput.addEventListener("keydown", function (event) {
    
  if (event.key === "Enter") {
    searchArtists();
  }
});
