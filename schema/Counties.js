cube(`Counties`, {
  sql: `SELECT * FROM public.county`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  
  measures: {
    
    count: {
      type: `count`
    },

    population: {
      type: `sum`,
      sql: `population`
    },

    male: {
      type: `max`,
      sql: `male`
    },

    female: {
      type: `max`,
      sql: `female`
    }

  },
  
  dimensions: {
    
    fips: {
      sql: `fips`,
      type: `number`,
      primaryKey: true
    },

    state_name: {
      sql: `state`,
      type: `string`
    },
    
    county_name: {
      sql: `county`,
      type: `string`
    },

    state_code: {
      sql: `state_code`,
      type: `string`
    }

  },
  
  dataSource: `default`
});
