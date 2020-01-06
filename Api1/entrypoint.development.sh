#!/bin/sh
set -e

export FLASK_ENV=development
export FLASK_APP=./run.py
export PYTHONDONTWRITEBYTECODE=1
rm -r -f ./migrations
rm -f /tmp/api1.db
flask db init
flask db migrate
flask db upgrade
flask seed roles
flask seed tags
flask seed test-users
flask seed test-blogs
python3 ./run.py
