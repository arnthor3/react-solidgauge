import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-offcharts-core/Components/Chart';
import ReactIf from 'react-offcharts-core/Components/ReactIf';
import Shadows from 'react-offcharts-core/Components/Defs/Shadow';
import guid from 'react-offcharts-core/Utils/guid';
import Group from './Group';
import PathGroup from './PathGroup';
import Mouse from './MouseContainerOverlay';
import { dataShape, fillAndStroke } from '../Helpers/props';

const isEmpty = obj => Object.keys(obj).length === 0 && obj.constructor === Object;

const SolidGauge = props => (
  <Chart
    responsive={props.responsive}
    width={props.width}
    height={props.height}
  >
    <Group
      pathWidth={props.pathWidth}
      pathMargin={props.pathMargin}
      chartMargin={props.chartMargin}
      values={props.values}
      endAngle={props.endAngle}
    >
      <PathGroup
        background={props.background}
        fontSize={props.fontSize}
        enterAnimation={props.enterAnimation}
        animationEase={props.animationEase}
        animationTime={props.animationTime}
        circleRadius={props.circleRadius}
        endAngle={props.endAngle}
        shadow={!isEmpty(props.shadow)}
      />
      <ReactIf
        el={<g />}
        copy
        condition={props.showTooltip}
      >
        <Mouse
          mouseFill={props.mouseFill}
          mouseStrokeWidth={props.mouseStrokeWidth}
          selectable={props.selectable}
        />
      </ReactIf>
      <ReactIf el={<g />} condition={!isEmpty(props.shadow)}>
        <Shadows
          id="shadows"
          x={props.shadow.x}
          y={props.shadow.y}
          width={props.shadow.width}
          height={props.shadow.height}
          dx={props.shadow.dx}
          dy={props.shadow.dy}
          stdDeviation={props.shadow.stdDeviation}
        />
      </ReactIf>
    </Group>
  </Chart>
);

SolidGauge.propTypes = {
  enterAnimation: PropTypes.bool,
  responsive: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  values: dataShape,
  pathWidth: PropTypes.number,
  pathMargin: PropTypes.number,
  endAngle: PropTypes.number,
  background: fillAndStroke,
  fontSize: PropTypes.number,
  chartMargin: PropTypes.number,
  showTooltip: PropTypes.bool,
  animationTime: PropTypes.number,
  animationEase: PropTypes.string,
  circleRadius: PropTypes.number,
  mouseFill: PropTypes.string,
  mouseStrokeWidth: PropTypes.number,
  selectable: PropTypes.bool,
  shadow: PropTypes.shape({
    id: PropTypes.string,
    y: PropTypes.string,
    x: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    stdDeviation: PropTypes.number,
    dx: PropTypes.number,
    dy: PropTypes.number,
  }),
};

SolidGauge.defaultProps = {
  chartMargin: 50,
  shadow: {},
  background: {},
};

export default SolidGauge;
