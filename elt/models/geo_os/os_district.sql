select distinct 
        okres_kod::char(6) as district_id, 
        kraj_kod::char(5) as county_id, 
        okres::varchar(50) district_name
    from dev.mv_mista