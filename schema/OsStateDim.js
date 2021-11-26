cube(`States`, {
  sql: `SELECT * FROM public.os_state_dim`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    Counties: {
      relationship: `hasMany`,
      sql: `${States}.state_id = ${Counties}.state_id`,
    },
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [state_name, state_code]
    },

    state_population: {
      sql: `state_population`,
      type: `sum`,
      drillMembers: [state_name, state_code]
    },

    state_male_population: {
      sql: `state_male_population`,
      type: `sum`,
      drillMembers: [state_name, state_code]
    },

    state_female_population: {
      sql: `state_female_population`,
      type: `sum`,
      drillMembers: [state_name, state_code]
    }

  },
  
  dimensions: {
    
    state_id: {
      sql: `state_id`,
      type: `number`,
      primaryKey: true
    },

    state_name: {
      sql: `state_name`,
      type: `string`
    },
    
    state_code: {
      sql: `state_code`,
      type: `string`
    }
    
  },
  
  dataSource: `default`
});
