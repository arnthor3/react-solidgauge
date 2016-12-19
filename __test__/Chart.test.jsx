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
        <path />
      </Chart>,
    );
    // it calls onResize when the chart inits
    expect(spy.calledOnce).to.equal(true);
    // trigger another one
    window.dispatchEvent(new window.Event('resize'));
    // wait for the throttle to finish
    setTimeout(() => {
      expect(spy.calledTwice).to.equal(true);
      Chart.prototype.onResize.restore();
      done();
    }, 500);
  });

  it('should only render children if height or width are not 0', () => {
    const G = () => <g />;
    const wrapper = mount(
      <Chart
        width={400}
        height={400}
      >
        <G />
      </Chart>,
    );

    expect(wrapper.find(G).length).to.equal(1);
    // it passes the width down
    expect(wrapper.find(G).props().width).to.equal(400);
  });

  it('should remove event listener on unmount', (done) => {
    const spy = sinon.spy(Chart.prototype, 'onResize');
    const wrapper = mount(<Chart responsive />);
    expect(spy.calledOnce).to.equal(true);
    wrapper.unmount();
    window.dispatchEvent(new window.Event('resize'));
    setTimeout(() => {
      expect(spy.calledTwice).to.equal(false);
      Chart.prototype.onResize.restore();
      done();
    }, 500);

  });
});
