import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { arc } from 'd3-shape';
import { select } from 'd3-selection';
import { PathGroup } from '../src/index';

const values = [
  { label: 'Email Campaign', value: 189, fill: '#881' },
  { label: 'Google AdWords', value: 65, fill: '#188' },
  { label: 'Youtube Campaign', value: 49, fill: '#818' },
  { label: 'Facebook Campaign', value: 29, fill: '#bb4' },
];

describe('<PathGroup />', () => {
  it('should render', (done) => {
    const wrapper = mount(
      <PathGroup
        values={values}
        width={400}
        height={400}
        animationEase="I do not exist"
        animationTime={500}
        endAngle={Math.PI * 2}
      />,
    );
    setTimeout(() => {
      done();
    }, 1000);
  });
});