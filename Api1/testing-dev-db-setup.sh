#!/bin/sh
set -e

### for (re)create database 
export FLASK_APP=./run.py
export PYTHONDONTWRITEBYTECODE=1

# create migration folder for sqlite database
# this could be testing or development
export FLASK_ENV=development 

# remove existing api sqlite db
rm -f ./api1-development.db
rm -f ./api1-testing.db

# upgrade to dev db 
flask db upgrade

# seed initial data for dev db
flask seed roles
flask seed tags
flask seed test-users
flask seed test-blogs


# switch to testing env to access testing db
export FLASK_ENV=testing

# upgrade to testing db
flask db upgrade

# seed initial data for testing db
flask seed roles
flask seed tags
