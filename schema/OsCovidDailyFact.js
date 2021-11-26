cube(`CovidDailyFacts`, {
  sql: `SELECT * FROM public.os_covid_daily_fact`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [covid_date]
    },

    deaths_to_date: {
      sql: `covid_deaths_to_date`,
      type: `max`,
      drillMembers: [covid_date]
    },

    cases_to_date: {
      sql: `covid_cases_to_date`,
      type: `max`,
      drillMembers: [covid_date]
    },

    cases_per_100k: {
      sql: `100000*${cases}/nullif(${Counties.county_population},0)`,
      type: `number`,
      format: `percent`,
      drillMembers: [covid_date]
    },

    deaths_per_100k: {
      sql: `100000*${deaths}/nullif(${Counties.county_population},0)`,
      type: `number`,
      format: `percent`,
      drillMembers: [covid_date]
    },

    cases: {
      sql: `covid_cases_increment`,
      type: `sum`,
      drillMembers: [covid_date]
    },

    deaths: {
      sql: `covid_deaths_increment`,
      type: `sum`,
      drillMembers: [covid_date]
    }

  },
  
  dimensions: {
    
    covid_id: {
      sql: `covid_id`,
      type: `number`,
      primaryKey: true
    },
    
    covid_date: {
      sql: `covid_date`,
      type: `time`
    }
  },
  
  dataSource: `default`
});
