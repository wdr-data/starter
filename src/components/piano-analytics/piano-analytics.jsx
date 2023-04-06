import React from "react";

import {
  sendEventClickAction,
  sendEventPageDisplay,
  pageConfigFromFrontmatter,
} from "../../lib/piano-analytics";
import FrontmatterContext from "../../templates/frontmatterContext";

export const PianoAnalyticsEventClick = (props) => {
  const frontmatterContext = React.useContext(FrontmatterContext);

  React.useEffect(() => {
    if (frontmatterContext && frontmatterContext !== "foo") {
      sendEventClickAction(
        pageConfigFromFrontmatter(frontmatterContext),
        props,
      );
    }
  }, [frontmatterContext, props]);

  return <React.Fragment />;
};

export const PianoAnalyticsEventPageDisplay = () => {
  const frontmatterContext = React.useContext(FrontmatterContext);

  React.useEffect(() => {
    if (frontmatterContext && frontmatterContext !== "foo") {
      sendEventPageDisplay(pageConfigFromFrontmatter(frontmatterContext));
    }
  }, [frontmatterContext]);

  return <React.Fragment />;
};

export default {
  PianoAnalyticsEventClick,
  PianoAnalyticsEventPageDisplay,
};
