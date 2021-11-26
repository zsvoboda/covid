--drop extension file_fdw;
create extension file_fdw;

--drop server covid_source_data foreign data wrapper file_fdw;
create server covid_source_data foreign data wrapper file_fdw;

drop foreign table if exists public.covid_staging;
create foreign table public.covid_staging
(
    date text,
    county text,
    state text,
    fips text,
    cases text,
    deaths text
)
server fdw_files options 
(
    program 'curl -s https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv || exit $(( $? == 23 ? 0 : $? ))',
    format 'csv',
    header 'true'
);

drop materialized view if exists covid;
create materialized view covid as
 select date::date, county, state, fips::integer, cases::integer, deaths::integer from covid_staging where fips is not null;

--select count(*), min(date), max(date) from covid;
--select count(*) from covid where date is null;
--select count(*) from covid where cases is null;
--select count(*) from covid where deaths is null;
--select count(*) from covid where fips is null;
--select * from covid where fips = '72001' order by date desc;

drop table if exists os_state_dim;
create table os_state_dim (
	state_id integer primary key,
	state_name varchar(50) not null,
	state_code varchar(2) not null,
	state_lat varchar(25),
	state_lon varchar(25),
	state_population integer,
	state_male_population integer,
	state_female_population integer
);

update county set state_code = 'dc' where state = 'district of columbia';
update county set state_code = 'pr' where state = 'puerto rico';

insert into os_state_dim(state_id, state_name, state_code, state_population, state_male_population, state_female_population)
	select hashtext(state), state, state_code, sum(population), sum(male), sum(female)
		from county 
		group by 1,2,3;
	
-- select distinct hashtext(state), state, state_code from county;
--select * from os_state_dim;
		
drop table if exists os_county_dim;
create table os_county_dim (
	county_id integer primary key,
	county_fips integer not null,
	county_name varchar(50) not null,
	county_lat varchar(25),
	county_lon varchar(25),
	state_id integer references os_state_dim(state_id),
	county_population integer,
	county_male_population integer,
	county_female_population integer,
	median_age float
);

insert into os_county_dim(county_id, county_fips, county_name, county_lat, county_lon, state_id, county_population, county_male_population, county_female_population, median_age)
	select fips, fips, county, lat, long, hashtext(state), population, male, female, median_age
		from county;
	
select * from os_county_dim;
	
drop table if exists os_covid_daily_fact;	
create table os_covid_daily_fact (
	covid_id integer generated always as identity primary key,
	covid_date date not null,
	county_id integer references os_county_dim(county_id),
	covid_deaths_to_date integer,
	covid_cases_to_date integer,
	covid_deaths_increment integer,
	covid_cases_increment integer
);

-- select id, date, fips, count(id) from 
-- (select hashtext(fips::text || date::text) as id, date, fips from covid) a
-- group by 1,2,3
-- having count(id)>0
-- order by 1;

--select distinct fips, county, state from covid 
--where fips not in (select county_id from os_county_dim); 

-- skipping few counties
-- 78030	st. thomas	virgin islands
-- 69110	saipan	northern mariana islands
-- 2998	yakutat plus hoonah-angoon	alaska
-- 78020	st. john	virgin islands
-- 69120	tinian	northern mariana islands
-- 78010	st. croix	virgin islands
-- 2997	bristol bay plus lake and peninsula	alaska
insert into os_covid_daily_fact(covid_date, county_id, covid_deaths_to_date, covid_cases_to_date, 
						   covid_deaths_increment, covid_cases_increment) 
	select date, fips, deaths, cases, deaths - lag(deaths,1) over(partition by fips order by date), 
		   cases - lag(cases,1) over(partition by fips order by date) 
		from covid where fips in (select county_id from os_county_dim);
	

--select county_id, covid_date, covid_cases_to_date, covid_cases_increment
--from os_covid_daily_fact
--order by 1,2;
	
drop table if exists os_covid_fact;	
create table os_covid_fact (
	covid_id integer generated always as identity primary key,
	county_id integer references os_county_dim(county_id),
	covid_deaths integer,
	covid_cases integer
);

insert into os_covid_fact (county_id, covid_deaths, covid_cases) 
	select county_id, max(covid_deaths_to_date), max(covid_cases_to_date)
		from os_covid_daily_fact
		group by 1;
	
--select * from os_covid_fact ocf;
	
--drop view if exists a_covid_totals;
create view a_covid_totals as
	select osd.state_name, osd.state_code, 
		   ocd.county_fips::text, ocd.county_name, 
		   ocd.county_population, ocd.county_male_population, ocd.county_female_population, 
		   osd.state_population, osd.state_male_population, osd.state_female_population, 
		   ocf.covid_deaths as covid_deaths_total, ocf.covid_cases as covid_cases_total
		from os_covid_fact ocf 
		join os_county_dim ocd on ocd.county_id = ocf.county_id 
		join os_state_dim osd on osd.state_id = ocd.state_id;

--select * from a_covid_totals; 
	
--drop view if exists a_covid_daily;
create view a_covid_daily as
	select osd.state_name, osd.state_code, 
		   ocd.county_fips::text, ocd.county_name, 
		   ocdf.covid_date,
		   ocdf.covid_deaths_to_date, ocdf.covid_deaths_increment,
		   ocdf.covid_cases_to_date, ocdf.covid_cases_increment, 
		   ocd.county_population, ocd.county_male_population, ocd.county_female_population, 
		   osd.state_population, osd.state_male_population, osd.state_female_population, 
		   ocf.covid_deaths as covid_deaths_total, ocf.covid_cases as covid_cases_total
		from os_covid_daily_fact ocdf 
		join os_covid_fact ocf on ocf.county_id = ocdf.county_id 
		join os_county_dim ocd on ocd.county_id = ocf.county_id 
		join os_state_dim osd on osd.state_id = ocd.state_id;

--select distinct county_, state_population, state_male_population, state_female_population from a_covid_daily order by 1;