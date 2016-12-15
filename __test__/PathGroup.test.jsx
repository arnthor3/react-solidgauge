import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import PathGroup from '../src/Chart/PathGroup';

describe('<PathGroup />', () => {
  it('should render children with all the required props to render the chart', () => {
    const values = [
      { label: 'Email Campaign', value: 89, fill: '#881' },
      { label: 'Google AdWords', value: 65, fill: '#188' },
      { label: 'Youtube Campaign', value: 49, fill: '#818' },
      { label: 'Facebook Campaign', value: 29, fill: '#bb4' },
    ];

    const MyFakeElement = () => (
      <g />
    );
    const wrapper = mount(
      <PathGroup
        values={values}
        width={200}
        height={200}
        pathMargin={15}
        pathWidth={15}
      >
        <MyFakeElement />
      </PathGroup>,
    );
    expect(wrapper.find(MyFakeElement).length).to.equal(4);

    const outerGroup = wrapper.find(MyFakeElement).nodes[0];
    const innerMostGroup = wrapper.find(MyFakeElement).nodes[3];

    expect(outerGroup.props.radius).to.be.above(innerMostGroup.props.radius);
    console.log(outerGroup.props);
  });
});
