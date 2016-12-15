## React-solidgauge
This is a really nice looking react d3 graph that is sort of inspired by amcharts.

The chart is supposed to compare a couple of percentage values, so if you pass into the value

### Install from NPM
```sh
npm install react-solidgauge
```

### Usage

```js
import React from 'react';
import { render } from 'react-dom';
import { Chart, Path, PathGroup, BackgroundPath, EndCircle, Label } from '../src/';

console.log(Chart, Path, PathGroup, BackgroundPath, EndCircle, Label);

const values = [
  { label: 'Email Campaign', value: 89, fill: '#881' },
  { label: 'Google AdWords', value: 65, fill: '#188' },
  { label: 'Youtube Campaign', value: 49, fill: '#818' },
  { label: 'Facebook Campaign', value: 29, fill: '#bb4' },
];

const chart = (
  <div
    style={{
      marginTop: '50px',
      width: '100%',
      height: '500px',
    }}
  >
    <Chart
      responsive
      margin={0.05}
      pathWidth={2}
      pathMargin={40}
      circle
      ease="bounce"
      background={{
        fill: '#ccc',
        stroke: '#999',
      }}
      endAngle={Math.PI * 1.5}
      values={values}
    >
      <PathGroup>
        <BackgroundPath
          fill={someFill}
          stroke={someStroke}
        />
        <Label
          fontSize="18"
          dx="-15"
          dy="-4.5"
        />
        <Path>
          <EndCircle
            stroke="rgb(100,100,100)"
            r={12}
          />
        </Path>
      </PathGroup>
    </Chart>
  </div>
);


render(chart, document.getElementById('app'));
```


## Components
The chart is broken down into a couple of components plus a simple chart component.
All the children pass down the props from parent that means that you can plug in any react component anywhere in the chart and it will get all the props passed down
### Example of customizing
```js

const MyLabel = ({ cY, value, label, fill, stroke, startPathCoordinates }) => (
  <g transform={`translate(0, ${cY})`}>
    <text
      transform={`translate(${startPathCoordinates})`}
      fontSize="16px"
      fill={d3.color(fill).darker(0.5)}
    >
    {`${label} ${value}%`}
    </text>
  </g>
)

const chart = (
  <div
    style={{
      marginTop: '50px',
      width: '100%',
      height: '500px',
    }}
  >
    <Chart
      responsive
      margin={0.05}
      pathWidth={2}
      pathMargin={40}
      circle
      ease="bounce"
      background={{
        fill: '#ccc',
        stroke: '#999',
      }}
      endAngle={Math.PI * 1.5}
      values={values}
    >
      <PathGroup>
        <BackgroundPath
          fill={someFill}
          stroke={someStroke}
        />
        <MyLabel />
        <Path>
          <EndCircle
            stroke="rgb(100,100,100)"
            r={12}
          />
        </Path>
      </PathGroup>
    </Chart>
  </div>
);

render(chart, document.getElementById('app'));
```

### Chart
This component renders the svg and the parent div into the dom.
If the Chart is set to responsive then they will fill out into the parent div of the Chart component.
The Chart also accepts width and height.

#### Chart Props

|Name|Type|Default|Description|
---|---|---|---
responsive|boolean|*true*| Rerenders the chart on screen resize
width|boolean|*true*| sets the width of the component, if responsive is true then it will fill out into the parent container
height|boolean|*true*| sets the height of the component, the same applies here to the responsive prop.
endAngle|number|Math.PI*1.5|EndAngle value
values|Array of shape|*null*|This is the array that holds all the info, each shape has value, label, fill and stroke, that are applied to the legend and the path
pathWidth|number|*null*|The width of the paths in the chart, user has to make sure they do not overlap
pathMargin|number|*null*|The margin between the paths in the chart, user has to make sure they do not overlap
background|shape|*{ fill: '#ccc', stroke: '#999'}*|The fill and stroke of the background arc
fontSize|string|*null*|Sets the fontsize for lables
animates|bool|*true*|if true then animates
animateTime|number|*2000*|The length of the animation in ms


### PathGroup
This Component calculates the offset of the g elements and the arc for each g.container.
It create a new g container for each element in the values array.
All the children of PathGroup will recive the dimensions plus the data object that contains the value, label, fill and stroke of the element

### BackgroundPath
This is the background arc, it takes in fill and stroke as arguments.

### Path
This is the Path that goes that displays the value, it also has a special child a circle that is animated along the path if you set it

### Label
This is the text label


### TODO
1. Add tooltip
2. Add a shadow generator
3. Add a radial gradient

### Licence

The MIT License (MIT)

Copyright (c) 2016 Arnthor Agustsson
