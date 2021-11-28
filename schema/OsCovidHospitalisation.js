cube(`Hospitalisations`, {
  sql: `SELECT * FROM public.os_covid_hospitalisation`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    
  },
  
  measures: {
    
    newlyHospitalised: {
      sql: `covid_hospitalisation_admissions`,
      type: `sum`,
      drillMembers: [covidHospitalisationDate]
    },

    hospitalised: {
      sql: `covid_hospitalisation_current`,
      type: `sum`,
      drillMembers: [covidHospitalisationDate]
    },

    noSymptomps: {
      sql: `covid_hospitalisation_no_symptoms`,
      type: `sum`,
      drillMembers: [covidHospitalisationDate]
    },

    lightSymptomps: {
      sql: `covid_hospitalisation_light_symptoms`,
      type: `sum`,
      drillMembers: [covidHospitalisationDate]
    },

    mediumSymptomps: {
      sql: `covid_hospitalisation_medium_symptoms`,
      type: `sum`,
      drillMembers: [covidHospitalisationDate]
    },

    severeSymptomps: {
      sql: `covid_hospitalisation_severe_symptoms`,
      type: `sum`,
      drillMembers: [covidHospitalisationDate]
    },

    intensiveCareTreatment: {
      sql: `covid_hospitalisation_intensive_care`,
      type: `sum`,
      drillMembers: [covidHospitalisationDate]
    },
    
    oxygenTreatment: {
      sql: `covid_hospitalisation_oxygen`,
      type: `sum`,
      drillMembers: [covidHospitalisationDate]
    },

    hfnoTreatment: {
      sql: `covid_hospitalisation_hfno`,
      type: `sum`,
      drillMembers: [covidHospitalisationDate]
    },

    ventilationTreatment: {
      sql: `covid_hospitalisation_ventilation`,
      type: `sum`,
      drillMembers: [covidHospitalisationDate]
    },

    ecmoTreatment: {
      sql: `covid_hospitalisation_ecmo`,
      type: `sum`,
      drillMembers: [covidHospitalisationDate]
    },

    ecmoVentilationTreatment: {
      sql: `covid_hospitalisation_ecmo_ventilation`,
      type: `sum`,
      drillMembers: [covidHospitalisationDate]
    },

    hospitalizationDeaths: {
      sql: `covid_hospitalisation_deaths`,
      type: `sum`,
      drillMembers: [covidHospitalisationDate]
    }

  },
  
  dimensions: {
    hospitalizationId: {
      sql: `covid_hospitalisation_id`,
      type: `number`,
      primaryKey: true
    },
    
    covidHospitalisationDate: {
      sql: `covid_hospitalisation_date`,
      type: `time`
    }
  },
  
  dataSource: `default`
});
