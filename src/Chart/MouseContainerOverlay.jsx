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
        value: PropTypes.number,
        label: PropTypes.string,
        fill: PropTypes.string,
        stroke: PropTypes.string,
      }),
    ),
    pathWidth: PropTypes.number,
    pathMargin: PropTypes.number,
    endAngle: PropTypes.number,
    chartMargin: PropTypes.number,
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
    el.selectAll('path').on('mousemove', (d, i, p) => {
      // fix this mess
      const iter = i === 0 ? 1 : i;
      const { fill, value } = this.props.values[iter - 1];
      const pos = mouse(el.node());

      tool.transition().attr('opacity', 1);
      tool.select('path').attr('stroke', fill);
      tool.select('text').text(`${Math.floor(value)}%`);
      tool.attr('transform', `translate(${pos[0] - 26},${pos[1] - 64})`);
    });

    el.on('mouseleave', () => {
      tool
        .transition()
        .duration(500)
        .delay(500)
        .attr('opacity', 0);
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
        <g
          ref={(c) => { this.mouseoverlay = c; }}
        />
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
                  opacity="0"
                  fill={d.fill}
                  stroke={d.stroke}
                />
              </g>
            </g>
          );
        })}

      </g>
    );
  }
}
