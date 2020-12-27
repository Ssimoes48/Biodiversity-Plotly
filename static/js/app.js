/* The following is an example on how you might structure your code.
This is not the only way to complete this assignment.
Feel free to disregard and create your own code */

var select = d3.select("#selDataset");

// Define function that will run on page load
function init() {

    // Read json data
    d3.json("samples.json").then((response) => {
        var names = response.names;

        console.log(response);

        names.forEach(name => {

            select.append("option")
                .text(name)
                .property("value", name);
        });

        buildMetadata(names[0]);
        buildCharts(names[0]);
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
}
// Parse and filter the data to get the sample's metadata
// Specify the location of the metadata and update it

// Define a function that will create charts for given sample
function buildCharts(sample) {
    d3.json("samples.json").then((response) => {
        var samples = response.samples;
        var sampleData = samples.filter(button => button.id == sample)[0];
        // Read the json data
        console.log(sampleData);

        // Parse and filter the data to get the sample's OTU data

        // Pay attention to what data is required for each chart

        // Create bar chart in correct location
        var data = [{
            type: 'bar',
            x: sampleData.sample_values.slice(0, 10).reverse(),
            y: sampleData.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
            text: sampleData.otu_labels.slice(0, 10).reverse(),
            orientation: 'h'
        }];

          Plotly.newPlot('bar', data);

        // Create bubble chart in correct location
        var trace1 = {
            x: sampleData.otu_ids,
            y: sampleData.sample_values,
            mode: 'markers',
            text: sampleData.otu_labels,
            marker: {
              color: sampleData.otu_ids,
              size: sampleData.sample_values,
              colorscale: 'Picnic'
            }
          };

          var data2 = [trace1];

          var layout = {
            title: 'Belly Button',
            showlegend: false,
          };

          Plotly.newPlot('bubble', data2, layout);

    });
}

function optionChanged(newSample) {

    // Update metadata with newly selected sample
    buildCharts(newSample);

    // Update charts with newly selected sample
    buildMetadata(newSample);
}

// Initialize dashboard on page load
init();