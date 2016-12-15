import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import Chart from '../src/Chart/Chart';

describe('<Chart />', () => {
  it('should resize on resize', (done) => {
    const spy = sinon.spy(Chart.prototype, 'onResize');
    const G = () => <g />;
    const wrapper = mount(
      <Chart
        responsive
      >
        <G />
      </Chart>,
    );
    // it calls onResize when the chart inits
    expect(spy.called).to.equal(true);
    // trigger another one
    window.dispatchEvent(new window.Event('resize'));
    // wait for the throttle to finish
    setTimeout(() => {
      expect(spy.calledTwice).to.equal(true);
      done();
    }, 500);
  });
  // TODO: Need to figure out a way to mimic chart size
  it('should only render children if height or width are not 0', () => {
  });
});
