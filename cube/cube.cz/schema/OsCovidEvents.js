cube(`CovidEvents`, {
  sql: `SELECT * FROM public.os_covid_event`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
  
  },
  
  measures: {

    infections: {
      sql: `covid_event_cnt`,
      type: `sum`,
      filters: [{ sql: `covid_event_type IN ('I')` }],
      drillMembers: [covidEventPersonGender, covidEventDate]
    },

    infectionsPercentage: {
      sql: `100.0 * ${infections}/nullif(${Districts.districtPopulation}, 0)`,
      type: `number`,
      format: `percent`
    },

    recoveries: {
      sql: `covid_event_cnt`,
      type: `sum`,
      filters: [{ sql: `covid_event_type IN ('R')` }],
      drillMembers: [covidEventPersonGender, covidEventDate]
    },

    recoveriesPercentage: {
      sql: `100.0 * ${recoveries}/nullif(${Districts.districtPopulation}, 0)`,
      type: `number`,
      format: `percent`
    },

    recoveryRate: {
      sql: `100.0 * ${recoveries}/${infections}`,
      type: `number`,
      format: `percent`
    },

    deaths: {
      sql: `covid_event_cnt`,
      type: `sum`,
      filters: [{ sql: `covid_event_type IN ('D')` }],
      drillMembers: [covidEventPersonGender, covidEventDate]
    },

    deathsPercentage: {
      sql: `100.0 * ${deaths}/nullif(${Districts.districtPopulation}, 0)`,
      type: `number`,
      format: `percent`
    },

    deathRate: {
      sql: `100.0 * ${deaths}/${infections}`,
      type: `number`,
      format: `percent`
    },

    personAge: {
      sql: `covid_event_person_age`,
      type: `avg`
    }

  },
  
  dimensions: {
    
    covidEventId: {
      sql: `covid_event_id`,
      type: `string`,
      primaryKey: true
    },
    
    covidEventPersonGender: {
      sql: `covid_event_person_gender`,
      type: `string`
    },

    covidEventPersonAge: {
      sql: `covid_event_person_age_padded`,
      type: `string`
    },
    
    covidEventDate: {
      sql: `covid_event_date`,
      type: `time`
    }

  },
  
  dataSource: `default`
});
