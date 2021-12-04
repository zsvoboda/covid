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
    Tests: {
      relationship: `hasMany`,
      sql: `${Countries}.country_id = ${Tests}.country_id`
    },
  },
  
  measures: {

    count: {
      type: `count`,
      drillMembers: [countryName],
      title: `Country count`,
      description: `Number of countries`
    },

    countryPopulation: {
      sql: `${population}`,
      type: `sum`,
      drillMembers: [countryName],
      title: `Country population`,
      description: `Country population`
    },

    countryMalePopulation: {
      sql: `${malePopulation}`,
      type: `sum`,
      drillMembers: [countryName],
      title: `Country male population`,
      description: `Country male population`
    },

    countryFemalePopulation: {
      sql: `${femalePopulation}`,
      type: `sum`,
      drillMembers: [countryName],
      title: `Country female population`,
      description: `Country female population`
    }

  },
  
  dimensions: {
    
    countryPk: {
      sql: `country_id`,
      type: `string`,
      primaryKey: true
    },

    countryId: {
      sql: `country_id`,
      type: `string`,
      title: `Country code`,
      description: `Country code`
    },
    
    countryName: {
      sql: `country_name`,
      type: `string`,
      title: `Country name`,
      description: `Country name`
    },

    population: {
      sql: `${Counties.countyPopulation}`,
      type: `number`,
      subQuery: true,
      shown: false
    },

    malePopulation: {
      sql: `${Counties.countyMalePopulation}`,
      type: `number`,
      subQuery: true,
      shown: false
    },

    femalePopulation: {
      sql: `${Counties.countyFemalePopulation}`,
      type: `number`,
      subQuery: true,
      shown: false
    }
  
  },
  
  dataSource: `default`
});
