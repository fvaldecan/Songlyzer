import React, { Component } from "react";
import "./Sidebar.css";
import AddSongButton from "./AddSongButton/AddSongButton";
import SongButton from "./SongButton/SongButton";
export default class Sidebar extends Component {
  render() {
    let songs = this.props.song_list;
    return (
      <aside>
        <header>
          <h1>Songlyzer</h1>
        </header>
        <div className="song-list">
          {songs.length > 0
            ? songs.map((song) => {
                return (
                  <SongButton
                    key={song.id}
                    song={song}
                    removeSong={this.props.removeSong}
                    onClickSong={this.props.onClickSong}
                  ></SongButton>
                );
              })
            : null}
          <AddSongButton selectMenu={this.props.selectMenu}></AddSongButton>
        </div>
      </aside>
    );
  }
}
