import React from "react";
import { useSelector } from "react-redux";
import { capitalizeFirstLetter, getSpotifyData, msToTime } from "../../helpers";
const PlainText = ({ features }) => {
  const { data } = useSelector((state) => state.currentSong);
  const songList = useSelector((state) => state.songList);
  const { merge } = useSelector((state) => state.dashboardState);
  const numSongs = songList.length;
  const singleContent = features.map((feat) => {
    let text = "";
    let featureTitle = feat
      .split("_")
      .map((word) => capitalizeFirstLetter(word))
      .join(" ");

    text = getSpotifyData(data, feat);
    if (feat === "duration") {
      text = msToTime(text);
    }

    return feat === "artist_image" || feat === "album_cover" ? (
      <div key={feat}>
        <img
          src={`${text}`}
          alt={`${data.name} Pic`}
          style={{
            height: "100px",
            width: "100px",
            border: `3px solid ${data.color}`,
            borderRadius: "25%",
          }}
        />
      </div>
    ) : (
      <div key={feat}>
        {/* <p>{featureTitle}</p> */}
        <p style={{ color: data.color }}>
          <b>{text}</b>
        </p>
      </div>
    );
  });

  const mergeContent = (
    <div style={{ display: "flex" }}>
      {/* Go through each song aligned with all features */}
      {songList.map((songData) => {
        return (
          <div
            style={{ display: "flex", flexDirection: "column", margin: "5px" }}
          >
            {features.map((feat) => {
              let text = "";
              let featureTitle = feat
                .split("_")
                .map((word) => capitalizeFirstLetter(word))
                .join(" ");

              text = getSpotifyData(songData, feat);
              if (feat === "duration") {
                text = msToTime(text);
              }

              return feat === "artist_image" || feat === "album_cover" ? (
                <div key={`${songData.name}-${feat}`}>
                  <img
                    src={`${text}`}
                    alt={`${songData.name} Pic`}
                    style={{
                      height: "100px",
                      width: "100px",
                      border: `3px solid ${songData.color}`,
                      borderRadius: "25%",
                    }}
                  />
                </div>
              ) : (
                <div key={`${songData.name}-${feat}`}>
                  {/* <p>{featureTitle}</p> */}
                  <p style={{ color: songData.color }}>
                    <b>{text}</b>
                  </p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexWrap: "wrap",
        width: "100%",
      }}
    >
      {merge && numSongs > 1 ? mergeContent : singleContent}
      {/* <p>
        <b>{featureTitle}</b>
      </p>
      <p>{text}</p> */}
    </div>
  );
};
export default PlainText;
