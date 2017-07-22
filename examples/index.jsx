import React, { Component } from 'react';
import { render } from 'react-dom';
import SolidGauge from '../src/';


const value0 = [
  { label: 'Email Campaign', value: 189, fill: '#881' },
  { label: 'Google AdWords', value: 65, fill: '#188' },
  { label: 'Youtube Campaign', value: 49, fill: '#818' },
  { label: 'Facebook Campaign', value: 29, fill: '#bb4' },
];

const value1 = [
  { label: 'Email Campaign', value: 89, fill: '#881' },
  { label: 'Google AdWords', value: 25, fill: '#188' },
  { label: 'Facebook Campaign', value: 49, fill: '#bb4' },
];

const value2 = [
  { label: 'Google AdWords', value: 55, fill: '#188' },
  { label: 'Facebook Campaign', value: 69, fill: '#bb4' },
];

const value3 = [
  { label: 'Facebook Campaign', value: 19, fill: '#bb4' },
];

const values = [value0, value1, value2, value3];

class ChartSG extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
    this.state = { iter: 0, show: false };
  }

  componentDidMount() {
    setTimeout(this.random(), 1000);
  }

  random() {
    this.setState({
      show: true,
    });
  }
  onClick() {
    this.setState({
      iter: (this.state.iter + 1) % 4,
    });
  }
  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: this.state.show ? 'block' : 'none',
        }}
      >
        <SolidGauge
          responsive
          selectable
          pathWidth={0.10}
          pathMargin={0.05}
          endAngle={Math.PI * 1.5}
          values={values[this.state.iter]}
          animationTime={1500}
          background={{
            fill: '#ddd',
            stroke: '#bbb',
          }}
          fontSize={18}
          showTooltip

        />
      </div>
    );
  }
}

render(<ChartSG />, document.getElementById('app'));
