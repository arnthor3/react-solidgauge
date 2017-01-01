import React, { Component, PropTypes } from 'react';
import cloneComponents from '../Helpers/cloneChildren';

const Group = (props) => {
  const { children, ...noChildren } = props;
  // Clone the children and pass in the props and state
  const clonedChildren = cloneComponents(
    props.children, props);

  return (
    <g transform={`translate(0, ${props.chartMargin / 2})`}>
      {clonedChildren}
    </g>
  );
};

Group.propTypes = {
  chartMargin: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Group;
