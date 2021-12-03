select 
	    datum as covid_event_date, 
        'I' as covid_event_type, 
        vek::integer as covid_event_person_age, 
        lpad((vek::integer)::text, 3,'0') as covid_event_person_age_padded,
	    case when pohlavi='Z' then 'F' when pohlavi='M' then 'M' end as covid_event_person_gender, 
	    okres_lau_kod as district_id,
        1 as covid_event_cnt
	from dev.mv_mista_covid_nakazeni

union 

select 
	    datum as covid_event_date, 
        'R' as covid_event_type, 
        vek::integer as covid_event_person_age, 
        lpad((vek::integer)::text, 3,'0') as covid_event_person_age_padded,
	    case when pohlavi='Z' then 'F' when pohlavi='M' then 'M' end as covid_event_person_gender, 
	    okres_lau_kod as district_id,
        1 as covid_event_cnt
	from dev.mv_mista_covid_vyleceni

union 

select 
	    datum as covid_event_date, 
        'D' as covid_event_type, 
        vek::integer as covid_event_person_age, 
        lpad((vek::integer)::text, 3,'0') as covid_event_person_age_padded,
	    case when pohlavi='Z' then 'F' when pohlavi='M' then 'M' end as covid_event_person_gender, 
	    okres_lau_kod as district_id,
        1 as covid_event_cnt
	from dev.mv_mista_covid_umrti