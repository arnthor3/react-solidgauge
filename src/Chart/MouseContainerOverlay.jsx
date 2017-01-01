import React, { Component, PropTypes } from 'react';
import { arc } from 'd3-shape';
import { select, selectAll, mouse } from 'd3-selection';
import cloneComponents from '../Helpers/cloneChildren';
import ToolTip from './ToolTip';
import { dataShape, fillAndStroke } from '../Helpers/props';
import * as tip from '../Helpers/toolTipSvg';
import * as dh from '../Helpers/dimensions';
import * as ch from '../Helpers/constants';

export default class PathGroup extends Component {
  static propTypes = {
    height: PropTypes.number,
    values: dataShape,
    endAngle: PropTypes.number,
  }

  componentDidMount() {
    this.appendHover();
  }

  componentDidUpdate(prevProps, prevState) {
    this.appendHover();
  }
  appendHover() {
    const el = select(this.container);
    const elV = el.node().parentElement.querySelector('canvas');
    const tool = select(el.node().querySelector('.toolTip'));
    let mw = 180;
    const mh = 60;
    let top = tip.top(mw, mh);
    let bottom = tip.bottom(mw, mh);
    el
      .selectAll(`path.${ch.MOUSE_PATH}`)
      .on('mousemove', (d, i, p) => {
        const pos = mouse(el.node());
        let translateMouse;
        const isBottom = (pos[1] < this.props.height / 4);
        const { fill, value, label } = this.props.values[i];
        const text = tool.select('text');
        const textLength = text.node().getComputedTextLength() * 1.1;

        text
          .attr('dy', isBottom ? mh / 1.5 : mh / 2)
          .attr('dx', 5);

        text
          .select('tspan.label')
          .text(label);

        text
          .select('tspan.value')
          .text(`${Math.floor(value)}%`);
        mw = textLength;
        top = tip.top(textLength, mh);
        bottom = tip.bottom(textLength, mh);

        if (isBottom) {
          tool
            .select('path')
            .attr('d', bottom);
          translateMouse = `translate(${pos[0] - (mw / 2)},${pos[1] + (mh * 0.25)})`;
        } else {
          tool
            .select('path')
            .attr('d', top);
          translateMouse = `translate(${pos[0] - (mw / 2)},${pos[1] - (mh * 1.1)})`;
        }
        tool
          .select('path')
          .attr('stroke', fill);
        tool
          .attr('transform', translateMouse);
        tool
          .transition()
          .duration(0)
          .attr('opacity', 1);
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
    const dim = dh.getDimensions(this.props);
    return (
      <g
        ref={(c) => { this.container = c; }}
      >
        <ToolTip />
        {this.props.values.map((d, i) => {
          const { cX, cY, outer } = dh.getRadius(dim, i);
          const thisArc = (
            arc()
              .outerRadius(outer)
              .innerRadius(outer - dim.marginAndWidth)
              .startAngle(0)
              .endAngle(this.props.endAngle)
          );
          return (
            <g key={i} transform={`translate(0,${i * dim.marginAndWidth})`}>
              <g transform={`translate(${cX},${cY})`}>
                <path
                  className={ch.MOUSE_PATH}
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
