import React, { useEffect, useState } from "react";
import VisualOptions from "./VisualOptions/VisualOptions";
import FeatureOptions from "./FeatureOptions/FeatureOptions";
import { useDispatch, useSelector } from "react-redux";
import Widget from "../../Dashboard/Widget/Widget";
import { DefaultFeatures, DefaultVisuals, features } from "../../constants";

const defaultFeatures = [...DefaultFeatures];
const defaultVisuals = [...DefaultVisuals];
// Test
const testSelectedAllFeatures = features;
const testPlainText = "plain";
const WidgetSelect = () => {
  const currentSong = useSelector((state) => state.currentSong);
  const songList = useSelector((state) => state.songList);
  const dashboardState = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  const [featuresSelected, setFeaturesSelected] = useState([]);
  const [visualSelected, setVisualSelected] = useState("");
  const [features, setFeatures] = useState(defaultFeatures);
  const [visuals, setVisuals] = useState(defaultVisuals);

  const addToSelectedFeatures = (feature) => {
    let newFeaturesSelected = featuresSelected;
    newFeaturesSelected.push(feature);
    return newFeaturesSelected;
  };
  const removeFromSelectedFeatures = (feature) => {
    let newFeaturesSelected = featuresSelected.filter(
      (feat) => feat !== feature
    );
    return newFeaturesSelected;
  };
  const handleCheckboxOptions = (event) => {
    // Disable/enable checkboxes accordingly
    // e.g Checking Song Title and Danceability means you're only allowed to click on Plain Text Widget
    const checked = event.target.value;
    const isChecked = event.target.checked;
    const featureNames = features.map((feature) => feature.name);
    const checkedType = featureNames.includes(checked) ? "feature" : "visual";
    if (!isChecked) {
      if (checkedType === "visual") {
        // Reset Visual Charts State
        setVisualSelected("");
        let newVisualsState = [];
        for (let chart of visuals) {
          chart.disabled = false;
          newVisualsState.push(chart);
        }
        setVisuals(newVisualsState);

        // Reset Features State
        let newFeaturesState = [];
        for (let feature of features) {
          feature.disabled = false;
          newFeaturesState.push(feature);
        }
        setFeatures(newFeaturesState);
      } else {
        const newFeaturesSelected = removeFromSelectedFeatures(checked);
        setFeaturesSelected(newFeaturesSelected);
        const newVisualsState = [];
        for (let chart of visuals) {
          chart.disabled = !newFeaturesSelected.every((
            feature // Disables/enables the chart with new selected features
          ) => chart.features.includes(feature));
          newVisualsState.push(chart);
        }
        setVisuals(newVisualsState);
      }
    } else {
      if (checkedType === "visual") {
        // Checked is a visual chart

        // Find what features we're able to use with visual chart
        let visualFeatures = [];
        for (let chart of visuals) {
          if (chart.name === checked) {
            visualFeatures = chart.features;
          }
        }

        if (
          !featuresSelected || //If features aren't selected
          (!visualSelected &&
            featuresSelected.every((feature) =>
              visualFeatures.includes(feature)
            )) // If visual chart selected corresponds with features
        ) {
          // Disable other Visual Charts
          let newVisualsState = [];
          for (let chart of visuals) {
            if (chart.name !== checked) {
              chart.disabled = true;
            }
            newVisualsState.push(chart);
          }
          setVisuals(newVisualsState);
          setVisualSelected(checked);

          let newFeaturesState = [];
          for (let feature of features) {
            feature.disabled = !visualFeatures.includes(feature.name); // Disables/enables the features depending on selected chart
            newFeaturesState.push(feature);
          }
          setFeatures(newFeaturesState);
        }
      } else {
        // Checked is a feature
        let visualFeatures = [];
        for (let chart of visuals) {
          if (chart.name === visualSelected) {
            visualFeatures = chart.features;
          }
        }
        if (
          !visualSelected || //If visual chart not selected
          (visualSelected && visualFeatures.includes(checked)) //If feature selected okay with chart selected
        ) {
          const newFeaturesSelected = addToSelectedFeatures(checked);
          setFeaturesSelected(newFeaturesSelected);

          const newVisualsState = [];
          for (let chart of visuals) {
            const chartFeatures = chart.features;
            chart.disabled = !newFeaturesSelected.every((
              feature // Disables/enables the chart with new selected features
            ) => chartFeatures.includes(feature));
            newVisualsState.push(chart);
          }
          setVisuals(newVisualsState);
        }
      }
    }
  };

  const handleSubmitWidget = (event) => {
    event.preventDefault();
    // console.log(featuresSelected, features, visualSelected, visuals);
    if (!visualSelected) {
      alert("Select a Chart");
    } else if (featuresSelected.length < 1) {
      alert("Select a Feature");
    } else {
      const numWidgets = currentSong.widgets.length; // Use count as component key
      let newWidget = (
        <Widget
          key={`widget${numWidgets + 1}`}
          featuresSelected={featuresSelected}
          visualsSelected={visualSelected}
        />
      );
      const newPayload = {
        data: currentSong.data,
        widgets: [...currentSong.widgets, newWidget],
      };
      dispatch({
        type: "CHANGE_CURRENT_SONG",
        payload: { dashboardData: newPayload },
      });
      dispatch({
        type: "ADD_TO_MAP",
        payload: {
          id: currentSong.data.id,
          dashboardData: newPayload,
        },
      });
      dispatch({
        type: "CLOSE_MODAL",
      });
    }
    // console.log(DefaultFeatures);
    // setFeatures(...DefaultFeatures);
    // setVisuals(...DefaultVisuals);
  };
  //TODO: SET ERRORS AT
  //  - When trying to add wedget with chart selected but no features selected
  // - When trying to add widget with features selected but no chart selected
  // - When there's no songs on the sidebar
  return (
    <form>
      <FeatureOptions isChecked={handleCheckboxOptions} features={features} />
      <VisualOptions isChecked={handleCheckboxOptions} visuals={visuals} />
      <button type="submit" onClick={handleSubmitWidget}>
        Add Widget
      </button>
    </form>
  );
};
export default WidgetSelect;
