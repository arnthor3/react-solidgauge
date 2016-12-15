import React from 'react';
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
      <BackgroundPath />
      <Label />
      <Path />
    </PathGroup>
  </Chart>
);

export default SolidGauge;
