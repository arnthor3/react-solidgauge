import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import BackgroundPath from '../src/Chart/BackgroundPath';

describe('<BackgroundPath />', () => {
  it('should render a single path element', () => {
    const dataString = 'this.data.string';
    const wrapper = mount(
      <BackgroundPath
        arc={() => dataString}
        fill="red"
        stroke="pink"
      />,
      );
    expect(wrapper.find('path').length).to.equal(1);
    const path = wrapper.find('path');
    expect(path.props().d).to.equal(dataString);
  });
});
