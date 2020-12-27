/* The following is an example on how you might structure your code.
This is not the only way to complete this assignment.
Feel free to disregard and create your own code */

var select = d3.select("#selDataset");

// Define function that will run on page load
function init() {

    // Read json data
    d3.json("samples.json").then((response) => {
        var names = response.names;

        console.log(names);

        names.forEach(name => {

            select.append("option")
                .text(name)
                .property("value", name);
        });

        buildMetadata(names[0]);
    });
}

// Define a function that will create metadata for given sample
function buildMetadata(sample) {

    // Read the json data
    d3.json("samples.json").then((response) => {
        var metadata = response.metadata;
        var filteredData = metadata.filter(meta => meta.id == sample)[0];

        console.log(filteredData);

        var panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(filteredData).forEach(([key, value]) => {
            panel.append("p")
                .text(`${key}: ${value}`);
        });
    });
};
// Parse and filter the data to get the sample's metadata
// Specify the location of the metadata and update it

// Define a function that will create charts for given sample
function buildCharts(sample) {
    // d3.json("samples.json").then((response) => {
    //     var samples = response.samples;
    //     var sampleData = samples.filter(meta => sample.id == sample)[0];
    // Read the json data

    // Parse and filter the data to get the sample's OTU data

    // Pay attention to what data is required for each chart

    // Create bar chart in correct location
    // var data = [{
    //     type: 'bar',
    //     x: [20, 14, 23],
    //     y: ['giraffes', 'orangutans', 'monkeys'],
    //     orientation: 'h'
    //   }];
      
    //   Plotly.newPlot('myDiv', data);

    // Create bubble chart in correct location
    // var trace1 = {
    //     x: [1, 2, 3, 4],
    //     y: [10, 11, 12, 13],
    //     mode: 'markers',
    //     marker: {
    //       color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
    //       opacity: [1, 0.8, 0.6, 0.4],
    //       size: [40, 60, 80, 100]
    //     }
    //   };
      
    //   var data = [trace1];
      
    //   var layout = {
    //     title: 'Marker Size and Color',
    //     showlegend: false,
    //     height: 600,
    //     width: 600
    //   };
      
    //   Plotly.newPlot('myDiv', data, layout);


}

function optionChanged(newSample) {

    // Update metadata with newly selected sample
    buildCharts(newSample);

    // Update charts with newly selected sample
    buildMetadata(newSample);
}

// Initialize dashboard on page load
init();