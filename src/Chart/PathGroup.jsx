import React, { Component, PropTypes } from 'react';
import { arc } from 'd3-shape';
import { select, selectAll, mouse } from 'd3-selection';
import 'd3-transition';
import cloneComponents from './cloneChildren';


const fillStroke = PropTypes.shape({
  fill: PropTypes.string,
  stroke: PropTypes.string,
});

export default class PathGroup extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    values: PropTypes.arrayOf(
      PropTypes.shape({

      }),
    ),
    ease: PropTypes.string,
    pathWidth: PropTypes.number,
    pathMargin: PropTypes.number,
    iter: PropTypes.number,
    endAngle: PropTypes.number,
    cornerRadius: PropTypes.number,
    background: fillStroke,
    fontSize: PropTypes.string,
    margin: PropTypes.number,
    chartMargin: PropTypes.number,
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
    childRules: PropTypes.bool,
  }

  static defaultProps = {
    ease: 'easeBounce',
    chartMargin: 50,
    childRules: true,
  };

  render() {
    const chartMargin = this.props.chartMargin;
    const height = this.props.height - chartMargin;
    const fullRadius = Math.min((this.props.height / 2) - (chartMargin / 2), this.props.width / 2);
    const width = this.props.pathWidth * fullRadius;
    const margin = this.props.pathMargin * fullRadius;
    console.log(this.props);
    return (
      <g
        transform={`translate(0,${chartMargin / 2})`}
        ref={(c) => { this.container = c; }}
      >
        {this.props.values.map((d, i) => {
          const marginAndWidth = width + margin;

          const cX = (this.props.width / 2);
          const cY = (height / 2) - (i * marginAndWidth);
          const radius = Math.min(cX, cY);
          const outer = radius;
          const thisArc = arc()
                            .outerRadius(outer)
                            .innerRadius(outer - width)
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
            data: d,
            startPathCoordinates: thisArc().split('A')[0].split('M')[1],
            pathWidth: width,
            ease: this.props.ease,
          });

          // Clone the children and pass in the props and state
          const cloneChildrenWithProps = cloneComponents(
            this.props.children, props, this.childRules);

          return (
            <g
              key={i}
              transform={`translate(0,${i * marginAndWidth})`}
            >
              <g transform={`translate(${cX},${cY})`}>
                {cloneChildrenWithProps}
              </g>
            </g>
          );
        })}
      </g>
    );
  }
}
