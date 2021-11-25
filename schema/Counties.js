cube(`Counties`, {
  sql: `SELECT * FROM public.county`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [name]
    },

    population: {
      type: `sum`,
      sql: 'population'
    },

    male: {
      type: `sum`,
      sql: 'male'
    },

    female: {
      type: `sum`,
      sql: 'female'
    }
  },
  
  dimensions: {
    
    fips: {
      sql: `fips`,
      type: `number`,
      primaryKey: true
    },

    state: {
      sql: `state`,
      type: `string`
    },
    
    name: {
      sql: `county`,
      type: `string`
    },

    code: {
      sql: `state_code`,
      type: `string`
    }
  },
  
  dataSource: `default`
});
