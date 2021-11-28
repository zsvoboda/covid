cube(`Testings`, {
  sql: `SELECT * FROM public.os_covid_testing`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    
  },
  
  measures: {

    antigen: {
      sql: `covid_testing_type_ag`,
      type: `sum`,
      drillMembers: [covidTestingDate]
    },

    pcr: {
      sql: `covid_testing_type_pcr`,
      type: `sum`,
      drillMembers: [covidTestingDate]
    }

  },
  
  dimensions: {
    covidTestingId: {
      sql: `covid_testing_id`,
      type: `number`,
      primaryKey: true
    },
    
    covidTestingDate: {
      sql: `covid_testing_date`,
      type: `time`
    }
  },
  
  dataSource: `default`
});
