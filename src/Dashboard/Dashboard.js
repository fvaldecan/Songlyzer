import React, { Component } from "react";
import AddWidget from "./AddWidget/AddWidget";
import {useSelector} from 'react-redux';
import "./Dashboard.css";
const DasboardButtons = () => {
  return (
    <div className="buttons-container">
      <button>Single/Merge Toggle</button>
      <button>Autofill Button</button>
      <button>Clear Button</button>
    </div>
  );
};
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboard_state: "single",
      song_list: this.props.song_list || [],
      song_map: this.props.song_map || {},
      song_info: this.props.song_info,
      widgets: this.props.widgets || [],
    };
  }
  render() {
    // const widgets = this.props.song_;
    // handleDashboardState;

    const {
      song_info: { name },
      selectMenu,
    } = this.props;
    console.log(`Rendering '${name}' Dashboard...`);
    console.log(this.props.song_info);

    return (
      <main>
        {name}
        Dashboard
        <DasboardButtons></DasboardButtons>
        <div className="widgets-container">
          <AddWidget selectMenu={selectMenu}></AddWidget>
        </div>
      </main>
    );
  }
}
