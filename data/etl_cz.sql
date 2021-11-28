

--drop extension file_fdw;
create extension file_fdw;

--drop server covid_source_data foreign data wrapper file_fdw;
create server covid_source_data foreign data wrapper file_fdw;

/*
-- Geografie

drop foreign table if exists public.is_mista;
create foreign table public.is_mista
(
	obec text,
	obec_kod text,
	okres text,
	okres_kod text,
	kraj text,
	kraj_kod text,
	psc text,
	latitude text,
	longitude text
)
server covid_source_data options 
(
    program 'curl -s https://raw.githubusercontent.com/33bcdd/souradnice-mest/master/souradnice.csv || exit $(( $? == 23 ? 0 : $? ))',
    format 'csv',
    header 'true'
);

drop materialized view if exists mv_mista;
create materialized view mv_mista as
 select obec, obec_kod, okres, okres_kod, kraj, kraj_kod, psc, latitude, longitude from public.is_mista;
 
 */

-- COVID obce

drop foreign table if exists public.is_mista_covid;
create foreign table public.is_mista_covid
(
	id text,
	den text,
	datum text,
	kraj_kod text,
	kraj_nazev text,
	okres_kod text,
	okres_nazev text,
	orp_kod text,
	orp_nazev text,
	obec_kod text,
	obec_nazev text,
	nove_pripady text,
	aktivni_pripady text,
	nove_pripady_65 text,
	nove_pripady_7_dni text,
	nove_pripady_14_dni text
)
server covid_source_data options 
(
    program 'curl -s https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/obce.csv || exit $(( $? == 23 ? 0 : $? ))',
    format 'csv',
    header 'true'
);

drop materialized view if exists mv_mista_covid;
create materialized view mv_mista_covid as
 select id,
	den,
	datum::date,
	kraj_kod,
	kraj_nazev,
	okres_kod,
	okres_nazev,
	orp_kod,
	orp_nazev,
	obec_kod,
	obec_nazev,
	nove_pripady::integer,
	aktivni_pripady::integer,
	nove_pripady_65::integer,
	nove_pripady_7_dni::integer,
	nove_pripady_14_dni::integer from public.is_mista_covid;

-- COVID kraj okres nakazeni vyleceni umrti

drop foreign table if exists public.is_mista_covid_kumul;
create foreign table public.is_mista_covid_kumul
(
	id text,
	datum text,
	kraj_kod text,
	okres_kod text,
	kumulativni_pocet_nakazenych text,
	kumulativni_pocet_vylecenych text,
	kumulativni_pocet_umrti text
)
server covid_source_data options 
(
    program 'curl -s https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/kraj-okres-nakazeni-vyleceni-umrti.csv || exit $(( $? == 23 ? 0 : $? ))',
    format 'csv',
    header 'true'
);


drop materialized view if exists mv_mista_covid_kumul;
create materialized view mv_mista_covid_kumul as
 select id,
	datum::date,
	kraj_kod,
	okres_kod,
	kumulativni_pocet_nakazenych::integer,
	kumulativni_pocet_vylecenych::integer,
	kumulativni_pocet_umrti::integer from public.is_mista_covid_kumul;

-- COVID orp (obce s rozsirenou pusobnosti)

drop foreign table if exists public.is_mista_covid_orp;
create foreign table public.is_mista_covid_orp
(
	id text,
	den text,
	datum  text,
	orp_kod text,
	orp_nazev text,
	incidence_7 text,
	incidence_65_7 text,
	incidence_75_7 text,
	prevalence text,
	prevalence_65 text,
	prevalence_75 text,
	aktualni_pocet_hospitalizovanych_osob text,
	nove_hosp_7 text,
	testy_7 text
	)
server covid_source_data options 
(
    program 'curl -s https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/orp.csv || exit $(( $? == 23 ? 0 : $? ))',
    format 'csv',
    header 'true'
);

