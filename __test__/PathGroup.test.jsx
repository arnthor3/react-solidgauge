import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { arc } from 'd3-shape';
import { select } from 'd3-selection';
import { PathGroup } from '../src/index';
import * as constants from '../src/Helpers/constants';

const values = [
  { label: 'Email Campaign', value: 189, fill: '#881' },
  { label: 'Google AdWords', value: 65, fill: '#188' },
  { label: 'Youtube Campaign', value: 49, fill: '#818' },
  { label: 'Facebook Campaign', value: 29, fill: '#bb4' },
];

describe('<PathGroup />', () => {
  it('should render in animation mode', (done) => {
    const wrapper = mount(
      <PathGroup
        values={values}
        width={400}
        height={400}
        animationEase="I do not exist"
        animationTime={500}
        endAngle={Math.PI * 2}
        circleRadius={20}
      />,
    );
    setTimeout(() => {
      done();
    }, 1000);
  });
  it('should render in animation mode even if I do not specify animation time and misspell ease', (done) => {
    const wrapper = mount(
      <PathGroup
        values={values}
        width={400}
        height={400}
        animationEase="I do not exist"
        endAngle={Math.PI * 2}
        circleRadius={20}
      />,
    );
    setTimeout(() => {
      done();
    }, 1000);
  });
  it('should render in animation mode', (done) => {
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
  it('should not render when there are no values', (done) => {
    let wrapper;
    try {
      wrapper = mount(
        <PathGroup
          width={400}
          height={400}
          animationEase="I do not exist"
          animationTime={500}
          endAngle={Math.PI * 2}
        />,
      );
    } catch (ex) {
      expect(ex.message).to.equal(constants.NO_DATA);
    }

    setTimeout(() => {
      done();
    }, 1000);
  });
  it('should render in draw mode', () => {
    const wrapper = mount(
      <PathGroup
        values={values}
        width={400}
        height={400}
        endAngle={Math.PI * 2}
        circleRadius={20}
      />,
    );
    wrapper.update();
  });
});
