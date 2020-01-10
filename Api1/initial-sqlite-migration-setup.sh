#!/bin/sh
set -e

### initial setup for sqlite database setup

### description
# dbs for testing and development share the same sqlite migration file
# this is to avoid creating many migration folder for each envs
# in order to use specific db, use 'FLASK_ENV=testing or development' for your needs
# ex) if you need to access db for testing, run 'FLASK_ENV=testing' 
###

export FLASK_APP=./run.py
export PYTHONDONTWRITEBYTECODE=1

# create migration folder for sqlite database
# this could be testing or development
export FLASK_ENV=development 

# remove sqlite-migration folder
rm -f -r ./sqlite-migrations

# remove existing api sqlite db
rm -f ./api1-development.db
rm -f ./api1-testing.db

# initial setup
flask db init --directory=sqlite-migrations
flask db migrate --directory=sqlite-migrations

# upgrade to dev db 
flask db upgrade --directory=sqlite-migrations

# seed initial data for dev db
flask seed roles
flask seed tags
flask seed test-users
flask seed test-blogs


# switch to testing env to access testing db
export FLASK_ENV=testing

# upgrade to testing db
flask db upgrade --directory=sqlite-migrations

# seed initial data for testing db
flask seed roles
flask seed tags
