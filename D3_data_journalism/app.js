// Note: You'll need to use python -m http.server to run the visualization. This will host the page at localhost:8000 in your web browser. 
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

// Creating an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
  var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Import Data
  d3.csv('D3_data_journalism/data/data.csv')
  .then(function(heathcareData, err) {
      if(err) throw err;
      console.log()

    heathcareData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.povertyMoe = +data.povertyMoe;
        data.age = +data.age;
        data.ageMoe = +data.ageMoe;
        data.income = +data.income;
        data.incomeMoe = +data.incomeMoe;
        data.noHealthInsurance = +data.noHealthInsurance;
        data.obesity = +data.obesity;
        data.smokes = +data.smokes;
    });

    // xLinearScale function above csv import
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(healthcareData, d => d.poverty)-1, d3.max(healthcareData, d => d.poverty)])
    .range([0, width]);

  // Create y scale function
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(healthcareData, d => d.noHealthInsurance)-1, d3.max(heathcareData, d => d.noHealthInsurance)])
    .range([height, 0]);

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
chartGroup.append("g")
    // .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis
  chartGroup.append("g")
    .call(leftAxis);

// Create circles for the chart groups
var circlesGroup = chartGroup.selectAll("circle")
    .data(heathcareData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.noHealthInsurance))
    .attr("r", 20)
    .attr("fill", "green")
    .attr("opacity", ".5");

var labelGroup = chartGroup.selectAll('label')
    .data(healthcareData)
    .enter()
    .append("text")
    .text(d => d.abbr)
    .attr('font-size',10)
    .attr('font-weight', 'bold')
    .attr("x", d => xLinearScale(d.poverty)-7)
    .attr("y", d => yLinearScale(d.noHealthInsurance)+4)
    .attr("fill", "white");

function updateToolTip(chosenXAxis, circlesGroup) {
  var label;

  var toolTip = d3.tip()
  .attr('class', 'tooltip')
  .offset([80, -60])
  .html(function(d) {
    return (`${d.abbr}<br>${d.poverty}<br>${d.noHealthInsurance}`);
  });

circlesGroup.call(toolTip);

labelGroup.on('mouseover', function(data) {
  toolTip.show(data, this);
})

  .on('mouseout', function(data, index) {
    toolTip.hide(data, this);
  });
  
  chartGroup.append('text')
  .attr('transform', 'rotate(-90)')
  .attr('y', 0 - margin.left + 40)
  .attr('x', 0 - (height / 2))
  .attr('dy', '1em')
  .attr('class', 'axisText')
  .text('Does not have Healthcare (%)');

  chartGroup.append('text')
  .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
  .attr('class', 'axisText')
  .text('% of population in poverty');
});
