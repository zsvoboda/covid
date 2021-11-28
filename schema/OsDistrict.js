cube(`Districts`, {
  sql: `SELECT * FROM public.os_district`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    Cities: {
      relationship: `hasMany`,
      sql: `${Districts}.district_id = ${Cities}.district_id`
    },
    Infections: {
      relationship: `hasMany`,
      sql: `${Districts}.district_id = ${Infections}.district_id`
    },
    Recoveries: {
      relationship: `hasMany`,
      sql: `${Districts}.district_id = ${Recoveries}.district_id`
    },
    Deaths: {
      relationship: `hasMany`,
      sql: `${Districts}.district_id = ${Deaths}.district_id`
    }
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [districtName]
    }
  },
  
  dimensions: {
    
    districtId: {
      sql: `district_id`,
      type: `string`,
      primaryKey: true
    },
    
    districtName: {
      sql: `district_name`,
      type: `string`
    }
    
  },
  
  dataSource: `default`
});
