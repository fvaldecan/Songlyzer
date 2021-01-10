import React, { Component } from "react";
import VisualOptions from "./VisualOptions/VisualOptions";
import FeatureOptions from "./FeatureOptions/FeatureOptions";

export default class WidgetSelect extends Component {
  constructor(props) {
    console.log("Rendering Widget Select Menu...");
    super(props);
    this.state = {
      current_single_song: this.props.current_single_song,
      song_map: this.props.song_map,
      is_single: this.props.is_single,
      widget: Component,
      features_selected: [],
      features: {
        basic: {
          options: ["song_title", "album_title", "artist_name"],
          disabled: false,
        },
        details: {
          options: [
            "album_type",
            "track_number",
            "release_date",
            "key",
            "duration",
            "explicit",
          ],
          disabled: false,
        },
        audio_features: {
          options: [
            "acousticness",
            "danceability",
            "energy",
            "happiness",
            "liveness",
            "loudness",
            "popularity",
            "sadness",
            "speechiness",
            "tempo",
          ],
          disabled: false,
        },
      },
      visuals: {
        plain_text: { options: "plain_text", disabled: false },
        bar: { options: "bar", disabled: false },
        radix: { options: "radix", disaled: false },
      },
    };
  }
  addToSelectedFeatures = (feature) => {
    let new_features_selected = this.state.features_selected;
    new_features_selected.push(feature);
    return new_features_selected;
  };
  removeFromSelectedFeatures = (feature) => {
    let new_features_selected = this.state.features_selected.filter(
      (feat) => feat !== feature
    );
    return new_features_selected;
  };
  // disableSelection = (selection) => {};
  // enableSelection = (selection) => {};
  handleCheckboxOptions = (event) => {
    const {
      features: { basic, details, audio_features },
      visuals: { plain_text, bar, radix },
      features_selected,
    } = this.state;
    const feature_is_checked = event.target.checked;
    const feature_selected = event.target.value;
    const old_featuers_selected_length = features_selected.length;
    const new_features_selected = feature_is_checked
      ? this.addToSelectedFeatures(feature_selected)
      : this.removeFromSelectedFeatures(feature_selected);
    const isStringFeature = () => {
      // True if features selected are 'basic' or 'details'
      return (
        new_features_selected.every((feature) =>
          basic.options.includes(feature)
        ) ||
        new_features_selected.every((feature) =>
          details.options.includes(feature)
        ) ||
        feature_selected === "plain_text"
      );
    };
    if (new_features_selected.length === 0) {
      basic.disabled = false;
      details.disabled = false;
      audio_features.disabled = false;
      plain_text.disabled = false;
      bar.disabled = false;
      radix.disabled = false;
      this.setState({
        basic: basic,
        details: details,
        audio_features: audio_features,
        plain_text: plain_text,
        bar: bar,
        radix: radix,
      });
    } else if (
      old_featuers_selected_length === 0 &&
      new_features_selected.length > 0
    ) {
      // Only happens on completely new sets of selections
      const is_string_feature = isStringFeature();
      basic.disabled = !is_string_feature;
      details.disabled = !is_string_feature;
      audio_features.disabled = is_string_feature;
      plain_text.disabled = !is_string_feature;
      bar.disabled = is_string_feature;
      radix.disabled = is_string_feature;
      this.setState({
        basic: basic,
        details: details,
        audio_features: audio_features,
        plain_text: plain_text,
        bar: bar,
        radix: radix,
      });
    }
    this.setState({
      features_selected: new_features_selected,
    });
  };
  handleSubmitWidget = () => {};
  //   handleCheckboxDisable = (value) => {
  //     console.log(value);
  //     console.log("TODO: DISABLE/ENABLE");
  //   };
  render() {
    const { features, visuals } = this.state;
    return (
      <form>
        <FeatureOptions
          isChecked={this.handleCheckboxOptions}
          features={features}
        />
        <VisualOptions
          isChecked={this.handleCheckboxOptions}
          visuals={visuals}
        />
        <button type="submit" onClick={() => this.handleSubmitWidget}>
          Add Widget
        </button>
      </form>
    );
  }
}
