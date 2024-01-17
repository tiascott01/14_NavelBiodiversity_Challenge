// URL of JSON Data
const dataUrl = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch JSON data - async functionality with try...catch for eliminating chaining to .then(), allowing other functions to run while returning a call or error to the console.
async function fetchData(url) {
  try {
    const response = await d3.json(url);
    console.log("Fetched Data:", response);

    // Call the functions that rely on the fetched data
    populateDropdown(response.names);
    createChart(response.samples[0]);
    createMetadata(response.metadata[0]);
    setupDropdownChangeHandler(response.samples, response.metadata);

    return response;
  } catch (error) {
    console.error("Error Fetching Data:", error);
    throw error;
  }
}

// Populate Dropdown with JSON data - Built to allow greatest flexibility for future dynamic data
function populateDropdown(names) {
  const dataSelect = d3.select("#selDataset");

  // Use the data method to bind data to options
  const options = dataSelect.selectAll("option")
    .data(names)
    .enter()
    .append("option")
    .text(data => data)
    .attr("value", data => data);
}

// Create metadata panel
function createMetadata(sample) {
  // Function to capitalize the entire first word before ":"
  function capitalizeFirstWordBeforeColon(str) {
    const parts = str.split(':');
    if (parts.length > 1) {
      const firstWord = parts[0].trim().toUpperCase();
      return `${firstWord}: ${parts.slice(1).join(':').trim()}`;
    }
    return str.toUpperCase();
  }

  const panel = d3.select("#sample-metadata");

  // Clear existing metadata
  panel.selectAll("*").remove();

  // Bind data and create/update elements
  const metadataEntries = panel
    .selectAll("h6")
    .data(Object.entries(sample));

  // Enter phase: create new elements
  metadataEntries.enter()
    .append("h6")
    .html(([names, metadata]) => `<strong>${capitalizeFirstWordBeforeColon(names)}</strong>: ${metadata}`)
    .exit().remove(); // Exit phase: remove elements not bound to data
}

