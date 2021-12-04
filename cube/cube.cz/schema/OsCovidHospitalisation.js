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
      drillMembers: [covidHospitalisationDate],
      title: `Newly hospitalised`,
      description: `Number of newly hospitalised patients.`
    },

    hospitalised: {
      sql: `covid_hospitalisation_current`,
      type: `sum`,
      drillMembers: [covidHospitalisationDate],
      title: `Hospitalized`,
      description: `Number of currently hospitalised patients.`
    },

    noSymptomps: {
      sql: `covid_hospitalisation_no_symptoms`,
      type: `sum`,
      drillMembers: [covidHospitalisationDate],
      title: `No symptoms`,
      description: `Number of currently hospitalised patients with no symptoms.`
    },

    lightSymptomps: {
      sql: `covid_hospitalisation_light_symptoms`,
      type: `sum`,
      drillMembers: [covidHospitalisationDate],
      title: `Light symptoms`,
      description: `Number of currently hospitalised patients with light symptoms.`
    },

    mediumSymptomps: {
      sql: `covid_hospitalisation_medium_symptoms`,
      type: `sum`,
      drillMembers: [covidHospitalisationDate],
      title: `Medium symptoms`,
      description: `Number of currently hospitalised patients with medium symptoms.`
    },

    severeSymptomps: {
      sql: `covid_hospitalisation_severe_symptoms`,
      type: `sum`,
      drillMembers: [covidHospitalisationDate],
      title: `Severe symptoms`,
      description: `Number of currently hospitalised patients with severe symptoms.`
    },

    intensiveCareTreatment: {
      sql: `covid_hospitalisation_intensive_care`,
      type: `sum`,
      drillMembers: [covidHospitalisationDate],
      title: `ICU`,
      description: `Number of currently hospitalised patients on intensive care.`
    },
    
    oxygenTreatment: {
      sql: `covid_hospitalisation_oxygen`,
      type: `sum`,
      drillMembers: [covidHospitalisationDate],
      title: `Oxygen`,
      description: `Number of currently hospitalised patients on oxygen treatment.`
    },

    hfnoTreatment: {
      sql: `covid_hospitalisation_hfno`,
      type: `sum`,
      drillMembers: [covidHospitalisationDate],
      title: `HFNO`,
      description: `Number of currently hospitalised patients on HFNO treatment.`
    },

    ventilationTreatment: {
      sql: `covid_hospitalisation_ventilation`,
      type: `sum`,
      drillMembers: [covidHospitalisationDate],
      title: `Ventilation`,
      description: `Number of currently hospitalised patients on ventilation treatment.`
    },

    ecmoTreatment: {
      sql: `covid_hospitalisation_ecmo`,
      type: `sum`,
      drillMembers: [covidHospitalisationDate],
      title: `ECMO`,
      description: `Number of currently hospitalised patients on ECMO treatment.`
    },

    ecmoVentilationTreatment: {
      sql: `covid_hospitalisation_ecmo_ventilation`,
      type: `sum`,
      drillMembers: [covidHospitalisationDate],
      title: `ECMO & Ventilation`,
      description: `Number of currently hospitalised patients on ECMO & ventilation treatment.`
    },

    hospitalizationDeaths: {
      sql: `covid_hospitalisation_deaths`,
      type: `sum`,
      drillMembers: [covidHospitalisationDate],
      title: `Died`,
      description: `Number of currently hospitalised patients who died treatment.`
    }

  },
  
  dimensions: {
    
    hospitalizationPk: {
      sql: `covid_hospitalisation_id`,
      type: `number`,
      primaryKey: true
    },

    hospitalizationId: {
      sql: `covid_hospitalisation_id`,
      type: `number`,
      title: `Hospitalisation ID`,
      description: `Hospitalisation ID.`
    },
    
    hospitalizationCountryId: {
      sql: `country_id`,
      type: `string`,
      title: `Country ID`,
      description: `Hospitalisation country ID.`
    },

    newlyHospitalisedFact: {
      sql: `covid_hospitalisation_admissions`,
      type: `number`,
      title: `Newly hospitalised`,
      description: `Number of newly hospitalised patients.`
    },

    hospitalisedFact: {
      sql: `covid_hospitalisation_current`,
      type: `number`,
      title: `Hospitalized`,
      description: `Number of currently hospitalised patients.`
    },

    noSymptompsFact: {
      sql: `covid_hospitalisation_no_symptoms`,
      type: `number`,
      title: `No symptoms`,
      description: `Number of currently hospitalised patients with no symptoms.`
    },

    lightSymptompsFact: {
      sql: `covid_hospitalisation_light_symptoms`,
      type: `number`,
      title: `Light symptoms`,
      description: `Number of currently hospitalised patients with light symptoms.`
    },

    mediumSymptompsFact: {
      sql: `covid_hospitalisation_medium_symptoms`,
      type: `number`,
      title: `Medium symptoms`,
      description: `Number of currently hospitalised patients with medium symptoms.`
    },

    severeSymptompsFact: {
      sql: `covid_hospitalisation_severe_symptoms`,
      type: `number`,
      title: `Severe symptoms`,
      description: `Number of currently hospitalised patients with severe symptoms.`
    },

    intensiveCareTreatmentFact: {
      sql: `covid_hospitalisation_intensive_care`,
      type: `number`,
      title: `ICU`,
      description: `Number of currently hospitalised patients on intensive care.`
    },
    
    oxygenTreatmentFact: {
      sql: `covid_hospitalisation_oxygen`,
      type: `number`,
      title: `Oxygen`,
      description: `Number of currently hospitalised patients on oxygen treatment.`
    },

    hfnoTreatmentFact: {
      sql: `covid_hospitalisation_hfno`,
      type: `number`,
      title: `HFNO`,
      description: `Number of currently hospitalised patients on HFNO treatment.`
    },

    ventilationTreatmentFact: {
      sql: `covid_hospitalisation_ventilation`,
      type: `number`,
      title: `Ventilation`,
      description: `Number of currently hospitalised patients on ventilation treatment.`
    },

    ecmoTreatmentFact: {
      sql: `covid_hospitalisation_ecmo`,
      type: `number`,
      title: `ECMO`,
      description: `Number of currently hospitalised patients on ECMO treatment.`
    },

    ecmoVentilationTreatmentFact: {
      sql: `covid_hospitalisation_ecmo_ventilation`,
      type: `number`,
      title: `ECMO & Ventilation`,
      description: `Number of currently hospitalised patients on ECMO & ventilation treatment.`
    },

    hospitalizationDeathsFact: {
      sql: `covid_hospitalisation_deaths`,
      type: `number`,
      title: `Died`,
      description: `Number of currently hospitalised patients who died treatment.`
    },

    covidHospitalisationDate: {
      sql: `covid_hospitalisation_date`,
      type: `time`,
      title: `Hospitalization Date`,
      description: `Hospitalization date.`
    }
  },
  
  dataSource: `default`
});
