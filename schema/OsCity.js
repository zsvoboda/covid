cube(`Cities`, {
  sql: `SELECT * FROM public.os_city`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    Demographies: {
      relationship: `hasMany`,
      sql: `${Cities}.city_id = ${Demographies}.city_id`
    }
  },
  
  measures: {
    
    count: {
      type: `count`,
      drillMembers: [cityName]
    }

  },
  
  dimensions: {
    
    cityId: {
      sql: `city_id`,
      type: `string`,
      primaryKey: true
    },
    
    cityName: {
      sql: `city_name`,
      type: `string`
    },
    
    cityLatitude: {
      sql: `city_latitude`,
      type: `string`
    },
    
    cityLongitude: {
      sql: `city_longitude`,
      type: `string`
    }
    
  },
  
  dataSource: `default`
});
