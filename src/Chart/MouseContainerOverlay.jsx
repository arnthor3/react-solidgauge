import React, { Component, PropTypes } from 'react';
import { arc } from 'd3-shape';
import { select, selectAll, mouse } from 'd3-selection';
import cloneComponents from './cloneChildren';
import ToolTip from './ToolTip';

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
  }

  static defaultProps = {
    ease: 'easeBounce',
    chartMargin: 20,
  };

  componentDidMount() {
    this.appendHover();
  }

  componentDidUpdate(prevProps, prevState) {
    this.appendHover();
  }

  appendHover() {
    const el = select(this.container);
    const tool = select(el.node().querySelector('.toolTip'));
    el.on('mousemove', () => {
      const pos = mouse(el.node());
      tool.attr('transform', `translate(${pos[0] - 20},${pos[1] - 50})`);
    });

    el.on('mouseleave', () => {
      tool.select('rect')
        .transition()
        .duartion(1000)
        .delay(1000)
        .style('opacity', 0);
    });
  }


  render() {
    const chartMargin = this.props.chartMargin;
    const height = this.props.height - chartMargin;
    const fullRadius = Math.min((this.props.height / 2) - (chartMargin / 2), this.props.width / 2);
    const width = this.props.pathWidth * fullRadius;
    const margin = this.props.pathMargin * fullRadius;

    return (
      <g
        transform="translate(0,20)"
        ref={(c) => { this.container = c; }}
      >
      <ToolTip />
        {this.props.values.map((d, i) => {
          const marginAndWidth = width + margin;

          const cX = (this.props.width / 2);
          const cY = (height / 2) - (i * marginAndWidth);
          const radius = Math.min(cX, cY);
          const outer = radius;
          const thisArc = arc()
                            .outerRadius(outer)
                            .innerRadius(outer - marginAndWidth)
                            .startAngle(0)
                            .endAngle(this.props.endAngle);

          return (
            <g
              key={i}
              transform={`translate(0,${i * marginAndWidth})`}
            >
              <g transform={`translate(${cX},${cY})`}>
                <path
                  d={thisArc()}
                  fill="rgba(0,0,0,0)"
                  stroke="rgba(0,0,0,0)"
                />
              </g>
            </g>
          );
        })}

      </g>
    );
  }
}
