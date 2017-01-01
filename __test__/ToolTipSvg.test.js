import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import * as tip from '../src/Helpers/toolTipSvg';

describe('ToolTipSvg', () => {
  it('should return a string', () => {
    const bottom = tip.bottom(100, 100);
    const top = tip.top(100, 100);
    expect(typeof bottom).to.equal('string');
    expect(typeof top).to.equal('string');
  });
});