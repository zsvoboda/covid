cube(`CovidFacts`, {
  sql: `SELECT * FROM public.os_covid_fact`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: []
    },

    deaths_total: {
      sql: `covid_deaths`,
      type: `sum`
    },

    cases_total: {
      sql: `covid_cases`,
      type: `sum`
    },

  },
  
  dimensions: {

    covid_id: {
      sql: `covid_id`,
      type: `number`,
      primaryKey: true
    }

  },
  
  dataSource: `default`
});
