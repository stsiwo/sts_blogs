#!/bin/sh
set -e


export FLASK_ENV=staging
export FLASK_APP=./run.py


ls -al
flask db upgrade
# wait until db is ready
until flask db upgrade; do
  >&2 echo "MySQL is unavailable - sleeping"
  sleep 1
done

>&2 echo "MySQL is ready... start initial tables & data for flask app"

# seed initial data if not exists
flask seed roles
flask seed tags
flask seed test-users
flask seed test-blogs 

# start server
gunicorn -c python:wsgi_config run:main
