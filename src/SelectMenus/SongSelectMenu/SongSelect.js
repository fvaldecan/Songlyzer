import React, { Component } from "react";
import SpotifyAPI from "../../APIs/spotifyAPI";
import SearchBar from "./SearchBar/SearchBar";
import TrackResult from "./TrackResult/TrackResult";
import SelectedTrack from "./SelectedTrack/SelectedTrack";

export default class SongSelect extends Component {
  constructor(props) {
    console.log("Rendering Song Select Menu...");
    super(props);
    this.state = {
      search_input: "",
      search_results: [],
      search_results_map: {},
      selected_tracks: [],
    };

    this.selected_tracks_map = this.props.song_map;
  }

  handleSearchSubmit = async (event) => {
    event.preventDefault();
    console.log("Searching Song...");
    const token = await SpotifyAPI.getToken();
    SpotifyAPI.storeToken(token);
    const new_search_results = await SpotifyAPI.searchMusic(
      this.state.search_input,
      token
    );
    // let new_search_results = [];
    // for await (let track of search_results) {
    //   const audio_features = await SpotifyAPI.getAudioFeatures(track.id, token);
    //   await new_search_results.push({ ...track, ...audio_features });
    // }
    // TODO: LOADING SEARCH SCREEN
    let new_search_results_map = {};
    new_search_results.map(
      (track) => (new_search_results_map[track.id] = track)
    );
    this.setState({
      search_results: new_search_results,
      search_results_map: new_search_results_map,
    });
  };

  handleSearchChange = (event) => {
    this.setState({ search_input: event.target.value });
  };
  handleTrackSelect = (selected_track) => {
    this.setState({
      selected_tracks: this.addToSelectedTracks(selected_track),
      search_results: this.removeFromSearchResults(selected_track),
      search_results_map: this.removeFromSearchResultsMap(selected_track),
    });
    this.selected_tracks_map = this.addToSelectedTracksMap(selected_track);
  };
  handleTrackRemove = (selected_track) => {
    this.setState({
      selected_tracks: this.removeFromSelectedTracks(selected_track),
      search_results: this.addToSearchResults(selected_track),
      search_results_map: this.addToSearchResultsMap(selected_track),
    });

    this.selected_tracks_map = this.removeFromSelectedTracksMap(selected_track);
  };

  addToSelectedTracks = (selected_track) => {
    let new_selected_tracks = this.state.selected_tracks;
    new_selected_tracks.push(selected_track);
    return new_selected_tracks;
  };
  removeFromSelectedTracks = (selected_track) => {
    const selected_id = selected_track.id;
    let new_selected_tracks = this.state.selected_tracks.filter(
      (track) => track.id !== selected_id
    );
    return new_selected_tracks;
  };

  addToSelectedTracksMap = (selected_track) => {
    const selected_id = selected_track.id;
    let new_selected_tracks_map = this.selected_tracks_map;
    new_selected_tracks_map[selected_id] = selected_track;
    return new_selected_tracks_map;
  };

  removeFromSelectedTracksMap = (selected_track) => {
    const selected_id = selected_track.id;
    let new_selected_tracks_map = this.selected_tracks_map;
    if (new_selected_tracks_map) delete new_selected_tracks_map[selected_id];
    return new_selected_tracks_map;
  };

  addToSearchResults = (selected_track) => {
    let new_search_results = this.state.search_results;
    new_search_results.push(selected_track);
    return new_search_results;
  };

  removeFromSearchResults = (selected_track) => {
    const selected_id = selected_track.id;
    let new_search_results = this.state.search_results.filter(
      (track) => track.id !== selected_id
    );
    return new_search_results;
  };

  addToSearchResultsMap = (selected_track) => {
    const selected_id = selected_track.id;
    let new_search_results_map = this.state.search_results_map;
    new_search_results_map[selected_id] = selected_track;
    return new_search_results_map;
  };

  removeFromSearchResultsMap = (selected_track) => {
    const selected_id = selected_track.id;
    let new_search_results_map = this.state.search_results_map;
    if (new_search_results_map) delete new_search_results_map[selected_id];
    return new_search_results_map;
  };

  render() {
    const { search_results, selected_tracks } = this.state;
    const selected_tracks_map = this.selected_tracks_map;
    return (
      <div>
        <form>
          <SearchBar
            handleSearchChange={this.handleSearchChange}
            handleSearchSubmit={this.handleSearchSubmit}
          />
          <ul>
            {selected_tracks.map((track) => {
              return (
                <SelectedTrack
                  key={track.id}
                  track={track}
                  trackRemoveButton={this.handleTrackRemove}
                />
              );
            })}
          </ul>
          <ul>
            {search_results.map((track) => {
              const unique = !(track.id in selected_tracks_map);
              return (
                <TrackResult
                  key={track.id}
                  track={track}
                  trackSelectButton={this.handleTrackSelect}
                  showAddButton={unique}
                />
              );
            })}
          </ul>
          <button
            type="submit"
            id="add-selected-tracks"
            className="add-selected-tracks"
            onClick={this.props.onSubmit.bind(this, selected_tracks)}
          >
            Add Song
          </button>
        </form>
      </div>
    );
  }
}
