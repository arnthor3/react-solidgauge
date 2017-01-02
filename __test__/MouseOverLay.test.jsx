import React from 'react';
import * as d3 from 'd3-selection';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { arc } from 'd3-shape';
import { select } from 'd3-selection';
import ToolTip from '../src/Chart/MouseContainerOverlay';
import * as ch from '../src/Helpers/constants';
import * as dh from '../src/Helpers/dimensions';

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
    const path = select(wrapper.find(`path.${ch.MOUSE_PATH}`).nodes[0]);
    const event = document.createEvent('SVGEvents');
    event.initEvent('mousemove', true, true);
    const tool = select(wrapper.find('g.toolTip').node);
    done();
    path.node().dispatchEvent(event);
    setTimeout(() => {
      expect(tool.attr('opacity')).not.to.equal('0');
      done();
    }, 450);
  });
  it('should listen to mouseleave', (done) => {
    const wrapper = mount(
      <ToolTip
        values={values}
        width={400}
        height={400}
        endAngle={Math.PI * 2}
        arc={arc().endAngle(Math.PI).startAngle(0).outerRadius(10).innerRadius(0)}
      />,
    );
    const path = select(wrapper.find(`path.${ch.MOUSE_PATH}`).nodes[0]);
    const tool = select(wrapper.find('g.toolTip').node);
    tool.attr('opacity', '1');
    const eventOut = document.createEvent('SVGEvents');
    eventOut.initEvent('mouseleave', true, true);
    path.node().dispatchEvent(eventOut);
    done();
    setTimeout(() => {
      expect(tool.attr('opacity')).not.to.equal('1');
      done();
    }, 750);
  });

  it('should render mouse bottom when mouse is top', () => {
    const spy = sinon.stub(d3, 'mouse').returns([10, 10]);
    const wrapper = mount(
      <ToolTip
        values={values}
        width={400}
        height={400}
        endAngle={Math.PI * 2}
        arc={arc().endAngle(Math.PI).startAngle(0).outerRadius(10).innerRadius(0)}
      />,
    );
    const path = select(wrapper.find(`path.${ch.MOUSE_PATH}`).nodes[0]);
    const tool = select(wrapper.find('g.toolTip').node);
    const eventIn = document.createEvent('SVGEvents');
    eventIn.initEvent('mousemove', true, true);
    path.node().dispatchEvent(eventIn);
    expect(spy.called).to.equal(true);
    d3.mouse.restore();
  });

  it('should render mouse top when mouse is bottom', (done) => {
    const spy = sinon.stub(d3, 'mouse').returns([10, 10]);
    const stub = sinon.stub(dh, 'getTextLength').returns(110);
    const wrapper = mount(
      <ToolTip
        values={values}
        width={800}
        height={800}
        endAngle={Math.PI * 2}
        arc={arc().endAngle(Math.PI).startAngle(0).outerRadius(100).innerRadius(0)}
      />,
    );
    const path = select(wrapper.find(`path.${ch.MOUSE_PATH}`).nodes[0]);
    const tool = select(wrapper.find('g.toolTip').node);
    const text = tool.select('text');
    const eventIn = document.createEvent('SVGEvents');
    eventIn.initEvent('mousemove', true, true);
    path.node().dispatchEvent(eventIn);
    expect(spy.called).to.equal(true);
    // expect(text.attr('dx')).not.to.equal(null);
    d3.mouse.restore();
    setTimeout(() => {
      done();
    }, 1000);
  });

});
