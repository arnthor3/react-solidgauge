import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { arc } from 'd3-shape';
import { Path } from '../src/index';
import { select } from 'd3-selection';

describe('<Path />', () => {
  it('should render path in animation mode with circle', (done) => {
    const wrapper = mount(
      <Path
        data={{
          fill: 'red',
          stroke: 'pink',
          label: 'this',
          value: 23,
        }}
        animate
        animateTime={200}
        ease="easeLinear"
        circleRadius={20}
        arc={arc().endAngle(Math.PI).startAngle(0).outerRadius(10).innerRadius(0)}
      />,
    );

    const path = select(wrapper.find('path').node);
    const oldD = path.attr('d');

    setTimeout(() => {
      const newD = path.attr('d');
      expect(oldD).not.to.equal(newD);
      done();
    }, 400);

    const c = wrapper.find('circle');
    expect(c.length).to.equal(1);
    wrapper.update();
  });
  it('should render path in animation mode with no circle', (done) => {
    const wrapper = mount(
      <Path
        data={{
          fill: 'red',
          stroke: 'pink',
          label: 'this',
          value: 23,
        }}
        animate
        animateTime={200}
        ease="easeLinear"
        arc={arc().endAngle(Math.PI).startAngle(0).outerRadius(10).innerRadius(0)}
      />,
    );

    const path = select(wrapper.find('path').node);
    const oldD = path.attr('d');

    setTimeout(() => {
      const newD = path.attr('d');
      expect(oldD).not.to.equal(newD);
      done();
    }, 400);

    const c = wrapper.find('circle');
    expect(c.length).to.equal(0);
    wrapper.update();
  });
  it('should render path in static mode', () => {
    const wrapper = mount(
      <Path
        data={{
          fill: 'red',
          stroke: 'pink',
          label: 'this',
          value: 23,
        }}
        animate={false}
        arc={arc().endAngle(Math.PI).startAngle(0).outerRadius(10).innerRadius(0)}
        circleRadius={20}
      />,
    );
    wrapper.update();
    const circle = wrapper.find('circle');
  });
});
