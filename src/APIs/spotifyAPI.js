import { CLIENT_ID, CLIENT_SECRET } from "./keys";
const SpotifyAPI = (function () {
  const client_id = CLIENT_ID;
  const client_secret = CLIENT_SECRET;
  let storedToken = "";
  let storedItems = [];
  const get_token = async () => {
    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(client_id + ":" + client_secret),
      },
      body: "grant_type=client_credentials",
    });
    const data = await result.json();
    return data.access_token;
  };
  const search_music = async (user_input, token) => {
    if (user_input === "" || user_input === " ") return [];
    const limit = 15;
    const type = "track";
    // Fix endpoint
    let input = [];
    user_input.split("").forEach((word) => {
      if (word === " ") word = "%20";
      input.push(word);
    });
    // Get results from search
    const result = await fetch(
      `https://api.spotify.com/v1/search?q=${input.join(
        ""
      )}&type=${type}&limit=${limit}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    )
    const data = await result.json();
    return data.tracks.items;
  };
  const get_artist = async (artist_id, token) => {
    const result = await fetch(
      `https://api.spotify.com/v1/artists/${artist_id}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );
    const data = await result.json();
    return data;
  };
  const get_audio_features = async (track_id, token) => {
    const result = await fetch(
      `https://api.spotify.com/v1/audio-features/${track_id}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );
    const data = await result.json();
    return data;
  };
  const get_album_tracks = async (album_id, token) => {
    const limit = 50;
    const result = await fetch(
      `	https://api.spotify.com/v1/albums/${album_id}/tracks?limit=${limit}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );
    const data = await result.json();
    return data;
  };
  const store_token = (token) => (storedToken = token);
  const get_stored_token = () => {
    return storedToken;
  };
  const store_search_list = (items) => (storedItems = items);
  const get_search_list = () => {
    return storedItems;
  };

  return {
    getToken() {
      return get_token();
    },

    storeToken(token) {
      store_token(token);
    },
    getStoredToken() {
      return get_stored_token();
    },
    getAudioFeatures(track_id, token) {
      return get_audio_features(track_id, token);
    },
    searchMusic(user_input, token) {
      return search_music(user_input, token);
    },
    storeSearchList(items) {
      store_search_list(items);
    },
    getSearchList(items) {
      return get_search_list(items);
    },
    getArtist(artist_id, token) {
      return get_artist(artist_id, token);
    },
    getAlbumTracks(album_id, token) {
      return get_album_tracks(album_id, token);
    },
  };
})();

export default SpotifyAPI;
