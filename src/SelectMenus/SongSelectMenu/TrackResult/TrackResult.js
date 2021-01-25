import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Colors } from "../../../constants";
import "./TrackResult.css";
const addTrackButton = {
  fontSize: "3vh",
  color: Colors.SPOTIFY,
};

const TrackResult = ({ track, trackSelectButton, showAddButton }) => {
  return (
    <li className="search-result">
      {track.name}
      <b>{track.artists[0].name}</b>
      {showAddButton ? (
        <AddCircleIcon
          className="add-track-button"
          style={addTrackButton}
          // bind the components trackSelectButton method
          // and use the bind syntax that prepends
          // arguments to attach the item argument
          onClick={() => trackSelectButton(track)}
        />
      ) : null}
    </li>
  );
};
export default TrackResult;
