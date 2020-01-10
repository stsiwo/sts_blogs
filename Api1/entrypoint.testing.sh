#!/bin/sh
set -e

export FLASK_ENV=testing
export FLASK_APP=./run.py
export PYTHONDONTWRITEBYTECODE=1
python -m pytest $1 $2
