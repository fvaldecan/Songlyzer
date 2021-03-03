import React from "react";
import Bar from "../../Charts/Bar/Bar";
import PlainText from "../../Charts/PlainText/PlainText";
import { Colors } from "../../constants";
import { capitalizeFirstLetter } from "../../helpers";
import "../Dashboard.css";
const Widget = ({ featuresSelected, visualsSelected }) => {
  let widget;
  let widgetTitle = "";
  const numFeatures = featuresSelected.length;
  switch (visualsSelected) {
    case "bar":
      widget = <Bar features={featuresSelected} />;
      widgetTitle =
        numFeatures > 1
          ? "Audio Features"
          : capitalizeFirstLetter(featuresSelected[0]);
      break;
    // case "radar":
    //   widget = <Radar features={featuresSelected} />;
    //   break;
    // case "pie":
    //   widget = <Pie features={featuresSelected} />;
    //   break;
    // case "doughnut":
    //   widget = <Doughnut features={featuresSelected} />;
    //   break;
    default:
      widgetTitle =
        numFeatures > 1
          ? "Details"
          : capitalizeFirstLetter(featuresSelected[0]);
      widget = <PlainText features={featuresSelected} />;
      break;
  }
  widgetTitle = widgetTitle
    .split("_")
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");
  return (
    <div className="widget">
      <h3 style={{ margin: 0, color: Colors.BLACK }}>{widgetTitle}</h3>
      <hr style={{ width: "100%" }} />
      {widget}
    </div>
  );
};
export default Widget;
