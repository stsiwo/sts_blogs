# Docker Project Template with Multi-Env

### API1
  - testing
     - use testing docker container
     command)
      - docker build --tag=api1:testing --target=testing . 
        // at root directory of api1 project
      - docker run --name=api1-testing -v ${PWD}:/app -e ${PWD}/.env.testing api1:testing 
        // run it
  - testing
    command) FLASK_ENV='testing' python -m pytest 

### Errors
  - slate package
    : ERROR in [at-loader] ./node_modules/slate/dist/interfaces/node.d.ts:178:21 
    : TS2456: Type alias 'NodeMatch' circularly references itself.
      -> even if you install the same package, i think the author does not do proper versioning.
      -> i got different dist when install it so be careful
