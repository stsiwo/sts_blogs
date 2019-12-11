#!/bin/sh
set -e

export FLASK_APP=./run.py
rm -r ./migrations
flask db init


until flask db migrate; do
  >&2 echo "MySQL is unavailable - sleeping"
  sleep 1
done

>&2 echo "MySQL is ready... start initial tables & data for flask app"

flask db upgrade
flask seed roles
flask seed tags
gunicorn -c python:wsgi_config run:main
