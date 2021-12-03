select distinct 
        kraj_kod::char(5) as county_id, 
        'CZ'::char(3) as country_id,
        kraj::varchar(50) as county_name
    from dev.mv_mista
