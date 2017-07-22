import React from 'react';
import PropTypes from 'prop-types';

const left = 'M8 24 L0 32 L8 42 L8 64 L64 64 L64 0 L8 0 Z';

const ToolTip = ({ mouseFill, mouseStrokeWidth }) => (
  <g className="toolTip" opacity="0" >
    <path
      d="M0 48 L26 48 L32 54 L38 48 L64 48 L64 0 L0 0 Z"
      fill={mouseFill}
      strokeWidth={mouseStrokeWidth}
    />
    <text fontSize="14">
      <tspan className="label" />
      <tspan className="value" fontWeight="bold" dx="4" />
    </text>
  </g>
);

ToolTip.propTypes = {
  mouseFill: PropTypes.string,
  mouseStrokeWidth: PropTypes.number,
};

ToolTip.defaultProps = {
  mouseFill: 'rgba(254,254,254,.95)',
  mouseStrokeWidth: 4,
};

export default ToolTip;
