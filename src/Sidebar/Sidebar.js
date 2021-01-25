import React, { useEffect } from "react";
import "./Sidebar.css";
import AddSongButton from "./AddSongButton/AddSongButton";
import SongButton from "./SongButton/SongButton";
import { useSelector } from "react-redux";
const Sidebar = () => {
  const songList = useSelector((state) => state.songList);
  return (
    <aside>
      <header>
        <h1>Songlyzer</h1>
      </header>
      <div className="song-list">
        {songList.length > 0
          ? songList.map((song) => {
              return <SongButton key={song.id} song={song}></SongButton>;
            })
          : null}
        <AddSongButton></AddSongButton>
      </div>
    </aside>
  );
};
export default Sidebar;
