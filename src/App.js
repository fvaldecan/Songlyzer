import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Sidebar from "./Sidebar/Sidebar";
import Dashboard from "./Dashboard/Dashboard";
import { Modal } from "./SelectMenus/Modal/Modal";
import SpotifyAPI from "./APIs/spotifyAPI";

const App = () => {
  // const state = useSelector((state) => state);
  // const isSingleState = useSelector();
  const { showModal, modalType } = useSelector((state) => state.modal);
  console.log(showModal, modalType);
  return (
    <div className="main-container">
      <Sidebar />
      {/* <Sidebar
      // selectMenu={this.showModal}
      // song_list={song_list}
      // song_map={song_map}
      // removeSong={this.handleRemoveSong}
      // onClickSong={this.onChangeCurrentSong}
      />
      <Dashboard /> */}
      <Dashboard />
      {/* {single ? current_single_dashboard : merged_component} */}
      {showModal ? <Modal modalType={modalType} /> : null}
    </div>
  );
};
export default App;
// import React, { Component } from "react";
// import "./App.css";
// import Sidebar from "./Sidebar/Sidebar";
// import Dashboard from "./Dashboard/Dashboard";
// import { Modal } from "./SelectMenus/Modal/Modal";
// import SpotifyAPI from "./APIs/spotifyAPI";

// export default class App extends Component {
//   constructor(props) {
//     console.log("Rendering App...");
//     super(props);
//     this.state = {
//       is_shown: false,
//       song_list: [],
//       song_map: {},
//       menu_type: "",
//       current_single_song: "",
//       current_single_dashboard: (
//         <Dashboard
//           song_info={{ name: "INIT_DASHBOARD" }}
//           selectMenu={this.showModal}
//         />
//       ),
//       merged_dashboard: <Dashboard selectMenu={this.showModal} />,
//       song_to_dashboard_map: {},
//       single: true,
//     };
//   }

//   onChangeCurrentSong = (song_id) => {
//     const { song_to_dashboard_map } = this.state;
//     const new_current_single_song = song_id;
//     const new_current_single_dashboard = song_to_dashboard_map[song_id];
//     this.setState({
//       current_single_song: new_current_single_song,
//       current_single_dashboard: new_current_single_dashboard,
//     });
//   };

//   initializeDashboard = () => {
//     this.setState({
//       current_single_dashboard: (
//         <Dashboard
//           song_info={{ name: "INIT_DASHBOARD" }}
//           selectMenu={this.showModal}
//         />
//       ),
//       current_single_song: "",
//     });
//   };
//   handleRemoveSong = (song_id) => {
//     const {
//       song_map,
//       song_list,
//       song_to_dashboard_map,
//       current_single_song,
//     } = this.state;
//     console.log(`Removing ${song_map[song_id].name}...`);
//     const new_song_list = song_list.filter((track) => track.id !== song_id);
//     const new_song_map = song_map;
//     delete new_song_map[song_id];
//     const new_song_to_dashboard_map = song_to_dashboard_map;
//     delete new_song_to_dashboard_map[song_id];
//     if (song_id === current_single_song) {
//       console.log("Removing current song...");
//       if (new_song_list.length === 0) this.initializeDashboard();
//       else this.onChangeCurrentSong(new_song_list[new_song_list.length - 1].id);
//     }
//     this.setState({
//       song_list: new_song_list,
//       song_map: new_song_map,
//       song_to_dashboard_map: new_song_to_dashboard_map,
//     });
//   };

//   handleAddSong = async (selected_tracks, event) => {
//     event.preventDefault();
//     const { song_map, song_list, song_to_dashboard_map } = this.state;
//     let tracks = [];

//     const token = await SpotifyAPI.getToken();
//     SpotifyAPI.storeToken(token);
//     for await (let track of selected_tracks) {
//       const audio_features = await SpotifyAPI.getAudioFeatures(track.id, token);
//       await tracks.push({ ...track, ...audio_features });
//     }

//     let new_song_map = song_map;
//     tracks.forEach((track) => {
//       console.log(`Adding ${track.name}...`);
//       new_song_map[track.id] = track;
//     });
//     let new_song_list = song_list.concat(tracks);
//     let new_song_to_dashboard_map = song_to_dashboard_map;
//     for (let track of tracks) {
//       new_song_to_dashboard_map[track.id] = (
//         <Dashboard song_info={track} selectMenu={this.showModal} />
//       );
//     }
//     const new_current_single_song = tracks[0].id;
//     this.setState({
//       song_list: new_song_list,
//       song_map: new_song_map,
//       song_to_dashboard_map: new_song_to_dashboard_map,
//       current_single_song: new_current_single_song,
//       current_single_dashboard:
//         new_song_to_dashboard_map[new_current_single_song],
//     });
//     this.closeModal();
//   };

//   showModal = (menu_type) => {
//     if (menu_type === "widget" && this.state.song_list.length < 1) {
//       alert("No Song Selected...");
//     } else {
//       this.setState({ is_shown: true, menu_type: menu_type });
//       this.toggleScrollLock();
//     }
//   };

//   toggleScrollLock = () => {
//     document.querySelector("html").classList.toggle("scroll-lock");
//   };

//   closeModal = () => {
//     this.setState({ is_shown: false });
//     this.toggleScrollLock();
//   };

//   onClickOutside = (event) => {
//     if (this.modal && this.modal.contains(event.target)) return;
//     this.closeModal();
//   };
//   handleAddWidget = () => {};
//   handleRemoveWidget = () => {};
//   render() {
//     const {
//       song_list,
//       song_map,
//       single,
//       current_single_song,
//       current_single_dashboard,
//       merged_component,
//       is_shown,
//       menu_type,
//     } = this.state;
//     return (
//       <div className="main-container">
//         <Sidebar
//           selectMenu={this.showModal}
//           song_list={song_list}
//           song_map={song_map}
//           removeSong={this.handleRemoveSong}
//           onClickSong={this.onChangeCurrentSong}
//         ></Sidebar>
//         {single ? current_single_dashboard : merged_component}
//         {is_shown ? (
//           <Modal
//             menuType={menu_type}
//             modalRef={(n) => (this.modal = n)}
//             closeModal={this.closeModal}
//             onClickOutside={this.onClickOutside}
//             onSubmitSong={this.handleAddSong}
//             onSubmitWidget={this.handleAddWidget}
//             songMap={song_map}
//             songList={song_list}
//             isSingle={single}
//             currentSingleSong={current_single_song}
//           />
//         ) : null}
//       </div>
//     );
//   }
// }
