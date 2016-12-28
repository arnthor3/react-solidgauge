import React, { Component } from 'react';
import { render } from 'react-dom';
import SolidGauge from '../src/';


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
          width: '75%',
          height: '75%',
        }}
        onClick={this.onClick}
      >
        <SolidGauge
          responsive
          pathWidth={0.1}
          pathMargin={0.009}
          endAngle={Math.PI * 1.5}
          values={values}
          ease="easeBounce"
          background={{
            fill: '#ccc',
            stroke: '#999',
          }}
          animateTime={1500}
          showTooltip
        />
      </div>
    );
  }
}

render(<ChartSG />, document.getElementById('app'));
