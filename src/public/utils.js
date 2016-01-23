/**
 * Created by Justin on 2016-01-14.
 * References
 *   * http://nicolashery.com/integrating-d3js-visualizations-in-a-react-app/
 *   * http://bost.ocks.org/mike/bar/2/
 *   * https://facebook.github.io/react/docs/top-level-api.html#reactdom.finddomnode
 */

var D3PollChart = {
  // @param ele is the element that will contain the SVG.
  create: function(ele, props, state) {
    //console.log(props, state);
    //console.log('Chart height:', props.height, state.data.length)
    var svg = d3.select(ele).append('svg')
      .attr('class', '.pollBarGraph')
      .attr('width', props.width)
      .attr('height', (props.height * state.data.length) + 'px');
      //console.log('computed height: ' + (props.height * state.data.length));
    this.update(ele, state, props.height);
  },

  update: function(ele, state, barHeight) {
    var xScale = d3.scale.linear()
      .domain([0, d3.max(state.data)]) // Domain is the data space.
      .range([0, $(ele).width() - 40]); // Range is the display/draw space.

    this._drawBars(ele, xScale, state.data, state.columnNames, state.showText, barHeight);
  },

  destroy: function(ele) {
    // Clean-up should go here.
  },

  _drawBars: function(ele, xScale, data, columnNames, showText, barHeight) {
    var svg = d3.select(ele).selectAll('svg');

    //console.log('Chart Data: ', data);
    //var tip = d3.tip()
    //  .attr('class', 'd3-tip')
    //  .direction('e')
    //  .html(function(d, i) {
    //    return '<span>' + d + '</span>';
    //  });

    //chart.call(tip);

    var g = svg.selectAll('g').data(data);
    g.select('rect')
      .attr('width', xScale);
    g.select('text')
      .text(function (d, i) {
        return data[i];
      })
      .attr('transform', function(d, i) {
        return 'translate(0,' + i * barHeight + ')';
      });

    var ng = g.enter().append('g');
    ng.append('rect')
      .attr('width', xScale)
      .attr('height', barHeight - 1)
      .attr('transform', function(d, i) {
        return 'translate(0,' + i * barHeight + ')';
      });

    if (showText) {
      ng.append("text")
        .attr("x", function (d) {
          return 3;
        })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function (d, i) {
          return columnNames[i];
        })
        .attr('transform', function(d, i) {
          return 'translate(0,' + i * barHeight + ')';
        });;
    }
  }
};


var D3LargeChart = {

  // In the create method we make the svg.
  create: function (ele, state, props) {
    var svg = d3.select(ele).append('svg'); // Create an svg in the parent element.
    svg.attr('class', props.class)
      .attr('width', props.width)
      .attr('height', (props.barHeight * state.data.length)
        + (props.paddingBetweenBars * (state.data.length - 1)) + 'px');
    this.update(ele, state, props);
  },

  update: function (ele, state, props) {
    var xScale = d3.scale.linear()
      .domain([0, d3.max(state.data)]) // Domain is the data space.
      .range([0, $(ele).width() - 40]); // Range is the display/draw space.
    this._draw(ele, state, props, xScale);
  },

  destroy: function (ele) {
    d3.select(ele).selectAll('svg').remove();
  },

  _draw: function (ele, state, props, xScale) {
    var svg = d3.select(ele).selectAll('svg');

    // This shit is annoying.
    // http://d3js.org/#enter-exit
    // http://bost.ocks.org/mike/join/
    // http://knowledgestockpile.blogspot.com/2012/01/understanding-selectall-data-enter.html

    // Update...
    var g = svg.selectAll('g').data(state.data);
    g.select('rect')
      .attr('width', xScale);
    g.select('text')
      .text(function (d, i) {
        return state.data[i];
      });

    // Enter...
    var newg = g.enter().append('g');
    newg.append('rect')
      .attr('width', xScale)
      .attr('height', props.barHeight)
      // Transform moves each bar down based on its index.
      .attr('transform', function (d, i) {
        return 'translate(0,' + ((i * props.barHeight) + (i * props.paddingBetweenBars)) + ')';
      })
    newg.append('text')
      .attr('x', function (d) {
        return 3;
      })
      .attr('y', props.barHeight / 2)
      .attr('dy', '.35em')
      .text(function (d, i) {
        return state.data[i];
      })
      .attr('transform', function (d, i) {
        return 'translate(0,' + ((i * props.barHeight) + (i * props.paddingBetweenBars)) + ')';
      });
  }
};
