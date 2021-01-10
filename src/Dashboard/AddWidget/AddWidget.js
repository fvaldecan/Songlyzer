import React, { Component } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Colors } from "../../constants";

export default class AddWidget extends Component {
  handleSelectMenu = () => {
    this.props.selectMenu("widget");
  };
  render() {
    const styles = {
      addIcon: {
        fontSize: "10vh",
        color: Colors.PRIMARY,
      },
    };

    return (
      <div className="add-widget-button" onClick={this.handleSelectMenu}>
        <AddIcon style={styles.addIcon} />
      </div>
    );
  }
}
