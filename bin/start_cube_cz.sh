#!/bin/bash

export BIN_DIR="`dirname \"$0\"`"
export COVID_HOME=$(cd ${BIN_DIR}/..;pwd)

docker run -d -p 3000:3000 -p 4000:4000 -p 3306:3306 \
  --name cube_covid_cz \
  -e CUBEJS_DB_HOST=host.docker.internal \
  -e CUBEJS_DB_NAME=covid_cz \
  -e CUBEJS_DB_USER=demouser \
  -e CUBEJS_DB_PASS=demopass \
  -e CUBEJS_DB_TYPE=postgres \
  -e CUBEJS_API_SECRET=cubepass \
  -e CUBEJS_SQL_PORT=3306 \
  -e CUBE_SQL_USERNAME=cube \
  -e CUBE_SQL_PASSWORD=cube \
  -e CUBEJS_DEV_MODE=true \
  -e TZ="Etc/UTC" \
  -v ${COVID_HOME}/cube/cube.cz:/cube/conf \
  cubejs/cube