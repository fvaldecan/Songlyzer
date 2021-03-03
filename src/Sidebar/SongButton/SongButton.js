import React, { Component, useEffect, useState } from "react";
import "./SongButton.css";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../constants";
const styles = {
  removeSongButton: {
    color: "#eb5757",
    fontSize: "3vh",
  },
};
// export default class SongButton extends Component {
//   handleRemoveSong = () => {
//     this.props.removeSong(this.props.song.id);
//   };
//   handleOnClickSong = () => {
//     this.props.onClickSong(this.props.song.id);
//   };
//   render() {
//     const { name, artists } = this.props.song;
//     return (
//       <div className="song-button">
//         <div className="remove-song-button">
//           <HighlightOffIcon
//             type="submit"
//             onClick={this.handleRemoveSong}
//             style={styles.removeSongButton}
//           />
//         </div>
//         <div className="song-button-disc" onClick={this.handleOnClickSong}>
//           <p>
//             <b>{name}</b>
//             <br />
//             {artists[0].name}
//           </p>
//         </div>
//       </div>
//     );
//   }
// }
const SongButton = ({ song }) => {
  const currentSong = useSelector((state) => state.currentSong);
  const songIdToDashboard = useSelector((state) => state.songIdToDashboard);
  const songList = useSelector((state) => state.songList);
  const { merge } = useSelector((state) => state.dashboardState);
  const dispatch = useDispatch();
  const { id, name, artists, color, album } = song;
  const currentSongId = currentSong.data.id;
  const removeSong = () => {
    dispatch({
      type: "REMOVE_FROM_SONG_LIST",
      payload: { id: song.id },
    });
    dispatch({
      type: "REMOVE_FROM_MAP",
      payload: { id: song.id },
    });
    if (!merge) {
      // Don't change when merged
      dispatch({
        type: "CHANGE_CURRENT_SONG",
        payload: {
          dashboardData: songIdToDashboard[
            songList[songList.length - 1].id
          ] || {
            data: {},
            widgets: [],
          },
        },
      });
    }
  };
  const onClickSong = () => {
    if (!merge) {
      // Don't change when merged
      dispatch({
        type: "CHANGE_CURRENT_SONG",
        payload: { dashboardData: songIdToDashboard[id] },
      });
    }
  };
  const activeDiscShadow =
    merge || currentSongId === id ? `0px 0px 15px 0 ${color}` : "none";
  // Add box shadow if we're at the merge state so we can know the color assignments or
  // for when we're on the current song dashboard/click on the song
  return (
    <div className="song-button">
      <div className="remove-song-button">
        <HighlightOffIcon
          type="submit"
          onClick={removeSong}
          style={styles.removeSongButton}
        />
      </div>
      <div
        className="song-button-disc"
        onClick={onClickSong}
        style={{ boxShadow: activeDiscShadow }}
      >
        <img
          style={{
            height: "3vw",
            width: "3vw",
            borderRadius: "50%",
            border: `2px solid #000000`,
          }}
          src={`${album.images[0].url}`}
          alt={`${name}`}
        ></img>
        {/* <p>
          <b>{name}</b>
          <br />
          {artists[0].name}
        </p> */}
      </div>
    </div>
  );
};
export default SongButton;
