import React from 'react';
import data from '../../../data/zauberfloete.csv';

import OrdinalFrame from "semiotic/lib/OrdinalFrame"

const frameProps = {
  data: data,
  size: [200, 200],
  type: "bar",
  oAccessor: "name",
  rAccessor: "tweets",
  style: { fill: "#ac58e5", stroke: "white" },
  title: "Tweets",
  oLabel: true
}

export default () => {
  return <OrdinalFrame {...frameProps} />
}
