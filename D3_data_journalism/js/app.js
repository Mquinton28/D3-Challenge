// You need to create a scatter plot between two of the data variables such as Healthcare vs. Poverty or Smokers vs. Age.
// Using the D3 techniques we taught you in class, create a scatter plot that represents each state with circle elements. You'll code this graphic in the app.js file of your homework directory—make sure you pull in the data from data.csv by using the d3.csv function. Your scatter plot should ultimately appear like the image at the top of this section.


// Include state abbreviations in the circles.


// Create and situate your axes and labels to the left and bottom of the chart.


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

    })

  })


