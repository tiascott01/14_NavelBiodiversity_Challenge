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


Much time was spent customizing the entire site, from the custom dropdown fucntions and styling, to the custom colors and fonts used for the entire site and Plotly charts. Further setup of the dashboard includes more setup base 'index.html', which now includes custom CSS styling to enhance the dashboard look and feel. Most of all testing of the dashboard has concluded that the scaling and working of the site works on all main browsing platforms and functionality remains unchanged.




## Usage

You can use this file to setup the data in the corresponding notebook.

1. Open a new command line or gitbash terminal from the resources folder or navigate to the folder through the terminal.

2. Once you are in the resource folder you can execute the "mongoimport" command to bring the .json into the mongodb database.
   
3. For this activity the import code is: **'mongoimport --type json -d uk_food -c establishments --drop --jsonArray establishments.json'**
    <p align="center">
    <img src="https://github.com/tiascott01/12_NoSQL_Challenge/blob/main/import.png" width="750", hspace="15">
    </p>
   

5. Cells requiring the dependencies such as pymongo and pprint must be imported prior to use.
   
6. Run individual cells within the ('NoSQL_Setup.ipynb') to see the calculations, insertions, breakdowns, and type changes.

</br>

You can use this file to analyze the data in the corresponding notebook.

1. Open the respective file (`NoSQL_analysis.ipynb') in Jupyter Notebook or VSCode. A second import of the database is not required. 
   
2. Cells requiring the dependencies such as pymongo, pprint, and pandas must be imported prior to use.

2. Run individual cells within the (`NoSQL_analysis.ipynb') to see the calculations, dataframes, and analyses associated with this file.



## Resources and Citations

1. General - ChatGpt.com

2. Analysis part 3 - Davin Frankosky
