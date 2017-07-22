import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cloneComponents from 'react-offcharts-core/Utils/cloneChildren';

const Group = props => (
  <g transform={`translate(0, ${props.chartMargin / 2})`}>
    {cloneComponents(props)}
  </g>
);


Group.propTypes = {
  chartMargin: PropTypes.number,
};

export default Group;
