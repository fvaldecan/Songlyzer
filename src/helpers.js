import { STOP_WORDS, pitch_class } from "./constants";
export const getSpotifyData = (data, featureKey) => {
  const featureToSpotifyKeyMap = {
    // Only contains those features that aren't matched to spotify keys e.g track_number is named the same
    // as a key in the Spotify. E.g song_title is matched with the key 'name' meaning the song name in Spotify Data
    song_title: data["name"],
    album_title: data["album"].name,
    album_cover: data["album"].images[0].url,
    album_type: capitalizeFirstLetter(data["album"].album_type),
    artist_name: data["artists"][0].name,
    release_date: new Date(data["album"].release_date).toDateString(),
    sadness: Math.round((1.0 - data["valence"]) * 100),
    happiness: Math.round(data["valence"] * 100),
    key: `${spotifyKey("key", data["key"])} ${spotifyKey(
      "mode",
      data["mode"]
    )}`,
    explicit: spotifyKey("explicit", data["explicit"]),
    tempo: Math.round(data["tempo"]),
    acousticness: Math.round(data["acousticness"] * 100),
    energy: Math.round(data["energy"] * 100),
    speechiness: Math.round(data["speechiness"] * 100),
    instrumentalness: Math.round(data["instrumentalness"] * 100),
    liveness: Math.round(data["liveness"] * 100),
    danceability: Math.round(data["danceability"] * 100),
    loudness: Math.round(data["loudness"]),
    duration: data["duration_ms"],
  };
  return featureKey in featureToSpotifyKeyMap
    ? featureToSpotifyKeyMap[featureKey]
    : data[featureKey];
};

export const spotifyKey = (key, value) => {
  switch (key) {
    case "explicit":
      return value ? "Yes" : "No";
    case "feature":
      return value === "tempo" || value === "loudness" ? 1 : 100;
    case "mode":
      return value ? "Major" : "Minor";
    default:
      return pitch_class[value];
  }
};
// Other (StackOverflow) Functions
export const msToTime = (s) => {
  // convert to 0:00 format
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  if (secs < 10) secs = "0" + secs;
  return mins + ":" + secs;
};
export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export function getRandomColor() {
  var r = Math.floor(Math.random() * 256); // Random between 0-255
  var g = Math.floor(Math.random() * 256); // Random between 0-255
  var b = Math.floor(Math.random() * 256); // Random between 0-255
  var rgb = "rgb(" + r + "," + g + "," + b + ")";
  return rgb;
}
export const getRandomDarkColor = () => {
  const h = Math.floor(Math.random() * 360),
    s = Math.floor(Math.random() * 100) + "%",
    l = Math.floor(Math.random() * 60) + "%"; // max value of l is 100, but I set to 60 cause I want to generate dark colors
  // (use for background with white/light font color)
  return `hsl(${h},${s},${l})`;
};
export const getRandomLightColor = () => {
  const color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
  return color;
};
export const LyricsAnalysis = (function () {
  const get_most_used_words = (lyrics) => {
    // From : https://countwordsfree.com/stopwords/english/json
    const stop_words = STOP_WORDS["words"];
    let all_words = [];
    let set_words = new Set();
    for (let bar of lyrics.split("\n")) {
      if (bar[0] === "[") continue; // For details Ex. [Chorus: Bob]
      let barArray = bar.split(" ");
      for (let word of barArray) {
        const filter_word = word.toLowerCase().replace(/[^A-Za-z0-9_'-]/g, "");
        if (!stop_words.includes(filter_word)) {
          all_words.push(filter_word);
          set_words.add(filter_word);
        }
      }
    }
    const common_words = commonCollection(all_words, set_words);
    return common_words;
  };
  return {
    getMostUsedWords(lyrics) {
      return get_most_used_words(lyrics);
    },
  };
})();
function commonCollection(array, set) {
  let counter = [];
  for (let set_word of set) {
    var count = 0;
    for (let word of array) {
      if (word === set_word) count++;
    }
    counter.push({ word: set_word, count: count });
  }
  const sorted_collection = counter
    .sort(function (a, b) {
      return a.count - b.count;
    })
    .reverse();
  // const filtered_collection = sorted_collection.filter((obj)=> {
  //     if(obj.count > 1) return obj;
  // })
  const top_ten = sorted_collection.slice(0, 10);
  return top_ten;
}
