import React from "react";

const id = process.env.GATSBY_WEBTREKK_ENV === "production" ? "968797372740766" : "882049745744921";

const Webtrekk = ({ cg1, cg2, cg3, cg4, cg5, publishedAt }) => {
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
  searchParams.append("cp4", publishedAt);
  searchParams.append("p", `441,${title.join("_")},1,1920x1200,24,1,1562577868831,0,975x1023,0`);

  const URL = `https://wdr01.wt-eu02.net/${id}/wt?${searchParams.toString()}`;

  return (
    <React.Fragment>
      <img style={{ display: "none" }} alt="Zählpixel" src={URL} />
      <img
        style={{ display: "none" }}
        alt="Zählpixel"
        src="https://de.ioam.de/tx.io?st=wdr&cp=Seite%2FStationaer&pt=CP&ps=lin&er=N22&rf=&r2=&ur=www1.wdr.de&xy=1920x1200x24&lo=DE%2FNordrhein-Westfalen&cb=0011&i2=0011dc7531cf30e8b5b8fbf30&ep=1566132994&vr=409&id=fbydv&lt=1536150091699&ev=&cs=dfnhd1&mo=1"
      />
    </React.Fragment>
  );
};

export default Webtrekk;
