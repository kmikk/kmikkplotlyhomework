function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  // Data Route
  var url = `/metadata/${sample}`;
 
  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
 d3.json(url).then(function(response) {
    var data = response;
    var values = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    values.html("");
    console.log(values);

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(data).forEach(([key, value]) => {
      values
        .append('p').text(`${key}:${value}`)
        // .append('hr')
    });
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
  })
  }

//====================================//

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var url = `/samples/${sample}`;
  d3.json(url).then(function(response) {


    // @TODO: Build a Bubble Chart using the sample data
    var xValue = response.otu_ids;
    var yValue = response.sample_values;
    var markerSize = response.sample_values;
    var markerColor = response.otu_ids;
    var textValue = response.otu_labels;

    var bubbleTrace = [{
      x: xValue,
      y: yValue,
      text: textValue,
      mode: 'markers',
      marker: {
        size: markerSize,
        color: markerColor
      }
    }];

    Plotly.newPlot('bubble', bubbleTrace)

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    var label = response.otu_ids.slice(0,10);
    var value = response.sample_values.slice(0,10);
    var hover = response.otu_labels.slice(0,10);

    var pieTrace = [{
      values: value,
      labels: label,
      hovertext: hover,
      type: 'pie'
    }];

    Plotly.newPlot('pie', pieTrace)



})
};




function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();


// function buildCharts(sample) {

//   // @TODO: Use `d3.json` to fetch the sample data for the plots
//   var url = `/samples/${sample}`;
//   d3.json(url).then(function(data) {
//     var otu_ids = data.otu_ids;
//     var sample_values = data.sample_values;
//     var otu_labels = data.otu_labels;

//   // @TODO: Build a Bubble Chart using the sample data
//   fig = Plotly.Figure(data=[Plotly.Scatter(
//     x=otu_ids,
//     y=sample_values,
//     text=otu_labels,
//     mode='markers',
//     marker: {
//       size: sample_values,
//       color: otu_ids,
//       colorscale: 'Blues'
//     }
//   )])
//   })
// }