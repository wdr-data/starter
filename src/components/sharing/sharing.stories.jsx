import React from "react";
import { storiesOf } from "@storybook/react";

import Sharing from "./sharing.jsx";

storiesOf("Sharing", module).add("default", () => (
  <Sharing
    linkURL="https://www.youtube.com/watch?v=V-lGDgyUyG0"
    twitter
    facebook
    mail
    whatsapp
    telegram
    reddit
    xing
    linkedin
  />
));
