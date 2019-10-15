import React from "react";
import data from "../../../data/zauberfloete.csv";

let OrdinalFrame = null;
if (typeof window !== `undefined`) {
  OrdinalFrame = require("semiotic/lib/OrdinalFrame");
}

const frameProps = {
  data: data,
  size: [200, 200],
  type: "bar",
  oAccessor: "name",
  rAccessor: "tweets",
  style: { fill: "#ac58e5", stroke: "white" },
  title: "Tweets",
  oLabel: true
};

export default () => {
  if (OrdinalFrame === null) {
    return null;
  }
  return <OrdinalFrame {...frameProps} />;
};
