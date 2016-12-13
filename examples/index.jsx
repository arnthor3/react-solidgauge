import React from 'react';
import { render } from 'react-dom';
import Chart from '../src/Chart/Chart';

const values = [
  { label: 'Email Campaign', value: 89, fill: '#881' },
  { label: 'Google AdWords', value: 65, fill: '#188' },
  { label: 'Youtube Campaign', value: 49, fill: '#818' },
];

const chart = (
  <div
    style={{
      width: '100%',
      height: '500px',
    }}
  >
    <Chart
      responsive
      values={values}
      pathWidth={50}
      pathMargin={15}
      fontSize={'20px'}
      ease=""
      background={{
        fill: '#ccc',
        stroke: '#999',
      }}
      startAngle={0}
      endAngle={Math.PI * 1.5}
    />
  </div>
);

render(chart, document.getElementById('app'));
