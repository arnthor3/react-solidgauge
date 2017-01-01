import { arc } from 'd3-shape';
import { scaleLinear } from 'd3-scale';

export const getDimensions =
({ width, height, chartMargin, pathWidth, pathMargin }) => {
  const groupHeight = height - chartMargin;
  const groupWidth = width - chartMargin;
  const fullRadius = Math.min(groupHeight / 2, groupWidth / 2);
  const pWidth = fullRadius * pathWidth;
  const pMargin = fullRadius * pathMargin;
  return {
    groupHeight,
    groupWidth,
    marginAndWidth: pWidth + pMargin,
    pathMargin: pMargin,
    pathWidth: pWidth,
  };
};

export const getRadius =
  ({ groupWidth, groupHeight, pathWidth, pathMargin, marginAndWidth }, iter, endAngle) => {
    const cX = groupWidth / 2;
    const cY = (groupHeight / 2) - (iter * marginAndWidth);
    const outer = Math.min(cX, cY);

    const thisArc = (
      arc()
        .outerRadius(outer)
        .innerRadius(outer - pathWidth)
        .startAngle(0)
        .endAngle(endAngle)
    );

    return {
      thisArc,
      cX,
      cY,
      outer,
    };
  };

export const getValueScale = ({ values, endAngle }) =>
  scaleLinear().range([0, endAngle]).domain([0, 100]);

export const doubleArc = thisArc => (
  arc()
    .outerRadius(thisArc.outerRadius()())
    .innerRadius(thisArc.innerRadius()())
    .startAngle(thisArc.startAngle()())
    .endAngle(thisArc.endAngle()() * 2)
);
