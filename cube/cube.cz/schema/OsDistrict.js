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
      drillMembers: [districtName],
      title: `Districts count`,
      description: `Number of districts`
    },

    districtPopulation: {
      sql: `${populationFact}`,
      type: `sum`,
      drillMembers: [districtName],
      title: `District population`,
      description: `District population`
    },

    districtMalePopulation: {
      sql: `${malePopulationFact}`,
      type: `sum`,
      drillMembers: [districtName],
      title: `District male population`,
      description: `District male population`
    },

    districtFemalePopulation: {
      sql: `${femalePopulationFact}`,
      type: `sum`,
      drillMembers: [districtName],
      title: `District female population`,
      description: `District female population`
    }

  },
  
  dimensions: {
    
    districtPk: {
      sql: `district_id`,
      type: `string`,
      primaryKey: true
    },
    
    districtId: {
      sql: `district_id`,
      type: `string`,
      title: `District code`,
      description: `District code`
    },

    districtCountyId: {
      sql: `county_id`,
      type: `string`,
      title: `District county code`,
      description: `District county code`
    },

    districtName: {
      sql: `district_name`,
      type: `string`,
      title: `District name`,
      description: `District name`
    },

    populationFact: {
      sql: `${Cities.cityPopulation}`,
      type: `number`,
      subQuery: true
    },

    malePopulationFact: {
      sql: `${Cities.cityMalePopulation}`,
      type: `number`,
      subQuery: true
    },

    femalePopulationFact: {
      sql: `${Cities.cityFemalePopulation}`,
      type: `number`,
      subQuery: true
    }
    
  },
  
  dataSource: `default`
});
