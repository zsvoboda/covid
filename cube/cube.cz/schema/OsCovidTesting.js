cube(`Tests`, {
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
      drillMembers: [covidTestingDate],
      title: `Antigen`,
      description: `Number of antigen tests.`
    },

    pcr: {
      sql: `covid_testing_type_pcr`,
      type: `sum`,
      drillMembers: [covidTestingDate],
      title: `PCR`,
      description: `Number of PCR tests.`
    }

  },
  
  dimensions: {
    covidTestingId: {
      sql: `covid_testing_id`,
      type: `number`,
      primaryKey: true,
      shown: false
    },
    
    covidTestingDate: {
      sql: `covid_testing_date`,
      type: `time`,
      title: `Test Date`,
      description: `Test date.`
    }
  },
  
  dataSource: `default`
});
