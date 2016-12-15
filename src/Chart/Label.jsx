import React, { PropTypes } from 'react';

const Label = ({ data, fontSize, startPathCoordinates }) => (
  <g
    transform={`translate(${startPathCoordinates})`}
  >
    <text
      style={{
        pointerEvent: 'none',
      }}
      fontSize={fontSize}
      fill={data.fill}
      stroke={data.stroke}
      textAnchor="end"
      dx={-15}
      dy={4.5}
    >{data.label}</text>
  </g>
);


Label.propTypes = {
  data: PropTypes.shape({
    fill: PropTypes.string,
    stroke: PropTypes.string,
    label: PropTypes.string,
  }),
  fontSize: PropTypes.string,
  startPathCoordinates: PropTypes.string,
};

Label.defaultProps = {
  fill: '#ddd',
  stroke: '#aaa',
};

export default Label;
