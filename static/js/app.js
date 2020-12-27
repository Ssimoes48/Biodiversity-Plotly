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
                .text(`${key}:${value}`);
        });
    });
};
// Parse and filter the data to get the sample's metadata



// Specify the location of the metadata and update it

// Define a function that will create charts for given sample
function buildCharts(sample) {

            // Read the json data

            // Parse and filter the data to get the sample's OTU data
            // Pay attention to what data is required for each chart

            // Create bar chart in correct location

            // Create bubble chart in correct location

        }

function optionChanged(newSample) {

            // Update metadata with newly selected sample

            // Update charts with newly selected sample

        }

// Initialize dashboard on page load
init();