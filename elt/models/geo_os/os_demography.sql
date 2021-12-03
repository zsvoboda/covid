select distinct 
        obec_kod2::char(6) as demography_id, 
        obec_kod2::char(6) as city_id, 
        pocet_obyvatel::integer as city_population, 
        pocet_muzi::integer as city_population_male, 
        pocet_zeny::integer as city_population_female, 
        vek_prumer::decimal(5,2) as city_average_age, 
        vek_prumer_muzi::decimal(5,2) as city_average_age_male, 
        vek_prumer_zeny::decimal(5,2) as city_average_age_female
    from dev.is_demografie_2021
