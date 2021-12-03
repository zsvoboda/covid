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
 from public.is_covid_hospitalizace