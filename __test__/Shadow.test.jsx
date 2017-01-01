import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { arc } from 'd3-shape';
import { select } from 'd3-selection';
import Shadow from '../src/Chart/Shadows';

describe('<Shadows />', () => {
  it('should render', () => {
    const wrapper = mount(
      <Shadow />,
    );
  });
});
