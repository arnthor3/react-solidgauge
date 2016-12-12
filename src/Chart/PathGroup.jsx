import React, { Component, PropTypes } from 'react';
import { arc } from 'd3-shape';
import { select, selectAll } from 'd3-selection';

/*
  PropType for fill and stroke..
 */
const fillStroke = PropTypes.shape({
  fill: PropTypes.string,
  stroke: PropTypes.string,
});

export default class PathGroup extends Component {
  static propTypes = {
    pathWidth: PropTypes.number,
    pathMargin: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    iter: PropTypes.number,
    startAngle: PropTypes.number,
    endAngle: PropTypes.number,
    background: fillStroke,
    fontSize: PropTypes.string,
    data: PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
      fill: PropTypes.string,
      stroke: PropTypes.string,
    }),
  }
  componentDidMount() {
    const el = select(this.container).select('path.val');
    el.datum([this.props.data.value]);
    el.node().arc = this.localArc;
  }

  componentDidUpdate(prevProps, prevState) {
    const el = select(this.container).select('path.val');
    el.datum([this.props.data.value]);
  }


  render() {
    const marginAndWidth = this.props.pathWidth + this.props.pathMargin;
    const cX = (this.props.width / 2);
    const cY = (this.props.height / 2) - (this.props.iter * marginAndWidth);
    const radius = Math.min(cX, cY);
    const outer = 0.99 * radius;
    this.localArc = arc()
                      .outerRadius(outer)
                      .innerRadius(outer - (this.props.pathWidth))
                      .startAngle(this.props.startAngle)
                      .endAngle(this.props.endAngle);
    return (
      <g transform={`translate(${0},${this.props.iter * (marginAndWidth)})`}>
        <g transform={`translate(${cX},${0})`}>
          <text
            textAnchor="end"
            fontSize={this.props.fontSize}
            fill={this.props.data.fill}
            dy={marginAndWidth / 2}
            dx="-10px"
            style={{
              pointerEvents: 'none',
            }}
          >
            {this.props.data.label}
          </text>
        </g>
        <g
          ref={(c) => { this.container = c; }}
          transform={`translate(${cX},${cY})`}
        >
          <path
            d={this.localArc()}
            fill={this.props.background.fill}
            stroke={this.props.background.stroke}
          />
          <path
            fill={this.props.data.fill}
            stroke={this.props.data.stroke}
            className="val"
          />
        </g>
      </g>
    );
  }

}