drop materialized view if exists mv_mista_covid_orp;
create materialized view mv_mista_covid_orp as
 select id,
	den,
	datum::date,
	orp_kod,
	orp_nazev,
	incidence_7::integer,
	incidence_65_7::integer,
	incidence_75_7::integer,
	prevalence::integer,
	prevalence_65::integer,
	prevalence_75::integer,
	aktualni_pocet_hospitalizovanych_osob::integer,
	nove_hosp_7::integer,
	testy_7::integer from public.is_mista_covid_orp;

-- COVID hospitalizace

drop foreign table if exists public.is_covid_hospitalizace;
create foreign table public.is_covid_hospitalizace
(
	id text,
	datum text,
	pacient_prvni_zaznam text,
	kum_pacient_prvni_zaznam text,
	pocet_hosp text,
	stav_bez_priznaku text,
	stav_lehky text,
	stav_stredni text,
	stav_tezky text,
	jip text,
	kyslik text,
	hfno text,
	upv text,
	ecmo text,
	tezky_upv_ecmo text,
	umrti text,
	kum_umrti text
)
server covid_source_data options 
(
    program 'curl -s https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/hospitalizace.csv || exit $(( $? == 23 ? 0 : $? ))',
    format 'csv',
    header 'true'
);

drop materialized view if exists mv_covid_hospitalizace;
create materialized view mv_covid_hospitalizace as
 select id,
	datum::date,
	pacient_prvni_zaznam::integer,
	kum_pacient_prvni_zaznam::integer,
	pocet_hosp::integer,
	stav_bez_priznaku::integer,
	stav_lehky::integer,
	stav_stredni::integer,
	stav_tezky::integer,
	jip::integer,
	kyslik::integer,
	hfno::integer,
	upv::integer,
	ecmo::integer,
	tezky_upv_ecmo::integer,
	umrti::integer,
	kum_umrti::integer 
 from public.is_covid_hospitalizace;


-- COVID nakazeni vyleceni umrti testy


drop foreign table if exists public.is_covid;
create foreign table public.is_covid
(
	datum text,
	kumulativni_pocet_nakazenych text,
	kumulativni_pocet_vylecenych text,
	kumulativni_pocet_umrti text,
	kumulativni_pocet_testu text,
	kumulativni_pocet_ag_testu text,
	prirustkovy_pocet_nakazenych text,
	prirustkovy_pocet_vylecenych text,
	prirustkovy_pocet_umrti text,
	prirustkovy_pocet_provedenych_testu text,
	prirustkovy_pocet_provedenych_ag_testu text
)
server covid_source_data options 
(
    program 'curl -s https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/nakazeni-vyleceni-umrti-testy.csv || exit $(( $? == 23 ? 0 : $? ))',
    format 'csv',
    header 'true'
);

drop materialized view if exists mv_covid;
create materialized view mv_covid as
 select  
 	datum::date,
	kumulativni_pocet_nakazenych::integer,
	kumulativni_pocet_vylecenych::integer,
	kumulativni_pocet_umrti::integer,
	kumulativni_pocet_testu::integer,
	kumulativni_pocet_ag_testu::integer,
	prirustkovy_pocet_nakazenych::integer,
	prirustkovy_pocet_vylecenych::integer,
	prirustkovy_pocet_umrti::integer,
	prirustkovy_pocet_provedenych_testu::integer,
	prirustkovy_pocet_provedenych_ag_testu::integer
 from public.is_covid;

-- COVID nakazeni osoby

drop foreign table if exists public.is_mista_covid_nakazeni;
create foreign table public.is_mista_covid_nakazeni
(
	id text,
	datum text,
	vek text,
	pohlavi text,
	kraj_nuts_kod text,
	okres_lau_kod text,
	nakaza_v_zahranici text,
	nakaza_zeme_csu_kod text,
	reportovano_khs text
)
server covid_source_data options 
(
    program 'curl -s https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/osoby.csv || exit $(( $? == 23 ? 0 : $? ))',
    format 'csv',
    header 'true'
);

drop materialized view if exists mv_mista_covid_nakazeni;
create materialized view mv_mista_covid_nakazeni as
 select id,
	datum::date,
	vek::integer,
	pohlavi,
	kraj_nuts_kod,
	okres_lau_kod,
	nakaza_v_zahranici::integer,
	nakaza_zeme_csu_kod,
	reportovano_khs::integer from public.is_mista_covid_nakazeni;

