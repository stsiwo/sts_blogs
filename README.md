# Docker Project Template with Multi-Env

### API1
  - docker build --tag=api1:dev --target=development .
  - docker run --name=api1-dev -v ${PWD}:/app -p 80:5000 -e ${PWD}/.env api1:dev

  - testing
    command) FLASK_ENV='testing' python -m pytest 

### Errors
  - slate package
    : ERROR in [at-loader] ./node_modules/slate/dist/interfaces/node.d.ts:178:21 
    : TS2456: Type alias 'NodeMatch' circularly references itself.
      -> even if you install the same package, i think the author does not do proper versioning.
      -> i got different dist when install it so be careful
