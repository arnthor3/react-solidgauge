import React, { PropTypes } from 'react';

const Label = ({ data, fontSize, fontSizeAuto, startPathCoordinates, pathWidth }) => (
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
      dy={((fontSize / 2) + (pathWidth / 4)) || 0}
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
  pathWidth: PropTypes.number,
  fontSizeAuto: PropTypes.bool,
};

Label.defaultProps = {
  fill: '#ddd',
  stroke: '#aaa',
  fontSize: '18',
};

export default Label;
