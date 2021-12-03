with final as (
    select 
        (row_number() over())::integer as covid_event_id,
	    datum::date as covid_event_date, 
        'I'::char(1) as covid_event_type, 
        vek::smallint as covid_event_person_age, 
        lpad((vek::integer)::text, 3,'0')::char(3) as covid_event_person_age_padded,
	    case when pohlavi='Z' then 'F'::char(1) when pohlavi='M' then 'M'::char(1) end as covid_event_person_gender, 
	    okres_lau_kod::char(6) as district_id,
        1::smallint as covid_event_cnt
	from dev.mv_mista_covid_nakazeni

union 

    select 
	    (row_number() over())::integer as covid_event_id,
        datum::date as covid_event_date, 
        'R'::char(1) as covid_event_type, 
        vek::smallint as covid_event_person_age, 
        lpad((vek::integer)::text, 3,'0')::char(3) as covid_event_person_age_padded,
	    case when pohlavi='Z' then 'F'::char(1) when pohlavi='M' then 'M'::char(1) end as covid_event_person_gender, 
	    okres_lau_kod::char(6) as district_id,
        1::smallint as covid_event_cnt
	from dev.mv_mista_covid_vyleceni

union 

    select 
	    (row_number() over())::integer as covid_event_id,
        datum::date as covid_event_date, 
        'D'::char(1) as covid_event_type, 
        vek::smallint as covid_event_person_age,  
        lpad((vek::integer)::text, 3,'0')::char(3) as covid_event_person_age_padded,
	    case when pohlavi='Z' then 'F'::char(1) when pohlavi='M' then 'M'::char(1) end as covid_event_person_gender, 
	    okres_lau_kod::char(6) as district_id,
        1::smallint as covid_event_cnt
	from dev.mv_mista_covid_umrti
)

select * from final