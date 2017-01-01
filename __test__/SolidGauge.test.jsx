import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import SolidGauge from '../src/index';

const values = [
  { label: 'Email Campaign', value: 189, fill: '#881' },
  { label: 'Google AdWords', value: 65, fill: '#188' },
  { label: 'Youtube Campaign', value: 49, fill: '#818' },
  { label: 'Facebook Campaign', value: 29, fill: '#bb4' },
];


describe('<SolidGauge />', () => {
  it('should render', () => {
    const wrapper = mount(
      <SolidGauge
        responsive
        values={values}
        circleRadius={2}
        pathMargin={0.2}
        pathWidth={0.1}
        fontSize={20}
        showTooltip
        shadow={{
          x: '10%',
        }}
        background={{
          fill: 'red',
          stroke: 'pink',
        }}
    />);
  });
});