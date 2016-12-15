import React, { Component, PropTypes } from 'react';
import { arc } from 'd3-shape';
import { select, selectAll } from 'd3-selection';
import cloneComponents from './cloneChildren';

const fillStroke = PropTypes.shape({
  fill: PropTypes.string,
  stroke: PropTypes.string,
});

export default class PathGroup extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,

    ease: PropTypes.string,
    pathWidth: PropTypes.number,
    pathMargin: PropTypes.number,
    iter: PropTypes.number,
    endAngle: PropTypes.number,
    background: fillStroke,
    fontSize: PropTypes.string,
    data: PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
      fill: PropTypes.string,
      stroke: PropTypes.string,
    }),
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }

  static defaultProps = {
    ease: 'easeBounce',
  };

  componentDidMount() {

  }

  componentDidUpdate(prevProps, prevState) {

  }

  animate() {
    this.isTrue = true;
  }

  draw() {
    this.draw();
  }

  render() {
    return (
      <g
        ref={(c) => { this.container = c; }}
      >
        {this.props.values.map((d, i) => {
          const marginAndWidth = this.props.pathWidth + this.props.pathMargin;
          const cX = (this.props.width / 2);
          const cY = (this.props.height / 2) - (i * marginAndWidth);
          const radius = Math.min(cX, cY);
          const outer = 0.99 * radius;

          const thisArc = arc()
                            .outerRadius(outer)
                            .innerRadius(outer - (this.props.pathWidth))
                            .startAngle(0)
                            .endAngle(this.props.endAngle);

          const { children, ...noChildren } = this.props;

          // Copy the props and the state to pass it down to the children
          const props = Object.assign({}, noChildren, {
            marginAndWidth,
            cX,
            cY,
            radius,
            outer,
            arc: thisArc,
            key: i,
            data: d,
          });

          // Clone the children and pass in the props and state
          const cloneChildrenWithProps = cloneComponents(this.props.children, props);

          return (
            <g transform={`translate(0,${i * marginAndWidth})`}>
              <g transform={`translate(${cX},0)`}>
                {cloneChildrenWithProps}
              </g>
            </g>
          );
        })}
      </g>
    );
  }
}