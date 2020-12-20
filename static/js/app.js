/* The following is an example on how you might structure your code.
This is not the only way to complete this assignment.
Feel free to disregard and create your own code */

// Define a function that will create metadata for given sample
function buildMetadata(sample) {

    // Read the json data
    d3.json("sample.json").then(sample),
    console.log(sample);
   
    // Parse and filter the data to get the sample's metadata
    // var dataParse = JSON.parse();
    //     console.log(dataParse);

    // Specify the location of the metadata and update it

}
console.log("hello world");

// Define a function that will create charts for given sample
function buildCharts(sample) {

    // Read the json data

    // Parse and filter the data to get the sample's OTU data
    // Pay attention to what data is required for each chart

    // Create bar chart in correct location

    // Create bubble chart in correct location

}

// Define function that will run on page load
function init() {

    // Read json data

    // Parse and filter data to get sample names

    // Add dropdown option for each sample

    // Use first sample to build metadata and initial plots

}

function optionChanged(newSample) {

    // Update metadata with newly selected sample

    // Update charts with newly selected sample

}

// Initialize dashboard on page load
init();

