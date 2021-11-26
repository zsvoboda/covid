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
    
    covidDeathsToDate: {
      sql: `covid_deaths_to_date`,
      type: `max`,
      drillMembers: [stateName, countyName, covidDate]
    },
    
    covidCasesToDate: {
      sql: `covid_cases_to_date`,
      type: `max`,
      drillMembers: [stateName, countyName, covidDate]
    },

    covidDeathsIncrement: {
      sql: `covid_deaths_increment`,
      type: `sum`,
      drillMembers: [stateName, countyName, covidDate]
    },
    
    covidCasesIncrement: {
      sql: `covid_cases_increment`,
      type: `sum`,
      drillMembers: [stateName, countyName, covidDate]
    },

    covidCasesIncrementPer100k: {
      sql: `100000*${covidCasesIncrement}/326289971`,
      type: `number`,
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
