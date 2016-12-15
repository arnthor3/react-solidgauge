import React, { PropTypes } from 'react';

/*
  A very simple component
 */
const BackgroundPath = ({ arc, fill, stroke, cY }) => (
  <g>
    <path
      d={arc()}
      fill={fill}
      stroke={stroke}
    />
  </g>
);

BackgroundPath.propTypes = {
  arc: PropTypes.func,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  cY: PropTypes.number,
};

BackgroundPath.defaultProps = {
  fill: '#ddd',
  stroke: '#aaa',
};

export default BackgroundPath;
