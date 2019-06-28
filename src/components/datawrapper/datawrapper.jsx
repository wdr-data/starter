import React from 'react';

import DWChart from 'react-datawrapper-chart'

const frameProps = ({
    id,
    title,
    caption,
    aria,
    src
    ...props
})

  export default () => {
    return <DWChart {...frameProps} />
  }