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
      drillMembers: [covidEventPersonGender, covidEventDate],
      title: `Infected`,
      description: `Number of infected.`
    },

    infectionsPercentage: {
      sql: `100.0 * ${infections}/nullif(${Districts.districtPopulation}, 0)`,
      type: `number`,
      format: `percent`,
      title: `Infected (%)`,
      description: `Percentage of COVID infected to the whole population.`
    },

    recoveries: {
      sql: `covid_event_cnt`,
      type: `sum`,
      filters: [{ sql: `covid_event_type IN ('R')` }],
      drillMembers: [covidEventPersonGender, covidEventDate],
      title: `Recovered`,
      description: `Number of recovered.`
    },

    recoveriesPercentage: {
      sql: `100.0 * ${recoveries}/nullif(${Districts.districtPopulation}, 0)`,
      type: `number`,
      format: `percent`,
      title: `Recovered (%)`,
      description: `Percentage of COVID recovered to the whole population.`
    },

    recoveryRate: {
      sql: `100.0 * ${recoveries}/${infections}`,
      type: `number`,
      format: `percent`,
      title: `Recovery rate (%)`,
      description: `Percentage of recovered to infected.`
    },

    deaths: {
      sql: `covid_event_cnt`,
      type: `sum`,
      filters: [{ sql: `covid_event_type IN ('D')` }],
      drillMembers: [covidEventPersonGender, covidEventDate],
      title: `Died`,
      description: `Number of died.`
    },

    deathsPercentage: {
      sql: `100.0 * ${deaths}/nullif(${Districts.districtPopulation}, 0)`,
      type: `number`,
      format: `percent`,
      title: `Dead (%)`,
      description: `Percentage of COVID deaths to the whole population.`
    },

    deathRate: {
      sql: `100.0 * ${deaths}/${infections}`,
      type: `number`,
      format: `percent`,
      title: `Death rate (%)`,
      description: `Percentage of dead to infected.`
    },

    personAge: {
      sql: `covid_event_person_age`,
      type: `avg`,
      title: `Average age`,
      description: `Patient average age.`
    }

  },
  
  dimensions: {
    
    covidEventId: {
      sql: `covid_event_id`,
      type: `string`,
      primaryKey: true,
      shown: false
    },
    
    covidEventPersonGender: {
      sql: `covid_event_person_gender`,
      type: `string`,
      title: `Gender`,
      description: `Patient gender.`
    },

    covidEventPersonAge: {
      sql: `covid_event_person_age_padded`,
      type: `string`,
      title: `Age`,
      description: `Patient age.`
    },
    
    covidEventDate: {
      sql: `covid_event_date`,
      type: `time`,
      title: `Event Date`,
      description: `Event date.`
    }

  },
  
  dataSource: `default`
});
