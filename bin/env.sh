#!/bin/bash

export COVID_HOME=/Users/zsvoboda/repos/covid

export CUBEJS_SQL_PORT=3306
export CUBE_SQL_USERNAME=cube
export CUBE_SQL_PASSWORD=cube

rm -rf ${COVID_HOME}/cube/schema/*  
ln -s ${COVID_HOME}/schema/CasesDeathsByCounty.js ${COVID_HOME}/cube/schema 
ln -s ${COVID_HOME}/schema/Counties.js ${COVID_HOME}/cube/schema 
