## React-solidgauge
This is a really nice looking react d3 graph that is sort of inspired by amcharts.

### Install from NPM
```sh
npm install react-solidgauge
```

### Usage

```js
import React from 'react';
import { render } from 'react-dom';
import Chart from 'react-solidgauge';

const values = [
  { label: 'Email Campaign', value: 89, fill: '#881' },
  { label: 'Google AdWords', value: 65, fill: '#188' },
  { label: 'Youtube Campaign', value: 49, fill: '#818' },
];

const chart = (
  <div
    style={{
      width: '100%',
      height: '500px',
    }}
  >
    <Chart
      responsive
      values={values}
      pathWidth={50}
      pathMargin={15}
      fontSize={'20px'}
      ease=""
      background={{
        fill: '#ccc',
        stroke: '#999',
      }}
      startAngle={0}
      endAngle={Math.PI * 1.5}
    />
  </div>
);
render(chart, document.getElementById('app'));
```


### Props
I will add more soon, like tooltip and some gradients and shadows, I will probably break this down into components when I do that.
Name|Type|Default|Description|
---|---|---|---
responsive|boolean|true| Rerenders the chart on screen resize
startAngle|number|0|The starting angle of the function
endAngle|number|Math.PI*1.5|EndAngle value
values|Array of Shapes|*null*|This is the array that holds all the info, each shape has value, label, fill and stroke, that are applied to the legend and the path
pathWidth|number|*null*|The width of the paths in the chart, user has to make sure they do not overlap
pathMargin|number|*null*|The margin between the paths in the chart, user has to make sure they do not overlap
background|shape|*{ fill: '#ccc', stroke: '#999'}*|The fill and stroke of the background arc
fontSize|string|*null*|Sets the fontsize for lables


### TODO
1. Add tooltip
2. Add a shadow generator
3. Add a radial gradient
4. Break the chart down into components

Copyright (C) 2016  Arnthor Agustsson

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.



