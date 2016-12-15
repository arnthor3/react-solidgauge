import React, { Component, PropTypes } from 'react';
import { arc } from 'd3-shape';
import * as ease from 'd3-ease';
import { select, selectAll } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { interpolate } from 'd3-interpolate';
import 'd3-transition';
import PathGroup from './PathGroup_';


export default class SolidGauge extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    values: PropTypes.arrayOf({}),
    startAngle: PropTypes.number,
    endAngle: PropTypes.number,
    ease: PropTypes.string,
  }

  static defaultProps = {
    ease: 'easeBounce',
  };

  componentDidMount() {
    const el = select(this.container)
                .selectAll('path.val');
    let thisEase;
    if (ease[this.props.ease]) {
      thisEase = ease[this.props.ease];
    } else {
      thisEase = ease.easeBounce;
    }

    el
      .transition()
      .duration(2000)
      .ease(ease.easeBounce)
      .attrTween('d', ([d], i) => {
        const thisArc = el.nodes()[i].arc;

        const scale = scaleLinear()
                        .domain([0, 100])
                        .range([this.props.startAngle, this.props.endAngle]);

        const interpolatePath = interpolate(0, scale(d));

        return t => thisArc.endAngle(interpolatePath(t))();
      });
  }

  draw() {
    const el = select(this.container);
  }

  render() {
    const radius = Math.min(this.props.height / 2, this.props.width / 2);

    const cX = (this.props.width) / 2;
    const cY = (this.props.height) / 2;

    return (
      <g
        ref={(c) => { this.container = c; }}
      >
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
