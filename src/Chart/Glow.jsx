import React, { PropTypes } from 'react';

const Glow = ({ id, x, y, width, height, color, opacity, radius, dev }) => (
  <defs>
    <filter id={id} x={x} y={y} width={width} height={height}>
      <feFlood result="flood" floodColor={color} floodOpacity={opacity} />
      <feComposite in="flood" result="mask" in2="SourceGraphic" operator="in" />
      <feMorphology in="mask" result="dilated" operator="dilate" radius={radius} />
      <feGaussianBlur in="dilated" result="blurred" stdDeviation={dev} />
      <feMerge>
        <feMergeNode in="blurred" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
);

Glow.propTypes = {
  id: PropTypes.string,
  color: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  opacity: PropTypes.number,
  radius: PropTypes.number,
  dev: PropTypes.number,
};

export default Glow;
