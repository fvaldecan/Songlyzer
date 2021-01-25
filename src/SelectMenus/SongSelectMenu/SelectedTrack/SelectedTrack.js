import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { Colors } from "../../../constants";

const removeTrackButton = {
  fontSize: "3vh",
  color: Colors.RED,
};

const SelectedTrack = ({ track, trackRemoveButton }) => {
  return (
    <li className="selected-track">
      {track.name}
      <b>{track.artists[0].name}</b>
      <RemoveCircleIcon
        className="remove-track-button"
        style={removeTrackButton}
        onClick={() => trackRemoveButton(track)}
      />
    </li>
  );
};
export default SelectedTrack;
