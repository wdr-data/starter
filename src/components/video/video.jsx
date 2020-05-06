import React from "react";
import PropTypes from "prop-types";
import { Player, BigPlayButton } from "video-react";
import "video-react/dist/video-react.css";
import styles from "./video.module.css";
import HLSSource from "./HLSSource.jsx";

const WdrPlayer = ({ videoId, videoPoster }) => {
  const m3uSource = `/m3u/${videoId}.m3u8`;
  return (
    <Player playsInline fluid poster={videoPoster}>
      <HLSSource isVideoChild src={m3uSource} />
      <BigPlayButton className={styles.playButton} />
    </Player>
  );
};

WdrPlayer.propTypes = {
  videoId: PropTypes.string,
  videoPoster: PropTypes.string
};

export default WdrPlayer;
