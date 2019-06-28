import React from 'react';

import DWChart from 'react-datawrapper-chart';

export default ({
  title,
  caption,
  aria,
  ...props
}) => {
  return <DWChart {...props} />
}
