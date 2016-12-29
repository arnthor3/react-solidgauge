import React, { Component, PropTypes } from 'react';
import { arc } from 'd3-shape';
import { select, selectAll, mouse } from 'd3-selection';
import cloneComponents from './cloneChildren';
import ToolTip from './ToolTip';
import * as tip from './ToolTipSvg';

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
      })),
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
    const mw = 90;
    const mh = 60;
    el
      .selectAll('path.mouse-path')
      .on('mousemove', (d, i, p) => {
        const pos = mouse(el.node());
        let translateMouse;
        if (pos[1] < this.props.height / 4) {
          tool
            .select('path')
            .attr('d', tip.bottom(mw, mh));
          translateMouse = `translate(${pos[0] - (mw / 2)},${pos[1] + (mh * 0.25)})`;
        } else {
          tool
            .select('path')
            .attr('d', tip.top(mw, mh));
          translateMouse = `translate(${pos[0] - (mw / 2)},${pos[1] - (mh * 1.1)})`;
        }

        const { fill, value, label } = this.props.values[i];


        tool
          .transition()
          .duration(0)
          .attr('opacity', 1);
        tool
          .select('path')
          .attr('stroke', fill);
        tool
          .select('text')
          .text(`${Math.floor(value)}%`)
          .attr('dy', mh / 2)
          .attr('dx', mw / 2);
        tool
          .attr('transform', translateMouse);
      });

    el.on('mouseleave', () => {
      tool
        .transition()
        .duration(500)
        .delay(250)
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
        transform={`translate(0,${chartMargin / 2})`}
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
                  className="mouse-path"
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
