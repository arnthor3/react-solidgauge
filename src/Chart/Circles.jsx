import React, { PropTypes } from 'react';

const END_CIRCLE = 'solid-gauge-end';

const StartCircle = ({ stroke, fill, r }) => (
  <circle
    stroke={stroke}
    fill={fill}
    r={r}
    cx={0}
    cy={0}
  />
);

const EndCircle = ({ stroke, fill, r }) => (
  <circle
    stroke={stroke}
    fill={fill}
    r={r}
    className="solid-gauge-end"
  />
);

const propTypes = {
  stroke: PropTypes.string,
  fill: PropTypes.string,
  r: PropTypes.number,
};

EndCircle.propTypes = propTypes;

StartCircle.propTypes = propTypes;

export { StartCircle, EndCircle };
