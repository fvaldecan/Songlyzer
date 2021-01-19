import React from "react";
import "./AddSongButton.css";
import MusicNoteSharpIcon from "@material-ui/icons/MusicNoteSharp";
import AddIcon from "@material-ui/icons/Add";
import { Colors } from "../../constants";
import { useDispatch } from "react-redux";
const styles = {
  musicNoteIcon: {
    fontSize: "8vh",
    color: Colors.BLACK,
  },
  addIcon: {
    fontSize: "3vh",
    marginLeft: "-3vh",
    marginRight: "1vh",
    color: Colors.BLACK,
  },
};
// export default class AddSongButton extends Component {
//   handleSelectMenu = () => {
//     this.props.selectMenu("song");
//   };
//   render() {
//     return (
//       <div>
//         <div
//           className="add-song-button"
//           // ref={buttonRef}
//           onClick={this.handleSelectMenu}
//         >
//           <MusicNoteSharpIcon style={styles.musicNoteIcon} />
//           <AddIcon style={styles.addIcon} />
//         </div>
//       </div>
//     );
//   }
// }
const AddSongButton = () => {
  const dispatch = useDispatch();
  const openModal = () => {
    dispatch({
      type: "OPEN_MODAL",
      payload: {
        modalType: "song",
      },
    });
  };
  return (
    <div>
      <div
        className="add-song-button"
        // ref={buttonRef}
        onClick={openModal}
      >
        <MusicNoteSharpIcon style={styles.musicNoteIcon} />
        <AddIcon style={styles.addIcon} />
      </div>
    </div>
  );
};
export default AddSongButton;
