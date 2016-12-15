import React, { PropTypes } from 'react';

const END_CIRCLE = 'solid-gauge-end';

const EndCircle = ({ stroke, fill, parentFill, parentStroke, r }) => (
  <circle
    stroke={stroke || parentStroke}
    fill={fill || parentFill}
    r={r}
    className="solid-gauge-end"
  />
);

const propTypes = {
  stroke: PropTypes.string,
  fill: PropTypes.string,
  parentFill: PropTypes.string,
  parentStroke: PropTypes.string,
  r: PropTypes.number,
};

EndCircle.propTypes = propTypes;


export default EndCircle;
