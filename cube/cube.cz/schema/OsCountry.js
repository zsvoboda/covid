cube(`Countries`, {
  sql: `SELECT * FROM public.os_country`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    Counties: {
      relationship: `hasMany`,
      sql: `${Countries}.country_id = ${Counties}.country_id`
    },
    Testings: {
      relationship: `hasMany`,
      sql: `${Countries}.country_id = ${Testings}.country_id`
    },
  },
  
  measures: {

    count: {
      type: `count`,
      drillMembers: [countryName]
    },

    countryPopulation: {
      sql: `${population}`,
      type: `sum`,
      drillMembers: [countryName]
    },

    countryMalePopulation: {
      sql: `${malePopulation}`,
      type: `sum`,
      drillMembers: [countryName]
    },

    countryFemalePopulation: {
      sql: `${femalePopulation}`,
      type: `sum`,
      drillMembers: [countryName]
    }

  },
  
  dimensions: {
    
    countryId: {
      sql: `country_id`,
      type: `string`,
      primaryKey: true
    },
    
    countryName: {
      sql: `country_name`,
      type: `string`
    },

    population: {
      sql: `${Counties.countyPopulation}`,
      type: `number`,
      subQuery: true
    },

    malePopulation: {
      sql: `${Counties.countyMalePopulation}`,
      type: `number`,
      subQuery: true
    },

    femalePopulation: {
      sql: `${Counties.countyFemalePopulation}`,
      type: `number`,
      subQuery: true
    }
  
  },
  
  dataSource: `default`
});
