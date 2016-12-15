import React, { Component, PropTypes } from 'react';
import { arc } from 'd3-shape';
import * as ease from 'd3-ease';
import { select, selectAll } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { interpolate } from 'd3-interpolate';
import 'd3-transition';

export default class Path extends Component {
  componentDidMount() {
    this.animate();
  }

  componentDidUpdate(prevProps, prevState) {

  }

  animate() {
    const el = select(this.container).select('path');
    const endCircle = select(this.container).select('circle.solid-gauge-end');
    console.log(this.props);
    el
      .datum([this.props.data.value])
      .transition()
      .ease(ease.easeBounce)
      .duration(2000)
      .attrTween('d', ([d]) => {
        console.log(this.props.arc.outerRadius()());
        const thisArc = this.props.arc;

        const scale = scaleLinear()
                        .domain([0, 100])
                        .range([0, this.props.endAngle]);

        const interpolatePath = interpolate(0, scale(this.props.data.value));
        function getPointX(y, radius) {
          return Math.cos(Math.asin(y/radius)) * radius;
        }
        return t => {
          const endAngle = thisArc.endAngle(interpolatePath(t))();
          const coords = endAngle.split("L")[1].split("A")[0];
          const [x, y] = coords.split(',');
          let yoff = y - 5;
          endCircle.attr('transform', `translate(${x}, ${yoff})`);
          return thisArc.endAngle(interpolatePath(t))();
        };
      });
  }

  draw() {

  }

  render() {
    return (
      <g
        ref={(c) => { this.container = c; }}
        transform={`translate(0,${this.props.cY})`}
      >
        <path
          ref={(c) => { this.path = c; }}
          fill={this.props.data.fill}
          stroke={this.props.data.stroke}
        />
        {this.props.children}
      </g>
    );
  }
}
