#!/bin/sh
set -e

### update sqlite migration and upgrade to each env db (testing and development)
### please run if you modify the code relating database (e.g., model change) 

# migrate change to migration folder
flask db migrate --directory=sqlite-migrations

# upgrade the migration to each env db

## development
export FLASK_ENV=development 
flask db upgrade --directory=sqlite-migrations


## testing
export FLASK_ENV=testing
flask db upgrade --directory=sqlite-migrations

### staging and production 
### migrating & upgrading is done inside entrypoint.xxxx.sh
### this is because target database reside inside docker volume
### so it is impossible to migrate & upgrade without container (e.g., here)
