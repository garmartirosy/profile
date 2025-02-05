# Reading Parquet Files with DuckDB-WASM and JavaScript  

These files provide examples of reading Parquet files using DuckDB-WASM and JavaScript.  

Initially, the plan was to use DuckDB with DBeaver, but DBeaver requires a server for hosting.
But parquet files can be processed from static files using Js. 

## Examples  

- **Indicators Table**: The first example demonstrates reading the **Indicators** table, which contains 16 entries.  
- **Sector & Production Complete Amount**: The second example combines data from two tables—**Sector** and **Production Complete Amount**—based on a selected state.  

### Images  

First example shows the Indicators (total 16) table:  
![Indicator](impacts/useeio/read_parquet_duckwasm_js/indicator.jpg)  

Second example combining Sector and Production Complete Amount using a selected State:  
![Sector](impacts/useeio/read_parquet_duckwasm_js/sector.jpg)  
