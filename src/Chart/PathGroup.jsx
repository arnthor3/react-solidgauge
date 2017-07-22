import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { arc } from 'd3-shape';
import * as ease from 'd3-ease';
import { select, selectAll } from 'd3-selection';

import { interpolate } from 'd3-interpolate';
import 'd3-transition';
import * as ch from '../Helpers/constants';
import * as dh from '../Helpers/dimensions';
import { dataShape, fillAndStroke } from '../Helpers/props';

export default class Path extends Component {
  static propTypes = {
    animationTime: PropTypes.number,
    animationEase: PropTypes.string,
    values: dataShape,
    background: fillAndStroke,
    circleRadius: PropTypes.number,
    fontSize: PropTypes.number,
    endAngle: PropTypes.number,
    shadow: PropTypes.bool,
    selectable: PropTypes.bool,
  }

  static defaultProps = {
    background: {},
  }


  componentWillMount() {
    if (this.props.values === undefined || this.props.values.length === 0) {
      throw new Error(ch.NO_DATA);
    }
  }


  componentDidMount() {
    this.renderChart(750);
  }

  componentDidUpdate(prevProps, prevState) {
    this.renderChart();
  }

  getAnimationVariables() {
    let aTime = this.props.animationTime;
    let aEase = ease[this.props.animationEase];

    if (aTime === undefined) {
      aTime = ch.animationTime;
    }

    if (typeof aEase !== 'function') {
      aEase = ease[ch.animationEase];
    }

    return {
      aTime,
      aEase,
    };
  }

  animate(enterDelay = 0) {
    const paths = select(this.container).selectAll(`path.${ch.VALUE_PATH}`);
    const endCircle = select(this.container).selectAll('circle');
    const scale = dh.getValueScale(this.props);
    const dim = dh.getDimensions(this.props);
    const { aTime, aEase } = this.getAnimationVariables();
    paths
      .transition()
      .duration(aTime)
      .delay(enterDelay)
      .ease(aEase)
      .attrTween('d', (d, i, path) => {
        // Select the endcircle we will be animating
        const endC = select(endCircle.nodes()[i]);

        // select the path that we are working with
        const p = select(path[i]);

        // read the old data value from the path
        const old = p.node().old || 0;

        // fix value min, max 0, 100
        let value = this.props.values[i].value;
        value = value > 100 ? 100 : value;
        value = value < 0 ? 0 : value;

        // get the arc we are working with
        const { thisArc } = dh.getRadius(dim, i);

        // create the interpolation between the old value and to the new value
        const inter = interpolate(scale(old), scale(value));

        // store the old value on the node
        p.node().old = value;

        // if the endcircle is empty then just animate the path
        if (endCircle.empty()) {
          return t => thisArc.endAngle((inter(t)))();
        }

        endCircle.attr('opacity', '1');

        return (t) => {
          thisArc.endAngle((inter(t)));
          const newArc = dh.doubleArc(thisArc);
          endC.attr('transform', `translate(${newArc.centroid()})`);
          return thisArc();
        };
      })
      .on('end', (d, i) => {
        if (this.props.selectable && i === this.props.values.length - 1) {
          this.appendSelectOnPaths();
        }
      });
  }

  draw() {
    const paths = select(this.container).selectAll(`path.${ch.VALUE_PATH}`);
    const endCircle = select(this.container).selectAll('circle');
    const scale = dh.getValueScale(this.props);
    const dim = dh.getDimensions(this.props);

    paths
      .attr('d', (d, i) => {
        const endC = select(endCircle.nodes()[i]);
        let value = this.props.values[i].value;
        value = value > 100 ? 100 : value;
        value = value < 0 ? 0 : value;
        const { thisArc } = dh.getRadius(dim, i);
        thisArc.endAngle(scale(value));
        const newArc = dh.doubleArc(thisArc);
        endC.attr('transform', `translate(${newArc.centroid()})`);
        return thisArc();
      });
  }

  renderChart(enterDelay) {
    const shouldAnimate = (
      this.props.animationTime || this.props.animationEase
    );
    if (shouldAnimate) {
      this.animate(enterDelay);
      return;
    }
    this.draw();
  }

  render() {
    const dim = dh.getDimensions(this.props);
    return (
      <g
        ref={(c) => { this.container = c; }}
      >
        {this.props.values.map((d, i) => {
          const { r, cX, cY, outer, thisArc } = dh.getRadius(dim, i, this.props.endAngle);
          const offset = i * dim.marginAndWidth;
          return (
            <g key={i} transform={`translate(${offset},${offset})`}>
              <g transform={`translate(${cX},${cY})`}>
                <path
                  d={thisArc()}
                  fill={this.props.background.fill}
                  stroke={this.props.background.stroke}
                  filter={this.props.shadow ? 'url(#shadows)' : ''}
                />
                <g
                  transform={`translate(${thisArc().split('A')[0].split('M')[1]})`}
                >
                  <text
                    style={{ pointerEvent: 'none' }}
                    fontSize={this.props.fontSize}
                    fill={d.fill}
                    stroke={d.stroke}
                    textAnchor="end"
                    dx={-15}
                    dy={dim.pathWidth / 2}
                  >{d.label}
                  </text>
                </g>
                <path
                  className={ch.VALUE_PATH}
                  fill={d.fill}
                  stroke={d.stroke}
                />
                {this.props.circleRadius ?
                  (<circle r={this.props.circleRadius} opacity="0" fill={d.fill} stroke={d.stroke} />)
                  : null}
              </g>
            </g>
          );
        })}
      </g>
    );
  }
}

