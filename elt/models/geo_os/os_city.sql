select distinct 
        obec_kod::char(6) as city_id, 
        okres_kod::char(6) as district_id, 
        obec::varchar(50) as city_name, 
        latitude::varchar(50) as city_latitude, 
        longitude::varchar(50) as city_longitude 
    from dev.mv_mista
