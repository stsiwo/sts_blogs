#!/bin/sh
set -e

export FLASK_APP=./run.py
flask db init
flask db migrate
flask db upgrade
flask seed roles
flask seed tags
python ./run.py
