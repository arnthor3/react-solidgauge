import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import Group from '../src/Chart/Group';

describe('<Group />', () => {
  it('should only render children container with margin if set', () => {
    const wrapper = mount(
      <Group
        chartMargin={20}
      >
        <g />
      </Group>,
    );
  });
});
