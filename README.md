# Cube.js covid playground

```
pg_dump --host=localhost --port=5432 --user=demouser --compress=9 --file=./data/backup/covid.dump --format=c --schema=public covid
pg_restore --host=localhost --port=5432 --dbname=covid ./data/backup/covid.dump

select  county, state, population, sum(population) over(partition by state), sum(population) over()
  	from county;
  	
  select fips, date, cases, deaths, first_value(cases) over(partition by fips order by date desc), 
  		first_value(deaths) over(partition by fips order by date desc)
  	from cases_deaths_by_county cdbc order by fips, date; 
  	
  select fips, date, cases as cases_to_date, deaths as deaths_to_date, cases - lag(cases,1) over(partition by fips order by date) as cases_increment, 
  		deaths - lag(deaths,1) over(partition by fips order by date) as deaths_increment
  	from cases_deaths_by_county cdbc order by fips, date;

```

host.docker.internal


## Queries

```
{
  "measures": [
    "Districts.districtInfectionsPerPopulation",
    "Districts.districtRecoveriesPerPopulation",
    "Districts.districtDeathsPerPopulation",
    "Districts.districtRecoveryRate",
    "Districts.districtDeathRate"
  ],
  "timeDimensions": [],
  "order": {
    "Districts.districtInfectionsPerPopulation": "desc"
  },
  "filters": [],
  "dimensions": [
    "Counties.countyName"
  ]
}

```

## GraphQL

http://localhost:4000/cubejs-api/graphql

```
{
  load {
    counties {
      state
    }
    casesDeathsByCounty {
      week
      deaths
      cases
    }
  }
}
```