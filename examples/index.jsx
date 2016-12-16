import React, { Component } from 'react';
import { render } from 'react-dom';
import SolidGauge, { Chart, Path, PathGroup, BackgroundPath, EndCircle, Label, Shadow, ToolTip } from '../src/';


const values = [
  { label: 'Email Campaign', value: 189, fill: '#881' },
  { label: 'Google AdWords', value: 65, fill: '#188' },
  { label: 'Youtube Campaign', value: 49, fill: '#818' },
  { label: 'Facebook Campaign', value: 29, fill: '#bb4' },
];

class ChartSG extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
    this.state = { values };
  }
  onClick() {
    const vals = this.state.values;
    this.setState({ values: this.state.values.map(d => {
      d.value = Math.random() * 100;
      return d;
    })});
  }
  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
        }}
        onClick={this.onClick}
      >
        <Chart
          responsive
          margin={0.05}
          pathWidth={0.1}
          pathMargin={0.1}
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
              fontSize={20}
            />
            <Path
              ease="easeBounce"
            >
            </Path>
          </PathGroup>
        </Chart>
      </div>
    );
  }
}

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
      ease="easeBounce"
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


render(<ChartSG />, document.getElementById('app'));
