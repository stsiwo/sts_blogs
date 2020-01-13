#!/bin/sh
set -e

### update migration folder 
# use SQLite for testing/development env
# use MySQL for staging/production env
#
#  * run every time you modify src code esp code relating db
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

# migrate change to migration folder
flask db migrate 

# upgrade the migration to each env db

## development
export FLASK_ENV=development 
flask db upgrade


## testing
export FLASK_ENV=testing
flask db upgrade
