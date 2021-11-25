cube(`CasesDeathsByCounty`, {
  sql: `SELECT * FROM public.cases_deaths_by_county`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    Counties: {
      relationship: `belongsTo`,
      sql: `${CasesDeathsByCounty}.fips = ${Counties.fips}`
    },
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [date]
    },

    cases: {
      type: `max`,
      sql: `cases`
    },

    deaths: {
      type: `max`,
      sql: `deaths`
    },

    population: {
      type: `sum`,
      sql: `${Counties}.population`
    },

    male: {
      type: `max`,
      sql: `${Counties}.male`
    },

    female: {
      type: `max`,
      sql: `${Counties}.female`
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
    
    state_name: {
      sql: `${Counties}.state`,
      type: `string`
    },
    
    county_name: {
      sql: `${Counties}.county`,
      type: `string`
    },

    state_code: {
      sql: `${Counties}.state_code`,
      type: `string`
    }

  },
  
  dataSource: `default`
});
