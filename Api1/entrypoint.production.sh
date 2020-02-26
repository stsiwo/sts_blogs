#!/bin/sh
set -e


export FLASK_ENV=production
export FLASK_APP=./run.py

# wait until db is ready
until flask db upgrade; do
  >&2 echo "MySQL is unavailable - sleeping"
  sleep 1
done

>&2 echo "MySQL is ready... start initial tables & data for flask app"

# seed
flask seed roles
flask seed tags

# start server
gunicorn -c python:wsgi_config run:main
