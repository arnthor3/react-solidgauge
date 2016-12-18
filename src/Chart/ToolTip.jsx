import React from 'react';

const ToolTip = () => (
  <g className="toolTip">
    <path d="M0 48 L26 48 L32 54 L38 48 L64 48 L64 0 L0 0 Z" fill="rgba(254,254,254,.95)" strokeWidth="4" stroke="red" />
    <text
      dy="30"
      dx="20"
      textAnchor="start"
    >64%</text>
  </g>
);

export default ToolTip;
