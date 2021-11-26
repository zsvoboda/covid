cube(`ACovidDaily`, {
  sql: `SELECT * FROM public.a_covid_daily`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [stateName, countyName, covidDate]
    },
    
    covidDeathsTotal: {
      sql: `covid_deaths_total`,
      type: `sum`,
      drillMembers: [stateName, countyName, covidDate]
    },
    
    covidCasesTotal: {
      sql: `covid_cases_total`,
      type: `sum`,
      drillMembers: [stateName, countyName, covidDate]
    }
  },
  
  dimensions: {
    countyFips: {
      sql: `county_fips`,
      type: `string`
    },
    
    stateName: {
      sql: `state_name`,
      type: `string`
    },
    
    countyName: {
      sql: `county_name`,
      type: `string`
    },
    
    stateCode: {
      sql: `state_code`,
      type: `string`
    },
    
    covidDate: {
      sql: `covid_date`,
      type: `time`
    }
  },
  
  dataSource: `default`
});
