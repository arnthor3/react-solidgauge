import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { arc } from 'd3-shape';
import { select } from 'd3-selection';
import { ToolTip } from '../src/index';

const values = [
  { label: 'Email Campaign', value: 189, fill: '#881' },
  { label: 'Google AdWords', value: 65, fill: '#188' },
  { label: 'Youtube Campaign', value: 49, fill: '#818' },
  { label: 'Facebook Campaign', value: 29, fill: '#bb4' },
];

describe('<MouseOverlay />', () => {
  it('should render the elements', () => {
    const wrapper = mount(
      <ToolTip
        values={values}
        width={400}
        height={400}
        endAngle={Math.PI * 2}
      />,
    );

    wrapper.update();
    // 4 paths plus the tooltip
    expect(wrapper.find('path').length).to.equal(5);
  });
  it('should listen to mouseover', (done) => {
    const wrapper = mount(
      <ToolTip
        values={values}
        width={400}
        height={400}
        endAngle={Math.PI * 2}
        arc={arc().endAngle(Math.PI).startAngle(0).outerRadius(10).innerRadius(0)}
      />,
    );
    const path = select(wrapper.find('path').nodes[0]);
    const event = document.createEvent('SVGEvents');
    event.initEvent('mousemove', true, true);
    path.node().dispatchEvent(event);
    const tool = select(wrapper.find('g.toolTip').node);
    expect(tool.attr('opacity')).to.equal('0');
    const eventOut = document.createEvent('SVGEvents');
    event.initEvent('mouseleave', true, true);
    path.node().dispatchEvent(event);
    setTimeout(() => {
      expect(tool.attr('opacity')).not.to.equal('1');
      done();
    }, 1000);
  });
});
