// SEt up chart
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

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Import and format data 

d3.csv("assets/data/data.csv").then(function(stateData) {
  // console.log(stateData);

  stateData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    // console.log(data);
  });

// create scales
  const xScale = d3.scaleLinear()
    .domain(d3.extent(stateData, d => d.poverty))
    .range([0, width])
    .nice(); 

  const yScale = d3.scaleLinear()
    .domain([6,d3.max(stateData, d => d.healthcare)])
    .range([height, 0])
    .nice();

// create axes
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  // append axes to the chartGroup
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

  chartGroup.append("g")
    .call(yAxis); 

//generate the scatter plot
chartGroup.selectAll("circle")
.data(stateData)
.enter()
.append("circle")
.attr("cx", d=>xScale(d.poverty))
.attr("cy", d=>yScale(d.healthcare))
.attr("r", "10")
.attr("stroke-width", "1")
.classed("stateCircle", true)
.attr("opacity", 0.75);

// add text to the datapoints
chartGroup.append("g")
  .selectAll('text')
  .data(stateData)
  .enter()
  .append("text")
  .text(d=>d.abbr)
  .attr("x",d=>xScale(d.poverty))
  .attr("y",d=>yScale(d.healthcare))
  .classed(".stateText", true)
  .attr("font-family", "sans-serif")
  .attr("text-anchor", "middle")
  .attr("fill", "white")
  .attr("font-size", "10px")
  .style("font-weight", "bold")
  .attr("alignment-baseline", "central");

// add axes titles
chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .style("fill", "black")
    .style("font", "20px sans-serif")
    .style("font-weight", "bold")
    .text("Lacks Healthcare (%)");

chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 13})`)
    .attr("class", "axisText")
    .style("font", "20px sans-serif")
    .style("font-weight", "bold")
    .text("Poverty (%)");

  }).catch(function(error) {
  console.log(error);
});