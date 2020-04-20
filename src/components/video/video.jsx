import React from "react";
import PropTypes from "prop-types";
import { Player, BigPlayButton } from "video-react";
import "video-react/dist/video-react.css";
import styles from "./video.module.css";

const WdrPlayer = ({ videoSrc, videoPoster }) => {
  return (
    <Player
      playsInline
      fluid
      poster={videoPoster}
      src={videoSrc}
    >
      <BigPlayButton className={styles.playButton}/>
    </Player>
  );
};

WdrPlayer.propTypes = {
  videoSrc: PropTypes.string,
  videoPoster: PropTypes.string,
};

export default WdrPlayer;
