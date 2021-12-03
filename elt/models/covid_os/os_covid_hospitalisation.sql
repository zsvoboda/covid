select 
		(row_number() over())::integer as covid_hospitalisation_id,
        'CZ'::char(3) as country_id,
        datum::date as covid_hospitalisation_date, 
		pacient_prvni_zaznam::integer as covid_hospitalisation_admissions,
        pocet_hosp::integer as covid_hospitalisation_current,
        stav_bez_priznaku::integer as covid_hospitalisation_no_symptoms,
        stav_lehky::integer as covid_hospitalisation_light_symptoms,
        stav_stredni::integer as covid_hospitalisation_medium_symptoms,
        stav_tezky::integer as covid_hospitalisation_severe_symptoms,
        jip::integer as covid_hospitalisation_intensive_care,
		kyslik::integer as covid_hospitalisation_oxygen,
        hfno::integer as covid_hospitalisation_hfno,
        upv::integer as covid_hospitalisation_ventilation,
        ecmo::integer as covid_hospitalisation_ecmo,
        tezky_upv_ecmo::integer as covid_hospitalisation_ecmo_ventilation,
        umrti::integer as covid_hospitalisation_deaths
		from dev.mv_covid_hospitalizace