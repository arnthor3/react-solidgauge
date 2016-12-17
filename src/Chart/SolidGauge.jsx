import React, { PropTypes } from 'react';
import Chart from './Chart';
import PathGroup from './PathGroup';
import BackgroundPath from './BackgroundPath';
import Label from './Label';
import Path from './Path';


const SolidGauge = props => (
  <Chart
    childRules={false}
    {...props}
  >
    <PathGroup>
      <BackgroundPath
        fill={props.background.fill}
        stroke={props.background.stroke}
      />
      <Label />
      <Path />
    </PathGroup>
  </Chart>
);

SolidGauge.propTypes = {
  background: PropTypes.shape({
    fill: PropTypes.string,
    stroke: PropTypes.string,
  }),
};

export default SolidGauge;
