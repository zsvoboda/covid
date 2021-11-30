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
      drillMembers: [countyName],
      title: `Counties count`,
      description: `Number of counties`
    },

    countyPopulation: {
      sql: `${population}`,
      type: `sum`,
      drillMembers: [countyName],
      title: `County population`,
      description: `County population`
    },

    countyMalePopulation: {
      sql: `${malePopulation}`,
      type: `sum`,
      drillMembers: [countyName],
      title: `County male population`,
      description: `County male population`
    },

    countyFemalePopulation: {
      sql: `${femalePopulation}`,
      type: `sum`,
      drillMembers: [countyName],
      title: `County female population`,
      description: `County female population`
    }

  },
  
  dimensions: {
  
    countyId: {
      sql: `county_id`,
      type: `string`,
      primaryKey: true,
      title: `County code`,
      description: `County code`
    },
    
    countyName: {
      sql: `county_name`,
      type: `string`,
      title: `County name`,
      description: `County name`
    },

    population: {
      sql: `${Districts.districtPopulation}`,
      type: `number`,
      subQuery: true,
      shown: false
    },

    malePopulation: {
      sql: `${Districts.districtMalePopulation}`,
      type: `number`,
      subQuery: true,
      shown: false
    },

    femalePopulation: {
      sql: `${Districts.districtFemalePopulation}`,
      type: `number`,
      subQuery: true,
      shown: false
    }
    
  },
  
  dataSource: `default`
});
