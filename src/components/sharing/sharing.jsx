import React from "react";
import PropTypes from "prop-types";
import Config from "../../../gatsby-config";
import { Twitter, Facebook, Mail, Whatsapp, Telegram, Reddit, Xing, Linkedin } from "react-social-sharing";
import styles from "./sharing.module.css";

const Sharing = ({ linkURL, twitter, facebook, mail, whatsapp, telegram, reddit, xing, linkedin }) => {
  const URL = `https://data.wdr.de${Config.pathPrefix}/`;

  return (
    <div className={styles.buttonRow}>
      {twitter && <Twitter solid small link={linkURL || URL} label={serviceName => `Teilen via ${serviceName}`} />}
      {facebook && <Facebook solid small link={linkURL || URL} label={serviceName => `Teilen via ${serviceName}`} />}
      {mail && <Mail solid small link={linkURL || URL} label={serviceName => `Teilen via ${serviceName}`} />}
      {whatsapp && <Whatsapp solid small link={linkURL || URL} label={serviceName => `Teilen via ${serviceName}`} />}
      {telegram && <Telegram solid small link={linkURL || URL} label={serviceName => `Teilen via ${serviceName}`} />}
      {reddit && <Reddit solid small link={linkURL || URL} label={serviceName => `Teilen via ${serviceName}`} />}
      {xing && <Xing solid small link={linkURL || URL} label={serviceName => `Teilen via ${serviceName}`} />}
      {linkedin && <Linkedin solid small link={linkURL || URL} label={serviceName => `Teilen via ${serviceName}`} />}
    </div>
  );
};

Sharing.propTypes = {
  linkURL: PropTypes.string,
  twitter: PropTypes.bool,
  facebook: PropTypes.bool,
  mail: PropTypes.bool,
  whatsapp: PropTypes.bool,
  telegram: PropTypes.bool,
  reddit: PropTypes.bool,
  xing: PropTypes.bool,
  linkedin: PropTypes.bool
};

export default Sharing;
