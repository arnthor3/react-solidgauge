import React, { Component, PropTypes } from 'react';
import { timer } from 'd3-timer';
import { arc, area } from 'd3-shape';
import * as ease from 'd3-ease';
import { select, selectAll } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { interpolate } from 'd3-interpolate';


const PathGroup = (props) => {
  const offset = 50;
  const cX = (props.width / 2);
  const cY = (props.height / 2) - (props.iter * offset);
  const radius = Math.min(cX, cY);
  const outer = props.outerRadius * radius;
  const thisArc = arc()
                    .outerRadius(outer)
                    .innerRadius(outer - (offset / 2 ))
                    .startAngle(0)
                    .endAngle(Math.PI * 1.5);
  return (
    <g transform={`translate(${0},${props.iter * (offset)})`}>
      <g transform={`translate(${cX},${0})`}>
        <text
          textAnchor="end"
          dy={offset / 2.5}
          dx="-10px"
          style={{
            pointerEvents: 'none',
          }}
        >{props.data.label}</text>
      </g>
      <g transform={`translate(${cX},${cY})`}>
        <path d={thisArc()} />
      </g>
    </g>
  );

};

/*
  PropType for fill and stroke..
 */
const fillStroke = PropTypes.shape({
  fill: PropTypes.string,
  stroke: PropTypes.string,
});

export default class LiquidChart extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
  }

  static defaultProps = {
  };

  draw() {
    const el = select(this.container);
  }

  render() {
    const radius = Math.min(this.props.height / 2, this.props.width / 2);

    const cX = (this.props.width) / 2;
    const cY = (this.props.height) / 2;

    return (
      <g>
        {this.props.values.map((d, i) => (
          <PathGroup
            data={d}
            key={i}
            iter={i}
            {...this.props}
          />
       ))}
      </g>
    );
  }
}
