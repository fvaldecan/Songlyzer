import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SpotifyAPI from "../../APIs/spotifyAPI";
import SearchBar from "./SearchBar/SearchBar";
import TrackResult from "./TrackResult/TrackResult";
import SelectedTrack from "./SelectedTrack/SelectedTrack";
import { getRandomColor, getRandomDarkColor } from "../../helpers";
import Lyrics from "song-lyrics-api";
import { StaticColors } from "../../constants";
const SongSelect = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [error, setError] = useState("");
  const songList = useSelector((state) => state.songList);
  const { merge } = useSelector((state) => state.dashboardState);
  // const spotifyToken = useSelector((state) => state.token);
  const songIds = songList.map((song) => song.id);
  const dispatch = useDispatch();
  const addAudioFeatures = async () => {
    let newSelectedTracks = [];

    for await (let track of selectedTracks) {
      //Grab artist image
      const spotifyToken = await SpotifyAPI.getToken();
      const artist = await SpotifyAPI.getArtist(
        track["artists"][0].id,
        await spotifyToken
      );
      // console.log(artist);
      //Assign a color to the song
      const assignedColor = StaticColors.random(); //TODO: Different for dark mode and light mode

      const artist_image = await artist["images"][0].url;
      // console.log(artist_image);
      //Adding Audio Features data
      const audio_features = await SpotifyAPI.getAudioFeatures(
        track.id,
        await spotifyToken
      );
      // console.log(audio_features);
      // const newLyrics = new Lyrics();
      // const lyrics = await newLyrics.getLyrics(
      //   `${track.name} ${track["artists"][0].name}`
      // );
      // console.log(lyrics);
      await newSelectedTracks.push({
        ...track,
        ...audio_features,
        artist_image: artist_image,
        color: assignedColor,
        // lyrics: lyrics,
      });
    }
    return await newSelectedTracks;
  };
  const addSelectedTracks = async (event) => {
    event.preventDefault();
    const newSelectedTracks = await addAudioFeatures();
    let newSongCount = 0;
    for (let track of newSelectedTracks) {
      // Add track to songIdToDashBoardReducer
      const payload = {
        dashboardData: {
          data: track,
          widgets: [],
        },
        id: track.id,
      };
      if (newSongCount === 0 && !merge) {
        // Don't change when merged
        dispatch({
          type: "CHANGE_CURRENT_SONG",
          payload: { dashboardData: payload.dashboardData },
        });
      }
      dispatch({
        type: "ADD_TO_MAP",
        payload: payload,
      });
      newSongCount += 1;
    }
    dispatch({
      // Update in songListReducer
      type: "ADD_TO_SONG_LIST",
      payload: { newSongs: [...newSelectedTracks] },
    });
    dispatch({
      type: "CLOSE_MODAL",
      payload: {
        showModal: false,
      },
    });
  };
  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const spotifyToken = await SpotifyAPI.getToken();
    const newSearchResults = await SpotifyAPI.searchMusic(
      searchInput,
      await spotifyToken
    );
    setSearchResults(newSearchResults);
  };
  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };
  const handleTrackRemove = (selectedTrack) => {
    const newSelectedTracks = selectedTracks.filter(
      (track) => track.id !== selectedTrack.id
    );
    setSelectedTracks(newSelectedTracks);
    const updatedSearchResults = searchResults;
    updatedSearchResults.push(selectedTrack);
    setSearchResults(updatedSearchResults);
  };
  const handleTrackSelect = (selectedTrack) => {
    const newSelectedTracks = selectedTracks;
    newSelectedTracks.push(selectedTrack);
    const updatedSearchResults = searchResults.filter(
      (track) => track.id !== selectedTrack.id
    );
    setSearchResults(updatedSearchResults);
    setSelectedTracks(newSelectedTracks);
  };
  return (
    <div>
      <form>
        <SearchBar
          handleSearchChange={handleSearchChange}
          handleSearchSubmit={handleSearchSubmit}
        />
        <ul>
          {selectedTracks.map((track) => {
            return (
              <SelectedTrack
                key={track.id}
                track={track}
                trackRemoveButton={handleTrackRemove}
              />
            );
          })}
        </ul>
        <ul>
          {searchResults.map((track) => {
            const unique = !songIds.includes(track.id);
            return (
              <TrackResult
                key={track.id}
                track={track}
                trackSelectButton={handleTrackSelect}
                showAddButton={unique}
              />
            );
          })}
        </ul>
        <button
          type="submit"
          id="add-selected-tracks"
          className="add-selected-tracks"
          onClick={addSelectedTracks}
        >
          Add Songs
        </button>
      </form>
    </div>
  );
};
export default SongSelect;
// export default class SongSelect extends Component {
//   constructor(props) {
//     console.log("Rendering Song Select Menu...");
//     super(props);
//     this.state = {
//       search_input: "",
//       search_results: [],
//       search_results_map: {},
//       selected_tracks: [],
//     };

