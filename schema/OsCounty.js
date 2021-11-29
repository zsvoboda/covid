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
    },

    countyPopulation: {
      sql: `${population}`,
      type: `sum`,
      drillMembers: [countyName]
    },

    countyMalePopulation: {
      sql: `${malePopulation}`,
      type: `sum`,
      drillMembers: [countyName]
    },

    countyFemalePopulation: {
      sql: `${femalePopulation}`,
      type: `sum`,
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
    },

    population: {
      sql: `${Districts.districtPopulation}`,
      type: `number`,
      subQuery: true
    },

    malePopulation: {
      sql: `${Districts.districtMalePopulation}`,
      type: `number`,
      subQuery: true
    },

    femalePopulation: {
      sql: `${Districts.districtFemalePopulation}`,
      type: `number`,
      subQuery: true
    }
    
  },
  
  dataSource: `default`
});
