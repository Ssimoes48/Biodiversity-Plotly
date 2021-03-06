var select = d3.select("#selDataset");

function init() {

    d3.json("samples.json").then((response) => {
        var names = response.names;

        names.forEach(name => {

            select.append("option")
                .text(name)
                .property("value", name);
        });

        buildMetadata(names[0]);
        buildCharts(names[0]);
        buildGauge(names[0]);
    });
}

function buildMetadata(sample) {

    d3.json("samples.json").then((response) => {
        var metadata = response.metadata;
        var filteredData = metadata.filter(meta => meta.id == sample)[0];

        var panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(filteredData).forEach(([key, value]) => {
            panel.append("p")
                .text(`${key}: ${value}`);
        });
    });
}

function buildCharts(sample) {
    d3.json("samples.json").then((response) => {
        var samples = response.samples;
        var sampleData = samples.filter(button => button.id == sample)[0];

       // Create bar chart 
        var data = [{
            type: 'bar',
            x: sampleData.sample_values.slice(0, 10).reverse(),
            y: sampleData.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
            text: sampleData.otu_labels.slice(0, 10).reverse(),
            orientation: 'h'
        }];

        Plotly.newPlot('bar', data);

        // Create bubble chart 
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

        var layout2 = {
            font: { color: "black", family: "Arial" },
            title: 'Bacteria Found in Belly Button: Bubble Chart',
            showlegend: false,
        };

        Plotly.newPlot('bubble', data2, layout2);

        // Create bonus pie chart 
        var trace4 = {
            type: "pie",
            values: sampleData.sample_values,
            labels: sampleData.otu_labels,
            textinfo: sampleData.sample_values + sampleData.otu_labels,
            textposition: "outside",
            automargin: true,
        }
        var data4 = [trace4];

        var layout4 = {
            title: 'Bacteria Found in Belly Button: Pie Chart',
            showlegend: false
        }

        Plotly.newPlot('pie', data4, layout4);
    });
}

// Create bonus wash gauge 
function buildGauge(sample) {

    d3.json("samples.json").then((response) => {
        var metadata = response.metadata;
        var washData = metadata.filter(wash => wash.id == sample)[0];

        console.log(washData.wfreq);

        var trace3 = {
            type: "indicator",
            mode: "gauge+number+delta",
            value: washData.wfreq,
            title: { text: "Belly Button Wash Frequency: Number of Washes", font: { size: 18 } },
            gauge: {
                axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
                bar: { color: "white" },
                bgcolor: "white",
                borderwidth: 2,
                bordercolor: "gray",
                steps: [
                    { range: [0, 1], color: "#0df2ff" },
                    { range: [1, 2], color: "#26d9ff" },
                    { range: [2, 3], color: "#4cb2ff" },
                    { range: [3, 4], color: "#738cff" },
                    { range: [4, 5], color: "#9966ff" },
                    { range: [5, 6], color: "#b24dff" },
                    { range: [6, 7], color: "#cc33ff" },
                    { range: [7, 8], color: "#e619ff" },
                    { range: [8, 9], color: "#ff00ff" },
                ],
            }
        };
        var data3 = [trace3];

        var layout3 = {
            width: 500,
            height: 400,
            margin: { t: 25, r: 25, l: 25, b: 25 },
            paper_bgcolor: "white",
            font: { color: "black", family: "Arial" }
        };

        Plotly.newPlot('gauge', data3, layout3);
    });
};

function optionChanged(newSample) {

    buildCharts(newSample);

    buildMetadata(newSample);

    buildGauge(newSample);
}

init();

// bonus extra chart code - data not in usable format:
// function genderWash(sample) {
//     d3.json("samples.json").then((response) => {
//         var metadata = response.metadata;

//         var filteredFemale = metadata.filter(meta => meta.gender == "F");
//         var filteredMale = metadata.filter(meta => meta.gender == "M");
        
//         var trace5 = {
//             x: filteredFemale.map(female => female.age),
//             y: filteredFemale.map(female => female.wfreq),
//             mode: 'markers',
//             type: 'scatter',
//         };

//         var trace6 = {
//             x: filteredMale.map(male => male.age),
//             y: filteredMale.map(male => male.wfreq),
//             mode: 'markers',
//             type: 'scatter',
//         };

//         var data5 = [trace5, trace6];

//         Plotly.newPlot('genderScatter', data5);

//     });
// }