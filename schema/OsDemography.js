cube(`Demographies`, {
  sql: `SELECT * FROM public.os_demography`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    
  },
  
  measures: {
    
    cityPopulation: {
      sql: `city_population`,
      type: `sum`
    },

    cityPopulationMale: {
      sql: `city_population_male`,
      type: `sum`
    },

    cityPopulationFemale: {
      sql: `city_population_female`,
      type: `sum`
    },

    cityPopulationMalePercentage: {
      sql: `100.0 * ${cityPopulationMale}/nullif(${cityPopulation}, 0)`,
      type: `number`,
      format: `percent`
    },

    cityPopulationFemalePercentage: {
      sql: `100.0 * ${cityPopulationFemale}/nullif(${cityPopulation}, 0)`,
      type: `number`,
      format: `percent`
    }

  },
  
  dimensions: {
    cityId: {
      sql: `city_id`,
      type: `string`,
      primaryKey: true
    }
  },
  
  dataSource: `default`
});
