
alter table os_city add constraint os_city_city_id_pk primary key (city_id);
alter table os_district add constraint os_district_district_id_pk primary key (district_id);
alter table os_district add constraint os_county_county_id_pk primary key (county_id);
alter table os_district add constraint os_country_country_id_pk primary key (country_id);
alter table os_demography add constraint os_demography_demography_id_pk primary key (demography_id);

alter table os_county add constraint os_county_country_id_fk foreign key (country_id) references os_country(country_id);
alter table os_district add constraint os_district_county_id_fk foreign key (county_id) references os_county(county_id);
alter table os_city add constraint os_city_district_id_fk foreign key (district_id) references os_district(district_id);
alter table os_demography add constraint os_demography_city_id_fk foreign key (city_id) references os_city(city_id);

create index os_county_country_id_idx on os_county(country_id);
create index os_district_county_id_idx on os_district(county_id);
create index os_city_district_id_idx on os_city(district_id);
create index os_demography_city_id_idx on os_demography(city_id);