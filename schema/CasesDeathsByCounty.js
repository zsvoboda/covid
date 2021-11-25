cube(`CasesDeathsByCounty`, {
  sql: `SELECT * FROM public.cases_deaths_by_county`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    Counties: {
      relationship: `belongsTo`,
      sql: `${CasesDeathsByFips}.fips = ${Counties.fips}`
    },
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [date]
    },

    cases: {
      type: `max`,
      sql: 'cases'
    },

    deaths: {
      type: `max`,
      sql: 'deaths'
    }
  },
  
  dimensions: {
    
    id: {
      sql: `id`,
      type: `string`,
      primaryKey: true
    },
    
    date: {
      sql: `date`,
      type: `time`
    },

    quarter: {
      sql: `extract(YEAR from "date")||'/Q'||extract(QUARTER from "date")`,
      type: `string`
    },

    month: {
      sql: `extract(YEAR from "date")||'/'||LPAD(extract(MONTH from "date")::text,2,'0')`,
      type: `string`
    },

    week: {
      sql: `extract(YEAR from "date")||'/W'||LPAD(extract(WEEK from "date")::text,2,'0')`,
      type: `string`
    },

  },
  
  dataSource: `default`
});
