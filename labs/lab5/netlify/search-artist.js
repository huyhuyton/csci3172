const fetch = require("node-fetch");
const { getSpotifyToken } = require("./spotify-token");

exports.handler = async (event) => {
  try {
    const query = event.queryStringParameters?.q?.trim();

    if (!query) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Artist query is required." })
      };
    }

    const token = await getSpotifyToken();

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist&limit=6`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      throw new Error("Spotify search request failed.");
    }

    const data = await response.json();

    const artists = (data.artists?.items || []).map((artist) => ({
      id: artist.id,
      name: artist.name,
      url: artist.external_urls?.spotify || "",
      image: artist.images?.[0]?.url || "",
      followers: artist.followers?.total || 0,
      genres: artist.genres || []
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({ artists })
      
    };
  } catch (error) {
    console.error("search-artist error:", error);
    return {
      statusCode: 500,

      body: JSON.stringify({ error: error.message || "Server error." })
    };
  }
};