{{ config(materialized='view') }}

select distinct od.district_id, 
		sum(oce.covid_event_cnt) filter (where oce.covid_event_type in ('I')) as district_infections, 
		sum(oce.covid_event_cnt) filter (where oce.covid_event_type in ('R')) as district_recoveries,
		sum(oce.covid_event_cnt) filter (where oce.covid_event_type in ('D')) as district_deaths
		from dev.os_district od 
		join dev.os_covid_event oce on oce.district_id = od.district_id 
		group by 1