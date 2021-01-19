import React, { Component } from "react";
import "./SongButton.css";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { useDispatch } from "react-redux";
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
  const { id, name, artists } = song;
  const removeSong = () => {};
  const onClickSong = () => {};
  console.log(id, name, artists);
  return (
    <div className="song-button">
      <div className="remove-song-button">
        <HighlightOffIcon
          type="submit"
          onClick={removeSong}
          style={styles.removeSongButton}
        />
      </div>
      <div className="song-button-disc" onClick={onClickSong}>
        <p>
          <b>{name}</b>
          <br />
          {artists[0].name}
        </p>
      </div>
    </div>
  );
};
export default SongButton;
