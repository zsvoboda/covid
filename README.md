# GoodData and Cube.js COVID playground
This project contains a simple COVID analytics implemented in GoodData and Cube.js. 
There are two SQL scripts that create COVID database schema: one for US data and the other for Czech Republic data.

# Create initial Postgres DB
```shell
pg_restore --host=localhost --port=5432 --dbname=covid ./data/backup/covid.dump
```

# Manual SQL ELT
Execute `data/etl_us.sql` or `data/etl_cz.sql`.

# DBT ETL 
Optionally, you can execute the DBT ELT script. Review the `elt` directory.

# Cube.js schema
Review the `cube` directory.

# GoodData.CN project
Review the `gd` directory. Open the `gd/api/rest.http` in VScode with `REST API` extension installed and execute the API requests in the following sequence:

1. `gd/api/db.json`
2. `gd/api/pdm.json`
3. `gd/api/workspace.json`
4. `gd/api/ldm.json`
5. `gd/api/analytics_model.json`
