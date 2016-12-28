import React, { PropTypes } from 'react';

const left = 'M8 24 L0 32 L8 42 L8 64 L64 64 L64 0 L8 0 Z';

const ToolTip = ({ mouseFill, mouseStrokeWidth }) => (
  <g className="toolTip" opacity="0" >
    <path
      d="M0 48 L26 48 L32 54 L38 48 L64 48 L64 0 L0 0 Z"
      fill={mouseFill}
      strokeWidth={mouseStrokeWidth}
    />
    <text textAnchor="middle" />
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
