# Cube.js covid playground


```
pg_dump --host=localhost --port=5432 --user=demouser --compress=9 --file=./data/backup/covid.dump --format=c --schema=public covid
pg_restore --host=localhost --port=5432 --dbname=covid ./data/backup/covid.dump
npx cubejs-cli create covid -d postgres
docker run -p 4000:4000 \
  -v ${PWD}:/cube/conf \
  -e CUBEJS_DEV_MODE=true \
  cubejs/cube
```

host.docker.internal
