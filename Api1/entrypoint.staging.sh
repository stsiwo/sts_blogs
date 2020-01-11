#!/bin/sh
set -e


export FLASK_ENV=staging
export FLASK_APP=./run.py

migrationpath=/migrations/mysql-migrations

# if this is first time, create flask migration folders otherwise skip
if [ ! -d "$migrationpath" ]; then
  flask db init --directory=$migrationpath
fi

# wait until db is ready
until flask db migrate --directory=$migrationpath; do
  >&2 echo "MySQL is unavailable - sleeping"
  sleep 1
done

>&2 echo "MySQL is ready... start initial tables & data for flask app"

flask db upgrade --directory=$migrationpath

# seed initial data if not exists
flask seed roles
flask seed tags
flask seed test-users
flask seed test-blogs 

# start server
gunicorn -c python:wsgi_config run:main
