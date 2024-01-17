# 14_NavelBiodiversity_Challenge
---
View my web dahsboard here: https://tiascott01.github.io/14_NavelBiodiversity_Challenge/
---
## Overview

This repository contains a two correlating files ('NoSQL_Setup.ipynb' and 'NoSQL_analysis.ipynb') for analyzing and summarizing data imported from a json. The directions for the module were to import the JSON into the MongoDB command line and run a series of analyses on the corresponding data in the notebooks. A "Resources" folder contains the original .json file, while the .import.png shows the import into the MondoDB command line.

## Results

In the 12_NoSQL_Challenge, the setup notebook imports the json into a database called "uk_food" into a collection called "establishments." The notebook inserts one new restaurant documment into the existing database. Further setup of the document includes more setup of the database, including correctly formatting for the data types for the queries (i.e. changing "$type" that are strings to "&toDouble"s). In the analysis file, several questions have been asked which can be answered with queries of the data. Other questions have been asked which also have specific parameters to query against. In all cases the data has been converted into a pandas dataframe for easier viewing. 




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
