cube(`Counties`, {
  sql: `SELECT * FROM public.os_county_dim`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    CovidFacts: {
      relationship: `hasMany`,
      sql: `${Counties}.county_id = ${CovidFacts}.county_id`,
    },
    CovidDailyFacts: {
      relationship: `hasMany`,
      sql: `${Counties}.county_id = ${CovidDailyFacts}.county_id`,
    }
  },
  
  measures: {
    
    count: {
      type: `count`,
      drillMembers: [county_name, county_fips]
    },

    county_population: {
      sql: `county_population`,
      type: `sum`,
      drillMembers: [county_name, county_fips]
    },

    county_male_population: {
      sql: `county_male_population`,
      type: `sum`,
      drillMembers: [county_name, county_fips]
    },

    county_female_population: {
      sql: `county_female_population`,
      type: `sum`,
      drillMembers: [county_name, county_fips]
    }

  },
  
  dimensions: {
    
    county_id: {
      sql: `county_id`,
      type: `number`,
      primaryKey: true
    },

    county_fips: {
      sql: `county_fips`,
      type: `number`
    },

    county_name: {
      sql: `county_name`,
      type: `string`
    }

  },
  
  dataSource: `default`
});
