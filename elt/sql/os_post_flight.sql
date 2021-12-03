alter table os_covid_event add constraint covid_event_type_check check (covid_event_type='I' or covid_event_type='R' or covid_event_type='D');
alter table os_covid_event add constraint covid_event_person_gender_check check (covid_event_person_gender='M' or covid_event_person_gender='F');
alter table os_covid_event add constraint covid_event_district_id_fkey foreign key (district_id)  references os_district(district_id);
create index os_covid_event_type_idx on os_covid_event(covid_event_type);
create index os_covid_event_date_idx on os_covid_event(covid_event_date);
create index os_covid_event_district_id_idx on os_covid_event(district_id);

alter table os_covid_testing add constraint os_covid_testing_country_id_fkey foreign key (country_id) references os_country(country_id);
create index os_covid_testing_country_id_idx on os_covid_testing(country_id);

alter table os_covid_hospitalisation add constraint os_covid_hospitalisation_country_id_fkey foreign key (country_id) references os_country(country_id);
create index os_covid_hospitalisation_country_id_idx on os_covid_hospitalisation(country_id);
	