-- COVID vyleceni osoby

drop foreign table if exists public.is_mista_covid_vyleceni;
create foreign table public.is_mista_covid_vyleceni
(
	id text,
	datum text,
	vek text,
	pohlavi text,
	kraj_nuts_kod text,
	okres_lau_kod text
)
server covid_source_data options 
(
    program 'curl -s https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/vyleceni.csv || exit $(( $? == 23 ? 0 : $? ))',
    format 'csv',
    header 'true'
);

drop materialized view if exists mv_mista_covid_vyleceni;
create materialized view mv_mista_covid_vyleceni as
 select id,
	datum::date,
	vek::integer,
	pohlavi,
	kraj_nuts_kod,
	okres_lau_kod from public.is_mista_covid_vyleceni;

-- COVID umrti osoby

drop foreign table if exists public.is_mista_covid_umrti;
create foreign table public.is_mista_covid_umrti
(
	id text,
	datum text,
	vek text,
	pohlavi text,
	kraj_nuts_kod text,
	okres_lau_kod text
)
server covid_source_data options 
(
    program 'curl -s https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/umrti.csv || exit $(( $? == 23 ? 0 : $? ))',
    format 'csv',
    header 'true'
);

drop materialized view if exists mv_mista_covid_umrti;
create materialized view mv_mista_covid_umrti as
 select id,
	datum::date,
	vek::integer,
	pohlavi,
	kraj_nuts_kod,
	okres_lau_kod from public.is_mista_covid_umrti;

-- MODEL

/*
-- Geografie

drop table if exists os_country;
create table os_country(
	country_id char(3) primary key,
	country_name varchar(50)
);

insert into public.os_country (country_id, country_name) values('CZ', 'Česká republika');

drop table if exists os_county;
create table os_county (
	county_id char(5) primary key, 
	country_id char(3) default 'CZ' references os_country(country_id),
	county_name varchar(50)
);

insert into os_county(county_id, county_name)
	select distinct kraj_kod, kraj from mv_mista;

drop table if exists os_district;
create table os_district (
	district_id char(6) primary key, 
	county_id char(5) references os_county(county_id),
	district_name varchar(50)
);

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

insert into os_city (city_id, district_id, city_name, city_latitude, city_longitude)
	select distinct obec_kod, okres_kod, obec, latitude, longitude from mv_mista ;

drop table if exists os_demography;
create table os_demography (
	city_id char(6) primary key references os_city(city_id),
	city_population integer,
	city_population_male integer,
	city_population_female integer,
	city_average_age float,
	city_average_age_male float,
	city_average_age_female float
);


insert into os_demography (
	city_id, city_population, city_population_male, city_population_female, 
	city_average_age, city_average_age_male, city_average_age_female)
	select distinct obec_kod2, pocet_obyvatel, pocet_muzi, pocet_zeny, vek_prumer, vek_prumer_zeny, vek_prumer_zeny from is_obyvatele;
	
*/

drop table if exists os_covid_event;
create table os_covid_event (
	covid_event_id integer generated always as identity primary key,
	covid_event_date date,
	covid_event_type char(1) check (covid_event_type='I' or covid_event_type='R' or covid_event_type='D'),
	covid_event_person_age smallint,
	covid_event_person_gender char(1) check (covid_event_person_gender='M' or covid_event_person_gender='F'),
	covid_event_district_id char(6) references os_district(district_id)
);

insert into os_covid_event 
	(covid_event_date, covid_event_type, covid_event_person_age, 
	 covid_event_person_gender, covid_event_district_id) 
	select 
		datum, 'I', vek::integer, 
		case when pohlavi='Z' then 'F' when pohlavi='M' then 'M' end, 
		okres_lau_kod
		from mv_mista_covid_nakazeni;
	
insert into os_covid_event 
	(covid_event_date, covid_event_type, covid_event_person_age, 
	 covid_event_person_gender, covid_event_district_id) 
	select 
		datum, 'R', vek::integer, 
		case when pohlavi='Z' then 'F' when pohlavi='M' then 'M' end, 
		okres_lau_kod
		from mv_mista_covid_vyleceni ;
	
