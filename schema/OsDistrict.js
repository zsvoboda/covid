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
      drillMembers: [districtName]
    },

    districtPopulation: {
      sql: `${cityPopulation}`,
      type: `sum`,
      drillMembers: [districtName]
    },

    districtMalePopulation: {
      sql: `${cityMalePopulation}`,
      type: `sum`,
      drillMembers: [districtName]
    },

    districtFemalePopulation: {
      sql: `${cityFemalePopulation}`,
      type: `sum`,
      drillMembers: [districtName]
    },

    districtInfections: {
      sql: `${covidEventInfections}`,
      type: `sum`,
      drillMembers: [districtName]
    },

    districtInfectionsPerPopulation: {
      sql: `100 * ${districtInfections}/nullif(${districtPopulation}, 0)`,
      type: `number`,
      format: `percent`
    },

    districtRecoveries: {
      sql: `${covidEventRecoveries}`,
      type: `sum`,
      drillMembers: [districtName]
    },

    districtRecoveriesPerPopulation: {
      sql: `100 * ${districtRecoveries}/nullif(${districtPopulation}, 0)`,
      type: `number`,
      format: `percent`
    },

    districtRecoveryRate: {
      sql: `100 * ${districtRecoveries}/nullif(${districtInfections}, 0)`,
      type: `number`,
      format: `percent`
    },

    districtDeaths: {
      sql: `${covidEventDeaths}`,
      type: `sum`,
      drillMembers: [districtName]
    },

    districtDeathsPerPopulation: {
      sql: `100 * ${districtDeaths}/nullif(${districtPopulation}, 0)`,
      type: `number`,
      format: `percent`
    },

    districtDeathRate: {
      sql: `100 * ${districtDeaths}/nullif(${districtInfections}, 0)`,
      type: `number`,
      format: `percent`
    }

  },
  
  dimensions: {
    
    districtId: {
      sql: `district_id`,
      type: `string`,
      primaryKey: true
    },
    
    districtName: {
      sql: `district_name`,
      type: `string`
    },

    cityPopulation: {
      sql: `${Cities.cityPopulation}`,
      type: `number`,
      subQuery: true
    },

    cityMalePopulation: {
      sql: `${Cities.cityMalePopulation}`,
      type: `number`,
      subQuery: true
    },

    cityFemalePopulation: {
      sql: `${Cities.cityFemalePopulation}`,
      type: `number`,
      subQuery: true
    },

    covidEventInfections: {
      sql: `${CovidEvents.infections}`,
      type: `number`,
      subQuery: true
    },

    covidEventRecoveries: {
      sql: `${CovidEvents.recoveries}`,
      type: `number`,
      subQuery: true
    },

    covidEventDeaths: {
      sql: `${CovidEvents.deaths}`,
      type: `number`,
      subQuery: true
    }
    
  },
  
  dataSource: `default`
});
