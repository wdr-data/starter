import React from 'react';

import DWChart from 'react-datawrapper-chart'

  export default ({
    id,
    title,
    caption,
    aria,
    src
    ...props
}) => {
    return <DWChart />
  }