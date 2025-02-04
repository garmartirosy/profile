This files shows examples of reading parquet files using duck-wasm and javascript
Initial idea was to use DuckDB along with DBeaver but dbeaver would require a server to host

First example shows the Indicators (total 16) table
![indicator](impacts/useeio/read_parquet_duckwasm_js/indicator.jpg)


Second example uses 2 tables - Sector and Production Complete Amount, and combined them using 
a selected State value
![sector](impacts/useeio/read_parquet_duckwasm_js/sectorproduction.jpg)