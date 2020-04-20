import React from "react";
import data from "../../../data/zauberfloete.csv";
import styles from "./semiotic_barChart.module.css";

let OrdinalFrame = () => <div />;
if (typeof window !== `undefined`) {
  OrdinalFrame = require("semiotic/lib/OrdinalFrame");
}

const colorHash = {
  primary: "var(--brand-primary)",
}

const frameProps = {
  data: data,
  size: [200, 200],
  type: "bar",
  oAccessor: "name",
  rAccessor: "tweets",
  style: { fill: colorHash.primary, stroke: "white" },
  title: "Tweets",
  oLabel: true
};

export default () => {
  return (
    <div className={styles.wrapper}>
      <OrdinalFrame {...frameProps} />
    </div>

  );
};
