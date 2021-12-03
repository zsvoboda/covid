select id,
	datum::date,
	vek::integer,
	pohlavi,
	kraj_nuts_kod,
	okres_lau_kod from public.is_mista_covid_vyleceni