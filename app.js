// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// ****************************************************

// Initial Params
var chosenXAxis = "poverty";  

// ********* Make poverty the DEFAULT X-AXIS above  ************

// function used for updating x-scale var upon click on axis label
function xScale(data, chosenXAxis) {
    // create scales on the x-axis
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d[chosenXAxis]) * 0.8,  // setting the left x-axis val to smaller than smallest data point
        d3.max(data, d => d[chosenXAxis]) * 1.2 // setting the right x-axis val to larger than largest ''
      ])
      .range([0, width]);
  
    return xLinearScale;
  
  }