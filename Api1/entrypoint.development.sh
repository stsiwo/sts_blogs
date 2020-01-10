#!/bin/sh
set -e

export FLASK_ENV=development
export FLASK_APP=./run.py
export PYTHONDONTWRITEBYTECODE=1
python3 ./run.py
