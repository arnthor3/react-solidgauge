import React from 'react';

const left = 'M8 24 L0 32 L8 42 L8 64 L64 64 L64 0 L8 0 Z';

const ToolTip = () => (
  <g className="toolTip" opacity="0" >
    <path d="M0 48 L26 48 L32 54 L38 48 L64 48 L64 0 L0 0 Z" fill="rgba(254,254,254,.95)" strokeWidth="4" stroke="red" />
    <text
      dy="30"
      dx="32"
      textAnchor="middle"
    >64%</text>
  </g>
);

export default ToolTip;
