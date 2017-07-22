import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { arc } from 'd3-shape';
import { select, selectAll, mouse } from 'd3-selection';
import cloneChildren from 'react-offcharts-core/Utils/cloneChildren';
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
    selectable: PropTypes.bool,
    onSelect: PropTypes.func,
  }

  static defaultProps = {
    onSelect: () => {},
  }

  componentDidMount() {
    this.appendHover();
    if (this.props.selectable) {
      this.appendSelect();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.appendHover();
  }

  appendSelect() {
    const el = select(this.container);
    el
      .selectAll(`path.${ch.MOUSE_PATH}`)
      .on('click', (d, i, p) => {
        this.props.onSelect(p[i]);
      });
  }

  appendHover() {
    const el = select(this.container);
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
        const mouseText = tool.select('text');
        mouseText
          .select('tspan.label')
          .text(label);

        mouseText
          .select('tspan.value')
          .text(`${Math.floor(value)}%`);
        const textLength = dh.getTextLength(mouseText.node());
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
        mouseText
          .attr('dy', isBottom ? mh / 1.5 : mh / 2)
          .attr('dx', 5);


        tool
          .select('path')
          .attr('stroke', fill);
        tool
          .attr('transform', translateMouse);
        tool
          .transition()
          .duration(50)
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
          const { cX, cY, r } = dh.getRadius(dim, i);
          const thisArc = (
            arc()
              .outerRadius(r)
              .innerRadius(r - dim.marginAndWidth)
              .startAngle(0)
              .endAngle(this.props.endAngle)
          );
          const offset = i * dim.marginAndWidth;
          return (
            <g key={i} transform={`translate(${offset},${offset})`}>
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
