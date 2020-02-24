#!/bin/sh
set -e

### for updating

# upgrade the migration to each env db
## development
export FLASK_ENV=development 
flask db upgrade

## testing
export FLASK_ENV=testing
flask db upgrade
