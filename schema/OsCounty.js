cube(`Counties`, {
  sql: `SELECT * FROM public.os_county`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    Districts: {
      relationship: `hasMany`,
      sql: `${Counties}.county_id = ${Districts}.county_id`
    }
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [countyName]
    }
  },
  
  dimensions: {
  
    countyId: {
      sql: `county_id`,
      type: `string`,
      primaryKey: true
    },
    
    countyName: {
      sql: `county_name`,
      type: `string`
    }
    
  },
  
  dataSource: `default`
});
