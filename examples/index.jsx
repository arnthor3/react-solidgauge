import React from 'react';
import { render } from 'react-dom';
import { Chart, Path, PathGroup, BackgroundPath, StartCircle, EndCircle } from '../src/';

const values = [
  { label: 'Email Campaign', value: 89, fill: '#881' },
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
      pathWidth={5}
      pathMargin={35}
      circle
      fontSize={'20px'}
      ease="linear"
      background={{
        fill: '#ccc',
        stroke: '#999',
      }}
      endAngle={Math.PI * 1.5}
      values={values}
    >
      <PathGroup>
        <BackgroundPath />
        <Path>
          <StartCircle r={5} />
          <EndCircle
            r={10}
            fill={'rgba(90,90,150,1)'}
          />
        </Path>
    </PathGroup>
    </Chart>

  </div>
);

/*

  <Chart
    values={values}
    responsive
    endAngle={0}
    ease="bounce"
  >
    <PathGroup>
      <Text
        fontSize="23"
        stroke={}
        width={}
      />
      <BackgroundPath
        fill={}
        stroke={}
      />
      <Path>
        <StartCircle
        />
        <EndCircle
        />
      </Path>
    </PathGroup>

  </Chart>

*/

render(chart, document.getElementById('app'));
