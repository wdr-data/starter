import React from 'react';

import OrdinalFrame from "semiotic/lib/OrdinalFrame"

const frameProps = {
  data: [{ user: "Jason", tweets: 10, retweets: 5, favorites: 15 },
  { user: "Susie", tweets: 5, retweets: 100, favorites: 100 },
  { user: "Matt", tweets: 20, retweets: 25, favorites: 50 },
  { user: "Betty", tweets: 30, retweets: 20, favorites: 10 }],
  size: [200, 200],
  type: "bar",
  oAccessor: "user",
  rAccessor: "tweets",
  style: { fill: "#ac58e5", stroke: "white" },
  title: "Tweets",
  oLabel: true
}

export default () => {
  return <OrdinalFrame {...frameProps} />
}
