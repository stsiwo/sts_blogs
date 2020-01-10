#!/bin/sh
set -e

### update sqlite migration and upgrade to each env db (testing and development)

# migrate change to migration folder
flask db migrate --directory=sqlite-migrations

# upgrade the migration to each env db

## development
export FLASK_ENV=development 
flask db upgrade --directory=sqlite-migrations


## testing
export FLASK_ENV=testing
flask db upgrade --directory=sqlite-migrations

