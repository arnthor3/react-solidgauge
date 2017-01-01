import React, { Children, cloneElement } from 'react';

/*
  This function clones the children and pass in the props
*/
export default (children, props) => (
    // Clone the children and add props to components like data, width and heigth
  Children.map(children,
    (child) => {
      // only pass data into Components not native browser elements
      const isComponent = typeof child.type !== 'string';
      if (isComponent) {
        const childProps = Object.assign({}, props, child.props);
        return React.cloneElement(
          child,
          childProps,
        );
      }
      return React.cloneElement(child);
    })
);
