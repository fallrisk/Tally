/**
 * Created by Justin on 2016-01-14.
 * References
 *   * http://nicolashery.com/integrating-d3js-visualizations-in-a-react-app/
 */

var D3PollChart = {
  create: function(ele, props, state) {
    var svg = d3.select(ele).append('svg')
      .attr('class', 'd3')
      .attr('width', props.width)
      .attr('height', props.height);

    svg.append('g')
      .attr('class', 'd3-points');

    this.update(ele, state);
  },
  update: function(ele, state) {
    var scales this._scales(ele, state.domain);
    this._drawBars(ele, scales, state.data);
  },
  destroy: function(ele) {
    // Clean-up should go here.
  },
  _drawBars: function(ele, scales, data) {
    var g = d3.select(ele).selectAll('.d3-points');
  }
}
