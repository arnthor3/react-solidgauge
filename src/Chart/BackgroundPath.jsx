import React, { PropTypes } from 'react';

/*
  A very simple component
 */
const BackgroundPath = ({ arc, fill, stroke, filter }) => (
  <g>
    <path
      d={arc()}
      fill={fill}
      stroke={stroke}
      filter={filter}
    />
  </g>
);

BackgroundPath.propTypes = {
  arc: PropTypes.func,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  filter: PropTypes.string,
};

BackgroundPath.defaultProps = {
  fill: '#ddd',
  stroke: '#aaa',
};

export default BackgroundPath;
