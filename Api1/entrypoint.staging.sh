#!/bin/sh
set -e

export FLASK_ENV=staging
export FLASK_APP=./run.py

until flask db migrate; do
  >&2 echo "MySQL is unavailable - sleeping"
  sleep 1
done

>&2 echo "MySQL is ready... start initial tables & data for flask app"

flask db upgrade
flask seed roles
flask seed tags
flask seed test-users
flask seed test-blogs 
gunicorn -c python:wsgi_config run:main