//     this.selected_tracks_map = this.props.song_map;
//   }

//   handleSearchSubmit = async (event) => {
//     event.preventDefault();
//     console.log("Searching Song...");
//     const token = await SpotifyAPI.getToken();
//     SpotifyAPI.storeToken(token);
//     const new_search_results = await SpotifyAPI.searchMusic(
//       this.state.search_input,
//       token
//     );
//     // let new_search_results = [];
//     // for await (let track of search_results) {
//     //   const audio_features = await SpotifyAPI.getAudioFeatures(track.id, token);
//     //   await new_search_results.push({ ...track, ...audio_features });
//     // }
//     // TODO: LOADING SEARCH SCREEN
//     let new_search_results_map = {};
//     new_search_results.map(
//       (track) => (new_search_results_map[track.id] = track)
//     );
//     this.setState({
//       search_results: new_search_results,
//       search_results_map: new_search_results_map,
//     });
//   };

//   handleSearchChange = (event) => {
//     this.setState({ search_input: event.target.value });
//   };
//   handleTrackSelect = (selected_track) => {
//     this.setState({
//       selected_tracks: this.addToSelectedTracks(selected_track),
//       search_results: this.removeFromSearchResults(selected_track),
//       search_results_map: this.removeFromSearchResultsMap(selected_track),
//     });
//     this.selected_tracks_map = this.addToSelectedTracksMap(selected_track);
//   };
//   handleTrackRemove = (selected_track) => {
//     this.setState({
//       selected_tracks: this.removeFromSelectedTracks(selected_track),
//       search_results: this.addToSearchResults(selected_track),
//       search_results_map: this.addToSearchResultsMap(selected_track),
//     });

//     this.selected_tracks_map = this.removeFromSelectedTracksMap(selected_track);
//   };

//   addToSelectedTracks = (selected_track) => {
//     let new_selected_tracks = this.state.selected_tracks;
//     new_selected_tracks.push(selected_track);
//     return new_selected_tracks;
//   };
//   removeFromSelectedTracks = (selected_track) => {
//     const selected_id = selected_track.id;
//     let new_selected_tracks = this.state.selected_tracks.filter(
//       (track) => track.id !== selected_id
//     );
//     return new_selected_tracks;
//   };

//   addToSelectedTracksMap = (selected_track) => {
//     const selected_id = selected_track.id;
//     let new_selected_tracks_map = this.selected_tracks_map;
//     new_selected_tracks_map[selected_id] = selected_track;
//     return new_selected_tracks_map;
//   };

//   removeFromSelectedTracksMap = (selected_track) => {
//     const selected_id = selected_track.id;
//     let new_selected_tracks_map = this.selected_tracks_map;
//     if (new_selected_tracks_map) delete new_selected_tracks_map[selected_id];
//     return new_selected_tracks_map;
//   };

//   addToSearchResults = (selected_track) => {
//     let new_search_results = this.state.search_results;
//     new_search_results.push(selected_track);
//     return new_search_results;
//   };

//   removeFromSearchResults = (selected_track) => {
//     const selected_id = selected_track.id;
//     let new_search_results = this.state.search_results.filter(
//       (track) => track.id !== selected_id
//     );
//     return new_search_results;
//   };

//   addToSearchResultsMap = (selected_track) => {
//     const selected_id = selected_track.id;
//     let new_search_results_map = this.state.search_results_map;
//     new_search_results_map[selected_id] = selected_track;
//     return new_search_results_map;
//   };

//   removeFromSearchResultsMap = (selected_track) => {
//     const selected_id = selected_track.id;
//     let new_search_results_map = this.state.search_results_map;
//     if (new_search_results_map) delete new_search_results_map[selected_id];
//     return new_search_results_map;
//   };

//   render() {
//     const { search_results, selected_tracks } = this.state;
//     const selected_tracks_map = this.selected_tracks_map;
//     return (
//       <div>
//         <form>
//           <SearchBar
//             handleSearchChange={this.handleSearchChange}
//             handleSearchSubmit={this.handleSearchSubmit}
//           />
//           <ul>
//             {selected_tracks.map((track) => {
//               return (
//                 <SelectedTrack
//                   key={track.id}
//                   track={track}
//                   trackRemoveButton={this.handleTrackRemove}
//                 />
//               );
//             })}
//           </ul>
//           <ul>
//             {search_results.map((track) => {
//               const unique = !(track.id in selected_tracks_map);
//               return (
//                 <TrackResult
//                   key={track.id}
//                   track={track}
//                   trackSelectButton={this.handleTrackSelect}
//                   showAddButton={unique}
//                 />
//               );
//             })}
//           </ul>
//           <button
//             type="submit"
//             id="add-selected-tracks"
//             className="add-selected-tracks"
//             onClick={this.props.onSubmit.bind(this, selected_tracks)}
//           >
//             Add Song
//           </button>
//         </form>
//       </div>
//     );
//   }
// }
