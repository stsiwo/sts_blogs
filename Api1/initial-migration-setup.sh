#!/bin/sh
set -e

### initial setup migration folder
# use SQLite for testing/development env
# use MySQL for staging/production env
#
# *** initial setup for migrations folders:
#  - must modify manually when you run this script:
#    1. add 'render_as_batch=True,' to 'env.py'
#    2. modify '(CURRENT_TIMESTAMP)' to 'CURRENT_TIMESTAMP' 
# 
# flow)
#  1. run this script for initializing migration folders
#    - use testing or dev env of FLASK_ENV which automatically connect to appropriate sqlite database
#  2. modify src code esp models or something relating db
#  3. every time, you did 2., run 'update-migration.sh'
#    - internally it does 'migrate' & 'upgrade' command of Flask-Migrate
#  4. once we finished at dev/testing, we use 'migrations' folder to upgrade mysql database
#    - changing FLASK_ENV to staging/production automatically change the db connection
#    - run 'upgrade' command at entrypoint.staging/proudction.sh to insert schema structor to target mysql database
###


export FLASK_APP=./run.py
export PYTHONDONTWRITEBYTECODE=1

# create migration folder for sqlite database
# this could be testing or development
export FLASK_ENV=development 

# remove sqlite-migration folder
rm -f -r ./migrations

# remove existing api sqlite db
rm -f ./api1-development.db
rm -f ./api1-testing.db

# initial setup
flask db init 
flask db migrate 

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
