
## React-solidgauge
[![Build Status](https://travis-ci.org/arnthor3/react-solidgauge.svg?branch=master)](https://travis-ci.org/arnthor3/react-solidgauge)
[![Coverage Status](https://coveralls.io/repos/github/arnthor3/react-solidgauge/badge.svg?branch=master)](https://coveralls.io/github/arnthor3/react-solidgauge?branch=master)

This is a really nice looking react d3 graph that is sort of inspired by amcharts solid-gauge.
This chart is supposed to handle situations where you need to compare level of completions or performance between similar entities.

### Install from NPM
```sh
npm install react-solidgauge
```

### Usage

```js

```

## SolidGauge
You can use the <SolidGauge /> component if you dont need alot of customization.
The Chart needs values to be set like the example belowe.
```js
const values = [{
  value: 34,
  label: 'Facebook campaign',
  fill: '#118',
  stroke: '#050570',
}, .....]
```
An array of shapes like the one described above.
### Props for SolidGauge

|Name|Type|Default|Description|
---|---|---|---
responsive|boolean|*true*| Rerenders the chart on screen resize
width|number|| sets the width of the component, if responsive is true then it will fill out into the parent container
height|number|| sets the height of the component, the same applies here to the responsive prop.
endAngle|number|Math.PI*1.5|EndAngle value
values|Array of shape||This is the array that holds all the info, each shape has value, label, fill and stroke, that are applied to the legend and the path
pathWidth|number|*0.1*|The path width, 0.1 by default means 10% of the chart radius
pathMargin|number|*0.1*|The margin between the paths, 0.1 by default means 10% of the chart radius
background|shape|*{fill:'#ccc',stroke:'#999'}*|The fill and stroke of the background arc
fontSize|string|*null*|Sets the fontsize for lables
animate|bool|*true*|if true then animate the paths
animateTime|number|*2000*|The length of the animation in ms
ease|string|*easeBackIn*| The name of the easing function that's being used check out d3-easing project for a complete list of easing functions
### Usage for <SolidGauge />
```js
import React, { Component } from 'react';
import { render } from 'react-dom';
import SolidGauge from 'react-solidgauge';

class Chart extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      state: this.state.values.map(d => {
        d.values = Math.random() * 100;
        return d;
      });
    });
  }

  render() {
    return (
      <div style={{
        width: '100%',
        height: '500px',
      }}>
        <SolidGauge
          responsive
          background={{
            fill: '#ddd',
            stroke: '#aaa',
          }}
          pathWidth={0.1}
          pathMargin={0.1}
          values={this.state.values}
          animate
          animateTime={2000}
          fontSize={18}
          />
        </div>
    );
  }
}

render (<Chart />, document.getElementById('app'));
```
## Components
You can use the chart a couple of different ways, you can use the components if you need to do alot of customizing or you can just use the simple component.

### Chart
This component renders the svg and the parent div into the dom.
If the Chart is set to responsive then they will fill out into the parent div of the Chart component.
The Chart also accepts width and height.

The Chart also passes down the width and heigth to the props.children.

#### Chart Props

|Name|Type|Default|Description|
---|---|---|---
responsive|boolean|*true*| Rerenders the chart on screen resize
width|number|| sets the width of the component, if responsive is true then it will fill out into the parent container
height|number|| sets the height of the component, the same applies here to the responsive prop.
endAngle|number|Math.PI*1.5|EndAngle value
values|Array of shape|*null*|This is the array that holds all the info, each shape has value, label, fill and stroke, that are applied to the legend and the path
pathWidth|number|*0.1*|The path width, 0.1 by default means 10% of the chart radius
pathMargin|number|*0.1*|The margin between the paths, 0.1 by default means 10% of the chart radius
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
