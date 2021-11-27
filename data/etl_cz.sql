

--drop extension file_fdw;
create extension file_fdw;

--drop server covid_source_data foreign data wrapper file_fdw;
create server covid_source_data foreign data wrapper file_fdw;

-- SOURADNICE

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

-- OBCE

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

-- KRAJ OKRES NAKAZENI VYLECENI UMRTI

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

-- ORP

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

-- HOSPITALIZACE

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


-- NAKAZENI VYLECENI UMRTI TESTY


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

-- NAKAZENI OSOBY

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

-- VYLECENI OSOBY

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

-- UMRTI OSOBY

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






