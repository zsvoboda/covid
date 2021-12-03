{{ config(materialized='view') }}

select distinct od.district_id, 
		sum(ode.city_population) as district_population
		from dev.os_district od 
		join dev.os_city oc on oc.district_id = od.district_id 
		join dev.os_demography ode on ode.city_id = oc.city_id 
		group by 1		