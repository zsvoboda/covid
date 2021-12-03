drop table if exists os_country;
create table os_country(
	country_id char(3) primary key,
	country_name varchar(50)
);

drop table if exists os_county;
create table os_county (
	county_id char(5) primary key, 
	country_id char(3) default 'CZ' references os_country(country_id),
	county_name varchar(50)
);

drop table if exists os_district;
create table os_district (
	district_id char(6) primary key, 
	county_id char(5) references os_county(county_id),
	district_name varchar(50)
);

drop table if exists os_city;
create table os_city (
	city_id char(6) primary key, 
	district_id char(6) references os_district(district_id),
	city_name varchar(50),
	city_latitude varchar(50),
	city_longitude varchar(50)
);

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

create index os_county_country_id_idx on os_county(country_id);
create index os_district_county_id_idx on os_district(county_id);
create index os_city_district_id_idx on os_city(district_id);
create index os_demography_city_id_idx on os_demography(city_id);


insert into os_country (country_id, country_name) values('CZ', 'Česká republika');
insert into os_county(county_id, county_name)
	select distinct kraj_kod, kraj from mv_mista;
insert into os_district (district_id, county_id, district_name)
	select distinct okres_kod, kraj_kod, okres from mv_mista ;
insert into os_city (city_id, district_id, city_name, city_latitude, city_longitude)
	select distinct obec_kod, okres_kod, obec, latitude, longitude from mv_mista ;
insert into os_demography (demography_id,
	city_id, city_population, city_population_male, city_population_female, 
	city_average_age, city_average_age_male, city_average_age_female)
	select distinct obec_kod2, obec_kod2, pocet_obyvatel, pocet_muzi, pocet_zeny, vek_prumer, vek_prumer_zeny, vek_prumer_zeny from is_obyvatele;