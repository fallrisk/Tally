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
    var chart = d3.select(ele).selectAll('svg');

    //console.log('Chart Data: ', data);
    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .direction('e')
      .html(function(d, i) {
        return '<span>' + d + '</span>';
      });

    chart.call(tip);

    var bar = chart.selectAll('g').data(data);


    bar.enter().append('g')
      .attr('transform', function(d, i) {
        return 'translate(0,' + i * barHeight + ')';
      });


    bar.append('rect')
      .attr('width', xScale)
      .attr('height', barHeight - 1)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

    if (showText) {
      bar.append("text")
        .attr("x", function (d) {
          return 3;
        })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function (d, i) {
          return columnNames[i];
        });
    }

    bar.exit().remove();
  }
};
