const fetch = require("node-fetch");

// store token in memory 
let cachedToken = null;
let tokenExpiresAt = 0;

const getSpotifyToken = async () => {
  const currentTime = Date.now();

  // reuse token
  if (cachedToken && currentTime < tokenExpiresAt) {
    return cachedToken;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Spotify environment variables are missing.");
  }


  const encodedCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${encodedCredentials}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials"
  });


  if (!response.ok) {
    throw new Error("Failed to get Spotify access token.");
  }

  const data = await response.json();

  // save the token and set expiration time
  cachedToken = data.access_token;

  // minus 60 sec if it expired
  tokenExpiresAt = currentTime + (data.expires_in - 60) * 1000;

  return cachedToken;
};

module.exports = { getSpotifyToken };