# Docker Project Template with Multi-Env

### API1
  - testing
     - use testing docker container
      - command)
        - docker build --tag=api1:testing --target=testing . 
          // at root directory of api1 project
        - docker run --name=api1-testing -v ${PWD}:/app -e ${PWD}/.env.testing api1:testing <additional_pytest_command>
          // ex) docker run .... api1:testing -m blog_src_get (run only test whose marks include 'blog_src_get')
          // run it
  - development
     - command)
        - docker build --tag=api1:development --target=development . 
          // at root directory of api1 project
        - docker run --name=api1-development -v ${PWD}:/app -e ${PWD}/.env.development -p 5000:5000 api1:development  
          // run it

### SPA
  - testing
     - use testing docker container
      - command)
        - docker build --tag=spa:testing --target=testing . 
          // at root directory of api1 project
        - docker container prune -f && docker run --name=spa-testing -v ${PWD}:/app -v /app/node_modules spa:testing 
          // run it
  - development
     - command)
        - docker build --tag=spa:development --target=development . 
          // at root directory of api1 project
        - docker container prune -f && docker run --name=spa-development -v ${PWD}:/app -v /app/node_modules -p 8080:8080 spa:development <additional command for 'npx jest'>
          // ex) docker run .... spa;development tests/specific_test.spec.ts
          // run it
  
     
### Docker Compose
  - staging-local
     - command)
        - docker volume remove docker_project_template_db-data-staging-storage && docker volume remove docker_project_template_db-logging-staging-storage // remove any volume
        - docker-compose -f docker-compose.staging.secrets.yml -f docker-compose.staging.yml -f docker-compose.staging.local.yml up -d --build
    - staging
       - docker-compose.yml
    - production
       - docker-compose.yml

### Integration Testing
  - staging (local)
    1. [run docker-compose (staging-local)](# Docker Compose)
    2. activate venv at Integration directory
    3. run selenuim server
        - command) java -jar selenium-server-standalone-3.141.59.jar
    4. run testing 
        - command) python -m pytest [option]
     

### Errors
  - Module build failed (from ./node_modules/sass-loader/dist/cjs.js):
    Error: Missing binding /app/node_modules/node-sass/vendor/linux_musl-x64-57/binding.node
      -> you mount docker host's node_modules directory to container
      -> use '-v /app/node_modules' to avoid mounting it
      
  - slate package
    : ERROR in [at-loader] ./node_modules/slate/dist/interfaces/node.d.ts:178:21 
    : TS2456: Type alias 'NodeMatch' circularly references itself.
      -> even if you install the same package, i think the author does not do proper versioning.
      -> i got different dist when install it so be careful
