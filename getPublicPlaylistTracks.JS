const axios = require("axios");
require("dotenv").config();
const fs = require("fs");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const PLAYLIST_ID = "3SMboY1l7SeWPgHuX2IjuW"; // Replace with your playlist ID

async function getAccessToken() {
  const authHeader = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
    "base64"
  );

  try {
    const res = await axios.post(
      "https://accounts.spotify.com/api/token",
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${authHeader}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return res.data.access_token;
  } catch (err) {
    console.error(
      "Error getting access token:",
      err.response?.data || err.message
    );
    return null;
  }
}

async function getPlaylistTracks(token) {
  try {
    const res = await axios.get(
      `https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const songs = res.data.items
      .map((item) => {
        const track = item.track;
        return {
          name: track?.name,
          artist: track?.artists?.[0]?.name,
          album: track?.album?.name,
          //duration_ms: track?.duration_ms,
        };
      })
      .filter(Boolean);
    console.log(songs);
    songs.array.forEach(song => {
        
    });

    const header = "Name,Artist,Album\n";
    const rows = songs.map(
      (track) => `"${track.name}","${track.artist}","${track.album}"`
    );
    const csvContent = header + rows.join("\n");

    // Write to file
    fs.writeFileSync("tracks.csv", csvContent, "utf8");

    console.log("CSV file written to tracks.csv ✅");
  } catch (err) {
    console.error(
      "Error fetching playlist tracks:",
      err.response?.data || err.message
    );
  }
}

(async () => {
  const token = await getAccessToken();
  if (token) await getPlaylistTracks(token);
})();
