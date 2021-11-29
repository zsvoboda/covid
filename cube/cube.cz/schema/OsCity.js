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
    },

    cityPopulation: {
      sql: `${demographyPopulation}`,
      type: `sum`
    },

    cityMalePopulation: {
      sql: `${demographyMalePopulation}`,
      type: `sum`
    },

    cityFemalePopulation: {
      sql: `${demographyFemalePopulation}`,
      type: `sum`
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
    },

    demographyPopulation: {
      sql: `${Demographies.population}`,
      type: `number`,
      subQuery: true
    },

    demographyMalePopulation: {
      sql: `${Demographies.populationMale}`,
      type: `number`,
      subQuery: true
    },

    demographyFemalePopulation: {
      sql: `${Demographies.populationFemale}`,
      type: `number`,
      subQuery: true
    }
    
  },
  
  dataSource: `default`
});
