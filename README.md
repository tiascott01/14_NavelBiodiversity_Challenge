# 14_NavelBiodiversity_Challenge

#### View my web dahsboard here: https://tiascott01.github.io/14_NavelBiodiversity_Challenge/

## Overview

This repository contains a several files and folders for launching and running a custom dashboard. The main files ('index.html' and 'styles.css', as well as app.js (inside the static/js folder)) are for the running, styling and data handling of the website and activating the functions of the dashboard. Additional files and folders are in the repository as well, ('images') which contain images used in the creation of the website, such as a custom dropdown arrow and a favicon to display in the tab of the website.

## Results

In the 14_NavelBiodiversity_Challenge, the setup is to read-in a sample.json file from a hosted source and create dropdowns, metatdata reading, and several different Plotly plots which updated once you chose a new subject from the dropdown created. Since no methodology was read-into the original source files I came up with a brief organization of my 'app.js' to help streamline my creation and where I was needing functions and code to execute the dashboard. The organization is as follows:

1. Read in the sample JSON Data.

2. Fetch JSON Data
   
3. Create the Metadata Panel

4. Create and Customize the Bar, Guage, and Bubble Plot with the Plotly Manual Handling Commands

5. Plot the Plotly Charts

6. Update the Plots with the Dropdown Change

7. Fetch Data and Initialize the Page

8. Trigger the Fetch and Initialization


Much time was spent customizing the entire site, from the custom dropdown fucntions and styling, to the custom colors and fonts used for the entire site and Plotly charts. Further setup of the dashboard includes more setup of the provided base 'index.html', which now includes custom CSS styling to enhance the dashboard look and feel. Most of all testing of the dashboard has concluded that the scaling and working of the site works on all main browsing platforms and functionality remains unchanged.




## Usage

You can use this file to setup the data in the corresponding notebook.

1. Click through to the above link.

2. Once the site is loaded you can look at individial data from the <i>"Select A Test Subject"</i> drop down. 
   
3. All data should update and repopulate with the selection change of a new "Test Subject."
    <p align="center">
    <img src="https://github.com/tiascott01/14_NavelBiodiversity_Challenge/blob/main/Resources/screenshot.png" width="750">
    </p>
   
<br>
<b>***As of 1/17/24 I was able to correctly plot the "Washing Frequency" guage however I have not finished the setup for final functionality.***</b>



## Resources and Citations

1. General - ChatGpt.com

2. Custom Gauge Creation - https://codepen.io/ascotto/pen/eGNaqe?editors=0010

3. Gauge Pointer Help - Davin Frankosky
