import React, { PropTypes } from 'react';
import Chart from './Chart';
import PathGroup from './PathGroup';
import Path from './Path';
import Mouse from './MouseContainerOverlay';

const dataShape = PropTypes.shape({
  value: PropTypes.number,
  label: PropTypes.string,
  fill: PropTypes.string,
  stroke: PropTypes.string,
});

const SolidGauge = props => (
  <Chart
    responsive={props.responsive}
    width={props.width}
    height={props.height}
  >
    <PathGroup
      background={props.background}
      pathWidth={props.pathWidth}
      pathMargin={props.pathMargin}
      chartMargin={props.chartMargin}
      values={props.values}
      endAngle={props.endAngle}
      fontSize={props.fontSize}
      enterAnimation={props.enterAnimation}
    >
      <Path
        ease={props.ease}
        animate={props.animate}
        animateTime={props.animateTime}
        circleRadius={props.circleRadius}
        endAngle={props.endAngle}
      />
    </PathGroup>
    {props.showTooltip ? (
      <Mouse
        chartMargin={props.chartMargin}
        endAngle={props.endAngle}
        pathWidth={props.pathWidth}
        pathMargin={props.pathMargin}
        values={props.values}
        mouseFill={props.mouseFill}
        mouseStrokeWidth={props.mouseStrokeWidth}
      />) : <g />}
  </Chart>
);

const fillStroke = PropTypes.shape({
  fill: PropTypes.string,
  stroke: PropTypes.string,
});

const shape = PropTypes.shape({
  value: PropTypes.number,
  label: PropTypes.string,
  fill: PropTypes.string,
  stroke: PropTypes.string,
});


SolidGauge.propTypes = {
  enterAnimation: PropTypes.bool,
  responsive: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  values: PropTypes.arrayOf(shape),
  pathWidth: PropTypes.number,
  pathMargin: PropTypes.number,
  endAngle: PropTypes.number,
  background: fillStroke,
  fontSize: PropTypes.number,
  chartMargin: PropTypes.number,
  showTooltip: PropTypes.bool,
  animate: PropTypes.bool,
  animateTime: PropTypes.number,
  ease: PropTypes.string,
  circleRadius: PropTypes.number,
  mouseFill: PropTypes.string,
  mouseStrokeWidth: PropTypes.number,
};

SolidGauge.defaultProps = {
  chartMargin: 50,
};

export default SolidGauge;
