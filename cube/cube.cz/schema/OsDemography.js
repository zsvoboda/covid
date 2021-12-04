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
      type: `sum`,
      title: `City population`,
      description: `City population`,
      shown: false
    },

    populationMale: {
      sql: `city_population_male`,
      type: `sum`,
      title: `City male population`,
      description: `City male population`,
      shown: false
    },

    populationFemale: {
      sql: `city_population_female`,
      type: `sum`,
      title: `City female population`,
      description: `City female population`,
      shown: false
    },

    populationMalePercentage: {
      sql: `100.0 * ${populationMale}/nullif(${population}, 0)`,
      type: `number`,
      format: `percent`,
      title: `City male population percentage`,
      description: `City male population percentage`,
      shown: false
    },

    cityPopulationFemalePercentage: {
      sql: `100.0 * ${populationFemale}/nullif(${population}, 0)`,
      type: `number`,
      format: `percent`,
      title: `City female population percentage`,
      description: `City female population percentage`,
      shown: false
    }

  },
  
  dimensions: {
    
    demographyPk: {
      sql: `demography_id`,
      type: `string`,
      primaryKey: true
    },

    demographyId: {
      sql: `demography_id`,
      type: `string`,
      title: `City ID`,
      description: `City ID`
    },

    populationFact: {
      sql: `city_population`,
      type: `number`,
      title: `City population`,
      description: `City population`
    },

    populationMaleFact: {
      sql: `city_population_male`,
      type: `number`,
      title: `City male population`,
      description: `City male population`
    },

    populationFemaleFact: {
      sql: `city_population_female`,
      type: `number`,
      title: `City female population`,
      description: `City female population`
    },

    populationMalePercentageFact: {
      sql: `100.0 * ${populationMale}/nullif(${population}, 0)`,
      type: `number`,
      format: `percent`,
      title: `City male population percentage`,
      description: `City male population percentage`
    },

    cityPopulationFemalePercentageFact: {
      sql: `100.0 * ${populationFemale}/nullif(${population}, 0)`,
      type: `number`,
      format: `percent`,
      title: `City female population percentage`,
      description: `City female population percentage`
    }

  },
  
  dataSource: `default`
});
