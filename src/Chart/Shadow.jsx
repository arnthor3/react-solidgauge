import React, { Component, PropTypes } from 'react';

const shadows = props => (
  <defs>
    <filter
      id={props.id}
      y={props.y}
      x={props.x}
      height={props.height}
      width={props.width}
    >
      <feGaussianBlur
        in="SourceAlpha"
        stdDeviation={props.stdDeviation}
        result="blur"
      />
      <feOffset
        in="blur"
        dx={props.dx}
        dy={props.dy}
        result="offsetBlur"
      />
      <feMerge>
        <feMergeNode in="offsetBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
);

shadows.propTypes = {
  id: PropTypes.string,
  y: PropTypes.string,
  x: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  stdDeviation: PropTypes.number,
  dx: PropTypes.number,
  dy: PropTypes.number,
};

export default shadows;