insert into os_covid_event 
	(covid_event_date, covid_event_type, covid_event_person_age, 
	 covid_event_person_gender, covid_event_district_id) 
	select 
		datum, 'D', vek::integer, 
		case when pohlavi='Z' then 'F' when pohlavi='M' then 'M' end, 
		okres_lau_kod
		from mv_mista_covid_umrti ;
	
drop table if exists os_covid_testing;
create table os_covid_testing (
	covid_testing_id integer generated always as identity primary key,
	country_id char(3) default 'CZ' references os_country(country_id),
	covid_testing_date date,
	covid_testing_type_ag integer,
	covid_testing_type_pcr integer
);

insert into os_covid_testing (covid_testing_date, covid_testing_type_ag, covid_testing_type_pcr) 
	select datum, prirustkovy_pocet_provedenych_ag_testu, prirustkovy_pocet_provedenych_testu from public.mv_covid; 



drop table if exists os_covid_hospitalisation;
create table os_covid_hospitalisation (
	covid_hospitalisation_id integer generated always as identity primary key,
	country_id char(3) default 'CZ' references os_country(country_id),
	covid_hospitalisation_date date,
	covid_hospitalisation_admissions integer,
	covid_hospitalisation_current integer,
	covid_hospitalisation_no_symptoms integer,
	covid_hospitalisation_light_symptoms integer,
	covid_hospitalisation_medium_symptoms integer,
	covid_hospitalisation_severe_symptoms integer,
	covid_hospitalisation_intensive_care integer,
	covid_hospitalisation_oxygen integer,
	covid_hospitalisation_hfno integer,
	covid_hospitalisation_ventilation integer,
	covid_hospitalisation_ecmo integer,
	covid_hospitalisation_ecmo_ventilation integer,
	covid_hospitalisation_deaths integer
);

insert into os_covid_hospitalisation (
	covid_hospitalisation_date, covid_hospitalisation_admissions, covid_hospitalisation_current, 
	covid_hospitalisation_no_symptoms, covid_hospitalisation_light_symptoms, 
	covid_hospitalisation_medium_symptoms, covid_hospitalisation_severe_symptoms, 
	covid_hospitalisation_intensive_care, covid_hospitalisation_oxygen, 
	covid_hospitalisation_hfno, covid_hospitalisation_ventilation, 
	covid_hospitalisation_ecmo, covid_hospitalisation_ecmo_ventilation, 
	covid_hospitalisation_deaths) 
	select 
		datum, 
		pacient_prvni_zaznam,pocet_hosp,stav_bez_priznaku, stav_lehky, stav_stredni, stav_tezky, jip,
		kyslik,hfno,upv,ecmo,tezky_upv_ecmo,umrti 
		from mv_covid_hospitalizace;


/*
select * from mv_mista mm;
select * from mv_mista_covid mmc where orp_kod='7111';
select * from os_county;
select * from os_district;
	
select covid_hospitalisation_date, covid_hospitalisation_current,
covid_hospitalisation_no_symptoms + covid_hospitalisation_light_symptoms + 
covid_hospitalisation_medium_symptoms + covid_hospitalisation_severe_symptoms 
	from os_covid_hospitalisation och
	order by covid_hospitalisation_date desc;


select covid_event_date, count(covid_event_id) 
	from os_covid_event oce 
	where covid_event_type = 'I'
	group by 1
	order by 1 desc;

select datum, prirustkovy_pocet_provedenych_testu, prirustkovy_pocet_provedenych_ag_testu 
	from mv_covid mc
	order by datum desc; 

select covid_event_date, count(covid_event_id) 
	from os_covid_event oce 
	where covid_event_type = 'D'
	group by 1
	order by 1 desc;

select count(covid_event_id) 
	from os_covid_event oce 
	where covid_event_type = 'D';

select * 
	from mv_covid_hospitalizace mch
	order by datum desc;
	
select city_id, city_name from os_city oc where city_id not in (select city_id from os_demography od);
select city_id from os_demography oc where city_id not in (select city_id from os_city od);
*/