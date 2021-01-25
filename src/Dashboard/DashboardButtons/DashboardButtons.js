import React from "react";
import { useDispatch, useSelector } from "react-redux";
const Switch = ({ onText, offText, handleSwitch }) => {
  return (
    <label className="switch">
      <input onClick={handleSwitch} type="checkbox" id="togBtn" />
      <div className="slider round">
        <span className="on">
          <b>{onText}</b>
        </span>
        <span className="off">
          <b>{offText}</b>
        </span>
      </div>
    </label>
  );
};
const Button = ({ text, className, handleOnClick }) => {
  return (
    <label className="button">
      <input onClick={handleOnClick} type="checkbox" />
      <div className={`container round ${className}`}>
        <span className="text ">
          <b>{text}</b>
        </span>
      </div>
    </label>
  );
};
const DashboardButtons = () => {
  // TODO: AUTO_FILL AND CLEAR FOR WHEN IT'S MERGED
  const dispatch = useDispatch();
  const currentSong = useSelector((state) => state.currentSong);
  const handleMergeToggle = () => {
    console.log("Merging Data...");
    dispatch({
      type: "TOGGLE_MERGE",
    });
  };
  const handleAutofill = () => {
    console.log("Auto filling widgets..");
    if (currentSong.widgets.length < 1) return;
    dispatch({
      type: "AUTO_FILL",
    });
  };
  const handleClear = () => {
    console.log("Clearing widgets...");
    if (currentSong.widgets.length < 1) return;
    dispatch({
      type: "CLEAR",
    });
  };
  return (
    <div className="buttons-container">
      <Switch
        onText={"Merge"}
        handleSwitch={handleMergeToggle}
        offText={"Single"}
      />
      <Button
        text={"Autofill"}
        handleOnClick={handleAutofill}
        className={"autofill-button"}
      />
      <Button
        text={"Clear"}
        handleOnClick={handleClear}
        className={"clear-button"}
      />
      {/* <button>Single/Merge Toggle</button>
      <button>Autofill Button</button>
      <button>Clear Button</button> */}
    </div>
  );
};
export default DashboardButtons;
