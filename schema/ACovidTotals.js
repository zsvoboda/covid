cube(`ACovidTotals`, {
  sql: `SELECT * FROM public.a_covid_totals`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [countyName, stateName]
    },
    
    covidDeathsTotal: {
      sql: `covid_deaths_total`,
      type: `sum`,
      drillMembers: [countyName, stateName]
    },
    
    covidCasesTotal: {
      sql: `covid_cases_total`,
      type: `sum`,
      drillMembers: [countyName, stateName]
    }
  },
  
  dimensions: {
    stateCode: {
      sql: `state_code`,
      type: `string`
    },
    
    countyName: {
      sql: `county_name`,
      type: `string`
    },
    
    stateName: {
      sql: `state_name`,
      type: `string`
    },
    
    countyFips: {
      sql: `county_fips`,
      type: `string`
    }
  },
  
  dataSource: `default`
});
