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
    CovidEvents: {
      relationship: `hasMany`,
      sql: `${Districts}.district_id = ${CovidEvents}.district_id`
    }
  },
  
  measures: {
    
    count: {
      type: `count`,
      drillMembers: [districtName]
    },

    districtPopulation: {
      sql: `${population}`,
      type: `sum`,
      drillMembers: [districtName]
    },

    districtMalePopulation: {
      sql: `${malePopulation}`,
      type: `sum`,
      drillMembers: [districtName]
    },

    districtFemalePopulation: {
      sql: `${femalePopulation}`,
      type: `sum`,
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
    },

    population: {
      sql: `${Cities.cityPopulation}`,
      type: `number`,
      subQuery: true
    },

    malePopulation: {
      sql: `${Cities.cityMalePopulation}`,
      type: `number`,
      subQuery: true
    },

    femalePopulation: {
      sql: `${Cities.cityFemalePopulation}`,
      type: `number`,
      subQuery: true
    }
    
  },
  
  dataSource: `default`
});
