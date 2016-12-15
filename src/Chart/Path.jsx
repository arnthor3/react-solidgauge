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
    data: PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
      stroke: PropTypes.string,
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
    const value = this.props.data.value > 100 ? 100 : this.props.data.value;
    const el = select(this.container).select('path');

    const endCircle = select(this.container).select('circle.solid-gauge-end');
    const easeFn = ease[this.props.ease] ? ease[this.props.ease] : ease.easeSinInOut;
    el
      .datum([value])
      .transition()
      .ease(easeFn)
      .duration(4000)
      .attrTween('d', ([d]) => {
        const thisArc = this.props.arc;

        const scale = scaleLinear()
                        .domain([0, 100])
                        .range([0, this.props.endAngle]);

        const interpolatePath = interpolate(0, scale(value));
        if (el.empty()) {
          return t => thisArc.endAngle(interpolatePath(t))();
        }
        return (t) => {
          const newArc = arc()
                          .startAngle(thisArc.startAngle()() * 2)
                          .endAngle(thisArc.endAngle()() * 2)
                          .outerRadius(thisArc.outerRadius()())
                          .innerRadius(thisArc.innerRadius()());


          endCircle.attr('transform', `translate(${newArc.centroid()})`);
          return thisArc.endAngle(interpolatePath(t))();
        };
      });
    el.node().old = this.props.data.value;
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
        />
        {cloneChildrenWithProps}
      </g>
    );
  }
}
