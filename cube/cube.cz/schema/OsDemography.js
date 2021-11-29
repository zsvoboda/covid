cube(`Demographies`, {
  sql: `SELECT * FROM public.os_demography`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    
  },
  
  measures: {

    population: {
      sql: `city_population`,
      type: `sum`
    },

    populationMale: {
      sql: `city_population_male`,
      type: `sum`
    },

    populationFemale: {
      sql: `city_population_female`,
      type: `sum`
    },

    populationMalePercentage: {
      sql: `100.0 * ${populationMale}/nullif(${population}, 0)`,
      type: `number`,
      format: `percent`
    },

    cityPopulationFemalePercentage: {
      sql: `100.0 * ${populationFemale}/nullif(${population}, 0)`,
      type: `number`,
      format: `percent`
    }

  },
  
  dimensions: {
    demographyId: {
      sql: `demography_id`,
      type: `string`,
      primaryKey: true
    }
  },
  
  dataSource: `default`
});
