import React, { Component } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Colors } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
const styles = {
  addIcon: {
    fontSize: "10vh",
    color: Colors.PRIMARY,
  },
};
const AddWidget = () => {
  const dispatch = useDispatch();
  const songList = useSelector((state) => state.songList);
  const openModal = () => {
    if (songList.length < 1) {
      alert("No songs selected");
    } else {
      dispatch({
        type: "OPEN_MODAL",
        payload: {
          modalType: "widget",
        },
      });
    }
  };

  return (
    <div className="add-widget-button" onClick={openModal}>
      <AddIcon style={styles.addIcon} />
    </div>
  );
};
export default AddWidget;
