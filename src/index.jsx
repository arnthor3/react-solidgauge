import React from 'react';
import { render } from 'react-dom';
import Chart from './Chart/Chart';

const values = [
  { label: 'trhie', value: 34 },
  { label: '3425', value: 45 },
  { label: 'qwetr', value: 56 },
];

const chart = (
  <div
    style={{
      width: '500px',
      height: '500px',
    }}
  >
    <Chart
      animate
      fontSize="180px"
      amplitude={1}
      frequency={8}
      values={values}
      innerRadius={0.8}
      outerRadius={1}
    />
  </div>
);

render(chart, document.getElementById('app'));
