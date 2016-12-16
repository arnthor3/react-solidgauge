import React from 'react';
import { render } from 'react-dom';
import SolidGauge, { Chart, Path, PathGroup, BackgroundPath, EndCircle, Label, Shadow } from '../src/';


const values = [
  { label: 'Email Campaign', value: 189, fill: '#881' },
  { label: 'Google AdWords', value: 65, fill: '#188' },
  { label: 'Youtube Campaign', value: 49, fill: '#818' },
  { label: 'Facebook Campaign', value: 29, fill: '#bb4' },
];

const chart = (
  <div
    style={{
      marginTop: '50px',
      width: '100%',
      height: '500px',
    }}
  >
    <Chart
      responsive
      margin={0.05}
      pathWidth={25}
      pathMargin={25}
      circle
      ease="bounce"
      background={{
        fill: '#ccc',
        stroke: '#999',
      }}
      endAngle={Math.PI * 1.5}
      values={values}
    >
      <PathGroup>
        <BackgroundPath />
        <Label
          fontSize="20"
        />
        <Path>

        </Path>
      </PathGroup>
    </Chart>
  </div>
);

const chart2 = (
  <div
    style={{
      marginTop: '50px',
      width: '100%',
      height: '500px',
    }}
  >
    <SolidGauge
      responsive
      margin={0.05}
      pathWidth={25}
      pathMargin={5}
      circle
      ease="bounce"
      background={{
        fill: '#ccc',
        stroke: '#999',
      }}
      animate
      animateTime={100}
      endAngle={Math.PI * 1.5}
      values={values}
    />
  </div>
);


render(chart, document.getElementById('app'));
