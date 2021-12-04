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
      drillMembers: [cityName],
      title: `Cities count`,
      description: `Number of cities`
    },

    cityPopulation: {
      sql: `${population}`,
      type: `sum`,
      title: `City population`,
      description: `City population`
    },

    cityMalePopulation: {
      sql: `${malePopulation}`,
      type: `sum`,
      title: `City male population`,
      description: `City male population`
    },

    cityFemalePopulation: {
      sql: `${femalePopulation}`,
      type: `sum`,
      title: `City female population`,
      description: `City female population`
    }

  },

  dimensions: {

    cityPk: {
      sql: `city_id`,
      type: `string`,
      primaryKey: true
    },

    cityId: {
      sql: `city_id`,
      type: `string`,
      title: `City code`,
      description: `City code`
    },

    cityName: {
      sql: `city_name`,
      type: `string`,
      title: `City name`,
      description: `City name`
    },

    cityGeo: {
      type: `geo`,
      latitude: {
        sql: `city_latitude`,
      },
      longitude: {
        sql: `city_longitude`,
      }
    },

    cityLongitude: {

      type: `geo`,
      title: `City longitude`,
      description: `City longitude`
    },

    population: {
      sql: `${Demographies.population}`,
      type: `number`,
      subQuery: true,
      shown: false
    },

    malePopulation: {
      sql: `${Demographies.populationMale}`,
      type: `number`,
      subQuery: true,
      shown: false
    },

    femalePopulation: {
      sql: `${Demographies.populationFemale}`,
      type: `number`,
      subQuery: true,
      shown: false
    }

  },

  dataSource: `default`
});
