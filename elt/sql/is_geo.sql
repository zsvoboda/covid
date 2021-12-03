--drop extension file_fdw;
--create extension file_fdw;

--drop server covid_source_data foreign data wrapper file_fdw;
--create server covid_source_data foreign data wrapper file_fdw;

-- Geografie

drop foreign table if exists is_mista;
create foreign table is_mista
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

drop table if exists is_demografie;
create table is_demografie
(
	obec_kod text,
    obec_kod2 text,
    obec text,
    pocet_obyvatel text,
    pocet_muzi text,
    pocet_zeny text,
    vek_prumer text,
    vek_prumer_zeny text,
    vek_prumer_muzi text
);



drop materialized view if exists mv_mista;
create materialized view mv_mista as
 select obec, obec_kod, okres, okres_kod, kraj, kraj_kod, psc, latitude, longitude from is_mista;
 