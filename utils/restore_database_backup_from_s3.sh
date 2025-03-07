#!/bin/bash -ex

cd $(git rev-parse --show-toplevel || echo ~/basedosdados)

if [[ $BD_ENVIRON != "STAGING" ]]; then
    echo "Refusing to restore backup as we are not in staging environment"
    exit 1
fi

aws s3 ls s3://basedosdados/backup/postgres.dump
aws s3 cp s3://basedosdados/backup/postgres.dump /tmp/db-ckan.dump

docker-compose stop
docker-compose up -d db

DB="docker exec -i -e PGPASSWORD=ckan db"
$DB /wait-until-up localhost:5432
$DB bash -c 'dropdb -U ckan ckan --if-exists && createdb -U ckan ckan'
$DB pg_restore -U ckan -d ckan --format=custom --exit-on-error < /tmp/db-ckan.dump

docker-compose up -d
docker exec -it ckan ckan search-index rebuild --verbose
