import React from "react";
import { Bar as BarChart } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { Colors } from "../../constants";
import { capitalizeFirstLetter, getSpotifyData } from "../../helpers";

const Bar = ({ features }) => {
  //TODO: ONly one feature at a time
  const dashboardState = useSelector((state) => state.dashboardState);
  const songList = useSelector((state) => state.songList);
  const state = dashboardState.merge
    ? {
        labels: songList.map((song) => song.name),
        datasets: [
          {
            label: capitalizeFirstLetter(features[0]),
            backgroundColor: songList.map((song) => song.color),
            data: songList.map((song) => getSpotifyData(song, features[0])),
          },
        ],
      }
    : {};
  const options = {
    title: {
      display: true,
      fontSize: 20,
      // text:
      //   features.length > 1
      //     ? "Song Features"
      //     : capitalizeFirstLetter(features[0]),
      color: Colors.BLACK,
    },
    legend: {
      display: false,
    },
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },

    scales: {
      xAxes: [
        {
          gridLines: {
            zeroLineColor: Colors.BLACK,
            drawBorder: false,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 2,
            fontColor: Colors.BLACK,
          },
          gridLines: {
            zeroLineColor: Colors.BLACK,
            drawBorder: false,
          },
        },
      ],
    },
  };
  return <BarChart data={state} options={options} />;
};
export default Bar;