//PLOTLY BAR CHART
// Create Plotly Bar Chart
function createChart(sample) {
  const { otu_ids, sample_values, otu_labels} = sample;
  const wfreq = sample.metadata && sample.metadata[0] ? sample.metadata[0].wfreq : 0;

  // Prepare Data
  const sampleData = otu_ids.map((otu_id, index) => ({
    otu_id,
    sample_value: sample_values[index],
    otu_label: otu_labels[index]
  }));

  // Sort and Filter Top 10 Samples
  const topOTU = sampleData.sort((a, b) => b.sample_value - a.sample_value).slice(0, 10).reverse();

  // Prepare data for Plotly Bar Chart
  const barTrace = {
    x: topOTU.map(({ sample_value }) => sample_value),
    y: topOTU.map(({ otu_id }) => `OTU ${otu_id}`),
    text: topOTU.map(({ otu_label }) => otu_label),
    type: "bar",
    orientation: 'h',
    marker: {
      color: topOTU.map(({ sample_value }) => sample_value),
      colorscale: [[0, 'rgb(217,230,243)'], [0.25, 'rgb(174,202,228)'], [0.45, 'rgb(99,152,201)'], [0.65, 'rgb(69,133,190)'], [0.85, 'rgb(51,122,183)'], [1, 'rgb(11,89,155)']],
      opacity: 0.65,
      line: {
        color: 'rgb(8,48,107)',
        width: 0.15
      }
    }
  };

  // Layout for Plotly Bar Chart
  const barLayout = {
    //title: "Top 10 OTUs",
    xaxis: {
      title: {
        text: "Value of OTU's",
        font: {
          size: 13,
          color: 'rgb(145, 145, 145)' // Adjust the title font color as needed
        }
      },
      tickfont: { size: 10, color: 'rgb(145, 145, 145)' }, // Adjust tick font size and color as needed
      automargin: true, // Allow automatic margin adjustment
      titlefont: {
        size: 14, // Adjust the axis title font size as needed
        color: 'rgb(145, 145, 145)' // Adjust the axis title font color as needed
      }
    },
    yaxis: {
      pad: 50, // Adjust the y-axis padding as needed
      ticklen: 10, // Adjust the tick length to increase space
      tickfont: { size: 10, color: 'rgb(145, 145, 145)' } // Adjust font size and color for y-axis labels as needed
    },
    font: {
      family: 'Calibri, sans-serif', // Set the overall font family
      size: 12, // Set the overall font size
      color: 'rgb(25, 25, 25)' // Set the overall font color
    },
    margin: { l: 95, r: 95, b: 75, t: 75 }, // Adjust the margin as needed
    autosize: false, // Disable autosize
    width: 515, // Adjust the width as needed
    height: 450 // Adjust the height as needed
  };

//PLOTLY GAUGE CHART
// Prepare data for Plotly Gauge Chart
const gaugeLayout = {
  shapes: [
    {
      type: 'path',
      path: gaugePointer((wfreq / 10) * 100),
      fillcolor: 'rgb(145, 145, 145)',
      line: {
        color: '850000',
      },
    },
  ],
  autosize: true,
  xaxis: { zeroline: false, showticklabels: false, showgrid: false, range: [-1, 1] },
  yaxis: { zeroline: false, showticklabels: false, showgrid: false, range: [-1, 1] },
  width: 495,
  height: 450,
  margin: { t: 100, b: 0, l: 30, r: 75 },
  font: {
    family: 'Calibri, sans-serif',
    color: 'rgb(145, 145, 145)',
  },
};

// Log the wfreq value before attempting calculations - START OF THE WFREQ ISSUES - THIS RETURNS A VALUE
console.log('wfreq:', wfreq);

// Function to create the gauge pointer path / SECOND START OF THE WFREQ ISSUES - DOES NOT RETURN VALUES
function gaugePointer(wfreq) {
  // Log the raw wfreq value before any calculations - RETURNS A NAN
  console.log('raw wfreq:', wfreq);

  // Check if wfreq is defined
  if (typeof wfreq === 'undefined' || wfreq === null) {
    console.error('Invalid wfreq value:', wfreq); //RETURNS A NAN
    return '';
  }

  // Check if wfreq is a valid number
  if (isNaN(wfreq)) {
    console.error('Invalid wfreq value:', wfreq);
    return '';
  }

  // Convert wfreq to angle
  const angle = (180 - wfreq * 20) * Math.PI / 180;

  // Check if angle is a valid number
  if (isNaN(angle)) {
    console.error('Invalid angle value:', angle);
    return '';
  }

  // Coordinates for the arc
  const x = 0.5 * Math.cos(angle);
  const y = 0.5 * Math.sin(angle);

  // Check if x and y are valid numbers
  if (isNaN(x) || isNaN(y)) {
    console.error('Invalid x or y values:', x, y);
    return '';
  }

  // Path for the arc
  const path = `M 0 -0.035 L ${x} ${y} A 0.5 0.5 0 0 1 ${-x} ${y} Z`;

  return path;
}

// Gauge Colors
const gaugeColors = [
  'rgba(96, 147, 190, .99)', 'rgba(96, 147, 190, .85)',
  'rgba(131, 174, 211, .95)', 'rgba(131, 174, 211, .75)',
  'rgba(139, 179, 215, .65)', 'rgba(188, 211, 232, .75)',
  'rgba(202, 220, 237, .75)', 'rgba(224, 235, 245, .75)',
  'rgba(230, 239, 247, .5)', 'white',
];

// Data and Layout for Plotly Gauge Chart
const gaugeData = [
  {
    type: 'scatter',
    x: [0], y: [0],
    marker: { size: 18, color: '850000' },
    showlegend: false,
    name: '# of Washings',
    text: wfreq,
    hoverinfo: 'text+name',
    font: {
      family: 'Calibri, sans-serif',
      color: 'rgb(145, 145, 145)',
    },
  },
  {
    values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
    rotation: 90,
    text: ['<span style="color:rgb(255, 255, 255)">8 - 9</span>', 
      '<span style="color:rgb(255, 255, 255)">7 - 8</span>', 
      '<span style="color:rgb(255, 255, 255)">6 - 7</span>', 
      '<span style="color:rgb(235, 235, 235)">5 - 6</span>', 
      '<span style="color:rgb(235, 235, 235)">4 - 5</span>', 
      '<span style="color:rgb(180, 180, 180)">3 - 4</span>', 
      '<span style="color:rgb(145, 145, 145)">2 - 3</span>', 
      '<span style="color:rgb(145, 145, 145)">1 - 2</span>', 
      '<span style="color:rgb(145, 145, 145)">0 - 1</span>', 
      '<span style="color:rgb(145, 145, 145)">Washing Frequency Value</span>'],
    textinfo: 'text',
    textposition: 'inside',
    marker: { 
      colors: gaugeColors,
      line: { color: 'white', width: .25 }
    },
    labels: ['8-9 Washings', '7-8 Washings', '6-7 Washings', '5-6 Washings', '4-5 Washings', '3-4 Washings', '2-3 Washings', '1-2 Washings', '0-1 Washings', 'Washing Frequency Value'],
    hoverinfo: 'label',
    hole: 0.5,
    type: 'pie',
    showlegend: false,
    layout: {
      autosize: true, 
      width: 495, 
      height: 450, // Adjust the height as needed
      margin: { t: 100, b: 0, l: 30, r: 75 },
    },
  },
];

//PLOTLY BUBBLE CHART
// Prepare data for Plotly bubble chart
const bubbleTrace = {
  x: sampleData.map(data => data.otu_id),
  y: sampleData.map(data => data.sample_value),
  text: sampleData.map(data => data.otu_label),
  mode: "markers",
  marker: {
    size: sampleData.map(data => data.sample_value),
    color: sampleData.map(data => data.otu_id),
    colorscale: [
      [0, 'rgb(217,230,243)'],
      [0.25, 'rgb(174,202,228)'],
      [0.45, 'rgb(99,152,201)'],
      [0.65, 'rgb(69,133,190)'],
      [0.85, 'rgb(51,122,183)'],
      [1, 'rgb(11,89,155)']
    ]
  }
};

// Layout for Plotly bubble chart
const bubbleLayout = {
  xaxis: {
    title: {
      text: "OTU ID",
      font: {
        size: 11,
        color: 'rgb(145, 145, 145)'
      }
    },
    tickfont: {
      size: 10,
      color: 'rgb(145, 145, 145)'
    }
  },
  yaxis: {
    title: {
      text: "Value of OTU's",
      font: {
        size: 11,
        color: 'rgb(145, 145, 145)'
      }
    },
    tickfont: {
      size: 10,
      color: 'rgb(145, 145, 145)'
    }
  },
  autosize: true,
  width: 1200,
  height: 450,
  margin: { t: 75, b: 75, l: 75, r: 125 }
};

  //CREATION OF ALL THE PLOTLY CHARTS
  // Create Plotly charts
  Plotly.newPlot("bar", [barTrace], barLayout);
  Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  Plotly.newPlot("bubble", [bubbleTrace], bubbleLayout);


  // Add text overlay dynamically
  var plotContainer = document.getElementById('bar');
  var textOverlay = document.createElement('div');
  textOverlay.className = 'plot-text';
  plotContainer.appendChild(textOverlay);
}

// Update Plot on Dropdown Change
function setupDropdownChangeHandler(samples, metadata) {
  d3.select("#selDataset").on("change", function () {
    const selectedID = this.value;
    const selectedSample = samples.find(sample => sample.id === selectedID);
    const selectedMetadata = metadata.find(sample => sample.id === parseInt(selectedID));
    createChart(selectedSample);
    createMetadata(selectedMetadata);
  });
}

// Fetch data and initialize the page
async function initializePage() {
  try {
    const data = await fetchData(dataUrl);

    // Log wfreq value to console
    console.log('wfreq value:', data.metadata[0].wfreq);

    populateDropdown(data.names);
    createChart(data.samples[0]);
    createMetadata(data.metadata[0]);
    setupDropdownChangeHandler(data.samples, data.metadata);
  } catch (error) {
    console.error('Error initializing page:', error);
  }
}

// Trigger the data fetching and initialization
initializePage();
