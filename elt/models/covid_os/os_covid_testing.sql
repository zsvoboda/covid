select 
    (row_number() over())::integer as covid_testing_id,
    'CZ'::char(3) as country_id,
    datum::date as covid_testing_date, 
    prirustkovy_pocet_provedenych_ag_testu::integer as covid_testing_type_ag,
    prirustkovy_pocet_provedenych_testu::integer as covid_testing_type_pcr 
from dev.mv_covid