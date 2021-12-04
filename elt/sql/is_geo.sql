--drop extension file_fdw;
--create extension file_fdw;

--drop server covid_source_data foreign data wrapper file_fdw;
--create server covid_source_data foreign data wrapper file_fdw;

-- Geografie

drop foreign table if exists dev.is_mista;
create foreign table dev.is_mista
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