cube(`Deaths`, {
  sql: `SELECT * FROM public.os_covid_event WHERE covid_event_type IN ('D')`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [covidEventPersonGender, covidEventDate]
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
      sql: `covid_event_person_age`,
      type: `number`
    },
    
    covidEventDate: {
      sql: `covid_event_date`,
      type: `time`
    }
  },
  
  dataSource: `default`
});
