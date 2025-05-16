# getspotifysongs

A Node.js script to fetch tracks from a public Spotify playlist and export them to a CSV file.

## Features

- Fetches all tracks from a specified public Spotify playlist.
- Outputs track name, artist, and album to `tracks.csv`.
- Uses Spotify's Client Credentials Flow for authentication.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or newer recommended)
- A Spotify Developer account ([create here](https://developer.spotify.com/dashboard/applications))

## Setup

1. **Clone or download this repository.**

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Create a Spotify application:**

   - Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).
   - Create a new app.
   - Note your **Client ID** and **Client Secret**.

4. **Configure environment variables:**

   - Copy `.env.example` to `.env`:

     ```sh
     cp .env.example .env
     ```

   - Edit `.env` and add your Spotify credentials:

     ```
     CLIENT_ID=your_spotify_client_id
     CLIENT_SECRET=your_spotify_client_secret
     ```

5. **Set the playlist ID:**

   - In [`getPublicPlaylistTracks.JS`](getPublicPlaylistTracks.JS), replace the value of `PLAYLIST_ID` with your desired public playlist's ID:

     ```js
     const PLAYLIST_ID = "your_playlist_id_here";
     ```

   - The playlist ID is the string after `/playlist/` in the playlist's Spotify URL.

## Usage

Run the script with Node.js:

```sh
node getPublicPlaylistTracks.JS
```

- The script will fetch the playlist tracks and write them to `tracks.csv` in the project directory.

## Output

- `tracks.csv` will contain the following columns: `Name,Artist,Album`.

## Notes

- Only public playlists are supported.
- The script uses the Client Credentials flow, so it cannot access private playlists or user-specific data.

## License

ISC