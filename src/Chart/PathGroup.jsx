import React, { Component, PropTypes } from 'react';
import { arc } from 'd3-shape';
import { select, selectAll, mouse } from 'd3-selection';
import 'd3-transition';
import cloneComponents from './cloneChildren';


const fillStroke = PropTypes.shape({
  fill: PropTypes.string,
  stroke: PropTypes.string,
});

const shape = PropTypes.shape({
  value: PropTypes.number,
  label: PropTypes.string,
  fill: PropTypes.string,
  stroke: PropTypes.string,
});

export default class PathGroup extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    values: PropTypes.arrayOf(shape),
    pathWidth: PropTypes.number,
    pathMargin: PropTypes.number,
    iter: PropTypes.number,
    endAngle: PropTypes.number,
    cornerRadius: PropTypes.number,
    background: fillStroke,
    fontSize: PropTypes.number,
    margin: PropTypes.number,
    chartMargin: PropTypes.number,
    data: shape,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    childRules: PropTypes.bool,
  }

  static defaultProps = {
    ease: 'easeBounce',
    childRules: true,
    background: {
      fill: '#ddd',
      stroke: '#aaa',
    },
  };

  render() {
    const chartMargin = this.props.chartMargin;
    const height = this.props.height - chartMargin;
    const fullRadius = Math.min((this.props.height / 2) - (chartMargin / 2), this.props.width / 2);
    const width = this.props.pathWidth * fullRadius;
    const margin = this.props.pathMargin * fullRadius;
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
            arc: thisArc,
            data: d,
            pathWidth: width,
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
                <path
                  d={thisArc()}
                  fill={this.props.background.fill}
                  stroke={this.props.background.stroke}
                />
                <g transform={`translate(${thisArc().split('A')[0].split('M')[1]})`} >
                  <text
                    style={{
                      pointerEvent: 'none',
                    }}
                    fontSize={this.props.fontSize}
                    fill={d.fill}
                    stroke={d.stroke}
                    textAnchor="end"
                    dx={-15}
                    dy={width / 2}
                  >{d.label}</text>
                </g>
                {cloneChildrenWithProps}
              </g>
            </g>
          );
        })}
      </g>
    );
  }
}
