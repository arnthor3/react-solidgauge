import React, { Component, PropTypes } from 'react';
import { arc } from 'd3-shape';
import * as ease from 'd3-ease';
import { select, selectAll } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { interpolate } from 'd3-interpolate';
import 'd3-transition';
import cloneComponents from './cloneChildren';

export default class Path extends Component {
  static propTypes = {
    // The thing that is being visualized and compared
    data: PropTypes.shape({
      // value number between 0 and 100
      value: PropTypes.number,
      // name of data value
      label: PropTypes.string,
      // stroke color
      stroke: PropTypes.string,
      // fill color
      fill: PropTypes.string,
    }),
    animate: PropTypes.bool,
    animateTime: PropTypes.number,
    ease: PropTypes.string,
    arc: PropTypes.func,
    endAngle: PropTypes.number,
    cY: PropTypes.number,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }

  static defaultProps = {
    animate: true,
    animateTime: 2000,
    ease: 'easeSinInOut',
  }

  componentDidMount() {
    if (this.props.animate) {
      this.animate();
      return;
    }
    this.draw();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.animate) {
      this.animate();
      return;
    }
    this.draw();
  }

  animate() {
    // limit the value tops 100 and min 0
    let value = this.props.data.value > 100 ? 100 : this.props.data.value;
    value = value > 0 ? value : 0;

    // Get the path element
    const path = select(this.container).select('path');

    const endCircle = select(this.container).select('circle.solid-gauge-end');

    const easeFn = ease[this.props.ease] ? ease[this.props.ease] : ease.easeSinInOut;

    path
      .datum([value])
      .transition()
      .ease(easeFn)
      .duration(this.props.animateTime)
      .attrTween('d', ([d]) => {
        const thisArc = this.props.arc;

        const scale = scaleLinear()
                        .domain([0, 100])
                        .range([0, this.props.endAngle]);
        const interpolatePath = interpolate(scale(path.node().old || 0), scale(value));

        if (endCircle.empty()) {
          return t => thisArc.endAngle(interpolatePath(t))();
        }
        return (t) => {
          thisArc.endAngle(interpolatePath(t));
          const newArc = arc()
                          .startAngle(thisArc.startAngle()() * 2)
                          .endAngle(thisArc.endAngle()() * 2)
                          .outerRadius(thisArc.outerRadius()())
                          .innerRadius(thisArc.innerRadius()());

          endCircle.attr('transform', `translate(${newArc.centroid()})`);
          return thisArc.endAngle(interpolatePath(t))();
        };
      })
      .on('end', () => {
        path.node().old = value;
      });
  }

  draw() {
    const thisArc = this.props.arc;
    const el = select(this.container).select('path');

    const endCircle = select(this.container).select('circle.solid-gauge-end');
    const scale = scaleLinear()
                        .domain([0, 100])
                        .range([0, this.props.endAngle]);
    el
      .datum([this.props.data.value])
      .attr('d', thisArc.endAngle(scale(this.props.data.value)));
    if (!endCircle.empty()) {
      const newArc = arc()
                          .startAngle(thisArc.startAngle()() * 2)
                          .endAngle(thisArc.endAngle()() * 2)
                          .outerRadius(thisArc.outerRadius()())
                          .innerRadius(thisArc.innerRadius()());
      endCircle
        .attr('transform', `translate(${newArc.centroid()})`);
    }
  }

  render() {
    const { children, ...noChildren } = this.props;

    // Copy the props and the state to pass it down to the children
    const props = Object.assign({}, noChildren, {
      parentFill: this.props.data.fill,
      parentStroke: this.props.data.stroke,
    });

    // Clone the children and pass in the props and state
    const cloneChildrenWithProps = cloneComponents(children, props);
    return (
      <g
        ref={(c) => { this.container = c; }}
      >
        <path
          ref={(c) => { this.path = c; }}
          fill={this.props.data.fill}
          stroke={this.props.data.stroke}
          filter={this.props.filter}
        />
        {cloneChildrenWithProps}
      </g>
    );
  }
}
