import React, { Children, PropTypes } from 'react';
import cloneElement from './cloneChildren';
/*
  A template function that renders children if the condition is true
 */
const ReactIf = (props) => {
  if (!props.condition) {
    return null;
  }
  const { children, el, condition, ...nochildren } = props;

  return React.cloneElement(props.el, { children: cloneElement(children, nochildren) });
};

ReactIf.defaultProps = {
  el: <span />,
};

ReactIf.PropTypes = {
  // a boolean condition if true then render
  condition: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  // The user can pass in any element type
  // that will act as the parent node
  el: PropTypes.node,
};

export default ReactIf;
