import React, { Component } from "react";
import AddWidget from "./AddWidget/AddWidget";
import { useSelector } from "react-redux";
import "./Dashboard.css";
import DashboardButtons from "./DashboardButtons/DashboardButtons";

// export default class Dashboard extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       dashboard_state: "single",
//       song_list: this.props.song_list || [],
//       song_map: this.props.song_map || {},
//       song_info: this.props.song_info,
//       widgets: this.props.widgets || [],
//     };
//   }
//   render() {
//     // const widgets = this.props.song_;
//     // handleDashboardState;

//     const {
//       song_info: { name },
//       selectMenu,
//     } = this.props;
//     console.log(`Rendering '${name}' Dashboard...`);
//     console.log(this.props.song_info);

//     return (
//       <main>
//         {name}
//         Dashboard
//         <DasboardButtons></DasboardButtons>
//         <div className="widgets-container">
//           <AddWidget selectMenu={selectMenu}></AddWidget>
//         </div>
//       </main>
//     );
//   }
// }
const Dashboard = () => {
  const { merge } = useSelector((state) => state.dashboardState);
  const currentSong = useSelector((state) => state.currentSong);
  const { data, widgets } = currentSong;
  const name = data.name;
  const color = data.color;
  const artist_name = data.artists ? data.artists[0].name : "";

  return (
    <main>
      <DashboardButtons />
      {merge ? null : (
        <p style={{ fontSize: "20px", color: color }}>
          <b>{name}</b> {artist_name}
        </p>
      )}
      <div className="widgets-container">
        {widgets.length > 0 ? widgets : null}
        <AddWidget></AddWidget>
      </div>
    </main>
  );
};
export default Dashboard;
