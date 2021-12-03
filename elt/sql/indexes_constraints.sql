/*
-- Geografie

drop table if exists os_country;
create table os_country(
	country_id char(3) primary key,
	country_name varchar(50)
);

insert into os_country (country_id, country_name) values('CZ', 'Česká republika');

drop table if exists os_county;
create table os_county (
	county_id char(5) primary key, 
	country_id char(3) default 'CZ' references os_country(country_id),
	county_name varchar(50)
);

create index os_county_country_id_idx on os_county(country_id);

insert into os_county(county_id, county_name)
	select distinct kraj_kod, kraj from mv_mista;

drop table if exists os_district;
create table os_district (
	district_id char(6) primary key, 
	county_id char(5) references os_county(county_id),
	district_name varchar(50)
);

create index os_district_county_id_idx on os_district(county_id);

insert into os_district (district_id, county_id, district_name)
	select distinct okres_kod, kraj_kod, okres from mv_mista ;

drop table if exists os_city;
create table os_city (
	city_id char(6) primary key, 
	district_id char(6) references os_district(district_id),
	city_name varchar(50),
	city_latitude varchar(50),
	city_longitude varchar(50)
);

create index os_city_district_id_idx on os_city(district_id);

insert into os_city (city_id, district_id, city_name, city_latitude, city_longitude)
	select distinct obec_kod, okres_kod, obec, latitude, longitude from mv_mista ;

drop table if exists os_demography;
create table os_demography (
	demography_id char(6) primary key,
	city_id char(6)  references os_city(city_id),
	city_population integer,
	city_population_male integer,
	city_population_female integer,
	city_average_age float,
	city_average_age_male float,
	city_average_age_female float
);

create index os_demography_city_id_idx on os_demography(city_id);

insert into os_demography (demography_id,
	city_id, city_population, city_population_male, city_population_female, 
	city_average_age, city_average_age_male, city_average_age_female)
	select distinct obec_kod2, obec_kod2, pocet_obyvatel, pocet_muzi, pocet_zeny, vek_prumer, vek_prumer_zeny, vek_prumer_zeny from is_obyvatele;
	
*/


drop view if exists v_covid_by_district;
drop view if exists v_demography_by_district;


drop table if exists os_covid_event;
create table os_covid_event (
	covid_event_id integer generated always as identity primary key,
	covid_event_date date,
	covid_event_type char(1) check (covid_event_type='I' or covid_event_type='R' or covid_event_type='D'),
	covid_event_person_age smallint,
	covid_event_person_age_padded char(3),
	covid_event_person_gender char(1) check (covid_event_person_gender='M' or covid_event_person_gender='F'),
	district_id char(6) references os_district(district_id),
	covid_event_cnt smallint default 1
);

alter table os_covid_event add constraint covid_event_type_check check (covid_event_type='I' or covid_event_type='R' or covid_event_type='D');
alter table os_covid_event add constraint covid_event_person_gender_check check (covid_event_person_gender='M' or covid_event_person_gender='F');
alter table os_covid_event add constraint covid_event_district_id_fkey foreign key (district_id)  references os_district(district_id);
create index os_covid_event_type_idx on os_covid_event(covid_event_type);
create index os_covid_event_date_idx on os_covid_event(covid_event_date);
create index os_covid_event_district_id_idx on os_covid_event(district_id);


create table os_covid_testing (
	covid_testing_id integer generated always as identity primary key,
	country_id char(3) default 'CZ' references os_country(country_id),
	covid_testing_date date,
	covid_testing_type_ag integer,
	covid_testing_type_pcr integer
);

alter table os_covid_testing add constraint os_covid_testing_country_id_fkey foreign key (country_id) references os_country(country_id);
create index os_covid_testing_country_id_idx on os_covid_testing(country_id);

alter table os_covid_hospitalisation add constraint os_covid_hospitalisation_country_id_fkey foreign key (country_id) references os_country(country_id);
create index os_covid_hospitalisation_country_id_idx on os_covid_hospitalisation(country_id);
	
--VIEWS
	
create view v_covid_by_district as
	select distinct od.district_id, 
		sum(oce.covid_event_cnt) filter (where oce.covid_event_type in ('I')) as district_infections, 
		sum(oce.covid_event_cnt) filter (where oce.covid_event_type in ('R')) as district_recoveries,
		sum(oce.covid_event_cnt) filter (where oce.covid_event_type in ('D')) as district_deaths
		from os_district od 
		join os_covid_event oce on oce.district_id = od.district_id 
		group by 1;

create view v_demography_by_district as
	select distinct od.district_id, 
		sum(ode.city_population) as district_population
		from os_district od 
		join os_city oc on oc.district_id = od.district_id 
		join os_demography ode on ode.city_id = oc.city_id 
		group by 1;	