select obec, 
        obec_kod::text, 
        okres::text, 
        okres_kod::text, 
        kraj::text, 
        kraj_kod::text, 
        psc::text, 
        latitude::text, 
        longitude::text 
    from dev.is_mista
