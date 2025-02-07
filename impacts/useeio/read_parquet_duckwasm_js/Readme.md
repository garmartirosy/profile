# Reading Parquet Files with DuckDB-WASM and JavaScript  

These files provide examples of reading Parquet files using DuckDB-WASM and JavaScript.  

Initially, the plan was to use DuckDB with DBeaver, but DBeaver requires a server for hosting.
But parquet files can be processed from static files using Js. 

## Examples  

- **Indicators Table**: The first example demonstrates reading the **Indicators** table, which contains 16 entries.  
- **Sector & Production Complete Amount**: The second example combines data from two tables—**Sector** and **Production Complete Amount**—based on a selected state.  

### Refer Images and Html files
First example shows the Indicators (total 16) table 

Second example combining Sector and Production Complete Amount using a selected State

## To do
Use a Constant Js file to store all constant values (like State's code) and Parquet file's urls instead of hard-coding in the static files.
