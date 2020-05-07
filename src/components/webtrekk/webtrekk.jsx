import React from "react";

const id = process.env.GATSBY_WEBTREKK_ENV === "production" ? "968797372740766" : "882049745744921";

const Webtrekk = ({ cg1, cg2, cg3, cg4, cg5, cg6, publishedAt }) => {
  const searchParams = new URLSearchParams();
  var title = [];
  searchParams.append("tz", "2");
  searchParams.append("la", "de");
  if (cg1) {
    searchParams.append("cg1", cg1);
    title = title.concat(cg1);
  }
  if (cg2) {
    searchParams.append("cg2", cg2);
    title = title.concat(cg2);
  }
  if (cg3) {
    searchParams.append("cg3", cg3);
    title = title.concat(cg3);
  }
  if (cg4) {
    searchParams.append("cg4", cg4);
    title = title.concat(cg4);
  }
  if (cg5) {
    searchParams.append("cg5", cg5);
    title = title.concat(cg5);
  }
  if (cg6) {
    searchParams.append("cg6", cg6);
    title = title.concat(cg6);
  }
  searchParams.append("cp4", publishedAt);
  searchParams.append("p", `441,${title.join("_")},1,1920x1200,24,1,1562577868831,0,975x1023,0`);

  const URL = `https://wdr01.wt-eu02.net/${id}/wt?${searchParams.toString()}`;

  return (
    <React.Fragment>
      <img style={{ display: "none" }} alt="Zählpixel" src={URL} />
    </React.Fragment>
  );
};

export default Webtrekk;
