select 
    id,
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
	nove_pripady_14_dni::integer from dev.is_mista_covid