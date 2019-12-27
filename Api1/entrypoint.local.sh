#!/bin/sh
set -e

. venv/bin/activate
export FLASK_ENV=testing
export FLASK_APP=./run.py
export PYTHONDONTWRITEBYTECODE=1
rm -r -f ./migrations
sudo rm -f /tmp/api1.db
flask db init
flask db migrate
flask db upgrade
flask seed roles
flask seed tags
flask seed test-users
flask seed test-blogs
sudo python3 ./run.py
