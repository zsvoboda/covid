select 
    obec_kod::text,
	obec_kod2::text,
	obec::text,
	pocet_obyvatel::integer,
	pocet_muzi::integer,
	pocet_zeny::integer,
	vek_prumer::decimal(5,2),
	vek_prumer_zeny::decimal(5,2),
	vek_prumer_muzi::decimal(5,2) 
		from dev.is_demografie_2021