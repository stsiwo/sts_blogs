# STS Blog Web App

### API1
  - testing
     - use testing docker container
      * if database schema is updated, you need to run ./initial-migration-setup
      - command)
        - docker build --tag=api1:testing --target=testing . 
          // at root directory of api1 project
        - docker run --name=api1-testing -v ${PWD}:/app -e ${PWD}/.env.testing api1:testing <additional_pytest_command>
          // ex) docker run .... api1:testing -m blog_src_get (run only test whose marks include 'blog_src_get')
          // run it
  - development
      * if database schema is updated, you need to run ./initial-migration-setup
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

### Unit/Service Testing
  - use Jest for spa and pytest for api
  #### SPA Unit/Service Testing Note
    - it is important to think about flow/steps of test case.
      - sometimes, jest goes beyound user behavior because of its speed. 
      ex)
        epxected flow:
          - 1. initial load (setup necessary state etc...)
          - 2. handling event (click, change etc...)
        but Jest might cause wierd bug:
          - 1. initial load (setup necessary state etc...)
          - 2. during inital load, start event handling <--- this is problem
          - 3. finish inital setup and produce unexpected bugs
        - solution:
          - use 'wait' to make sure each step complete in the order you expect!!!
  #### API Unit/Service Testing Note

### Integration Testing
  - staging (local)
    1. [run docker-compose at staging-local](#docker-compose)
    2. activate venv at Integration directory
    3. run selenuim server
        - command) java -jar selenium-server-standalone-3.141.59.jar
    4. run testing 
        - command) python -m pytest [option]
        
  * caveats:
    - currently, I run integration testing on Linux platform. this is because docker selenium grid only support Linux platform.
      - if use any commercial automate testing tools, it can increase more variety of platform.
    - switch integration testing from python to Java since Java provide easier setting for parallel testing. can achieve the parallel testing using Python but need manually config for it, so move to Java.
  - issues
    - getting slower when running long test
      - esp sendKeys to fill text in input field with type ahead feature.
      - this is because of type ahead feature?? --> try to use Rxjs
    - randomly failure when running acceptance testing 

### API DB migration Logic
  - use a single migration (SQLite context) for testing, development, staging, production to avoid any duplication of migration data
  - use SQLite for development, testing
  - use MySQL for staging, production
  - setup workflow: when initial db, follow bellow steps
    * 0. set 'FLASK_ENV=development' or 'testing' to set target db to SQLite
    * 1. run 'flask db init' to create migration folder
    * 2. run 'flask db migrate' to detect new change
    * 3. run 'testing-dev-db-setup.sh' to create db and seed initial data for testing and development
  - update workflow: when update db schema, follow bellow steps
    * 1. run 'flask db migrate' (create new version file to detect any update)
      * 1.1. need to modify version file (e.g., removing unnecessary code)
        * NOTE: migration tool detect unchange code (I don't know why) so need to remove manually (esp 'created_date' & 'update_date')
    * 2. run 'update-migration.sh' for updating testing and development sqlite database (internally just upgrade database)
  - staging & production db
    - entrypoint.sh for each env handle 'upgrade' and seed initial data to each db
    
  * IMPORTANT NOTE
    - need to use SQLite context script to create db schema and insert data to MySQL. there are errors because of different context
      * 1. add 'render_as_batch=True,' to 'env.py': since SQLite does not support 'alter' statement 
      * 2. modify '(CURRENT_TIMESTAMP)' to 'CURRENT_TIMESTAMP': typical error when creating MySQL with SQLite Context script

### Deployment (Setup Staging & Production Server)
  - use GCP Compute Engine.
  - use startup script to automate initial config at server as much as possible
  - steps)
    1. use 'instance template' to avoid config Compute Enging from scratch
      * 1.1. you can set startup script, type of server, os type, and so on
    2. after create the isntance, 
      * 2.1. firewall & DNS setting
        * 2.1.1. create 'network tag' at Edit of vm instance
        * 2.1.2. setup firewall rules (open port 80, 443)
        * 2.1.3. setup DNS (use network tag to specify the isntance)
      * 2.2. SSL (letsEncrypt with Docker config)
        * get ssl certificate first for each domains/subdomains and setup project
        * 2.2.1. necessary files
          * 2.2.1.1. docker-compose.<env_name>.ssl.yml (dir: app)
          * 2.2.1.2. nginx default.conf (dir: app/data/nginx)
          * 2.2.1.3. initial-letsencrypt.sh (dir: app) - startup script for docker-letsencrypt stuff
        * 2.2.2. steps
          * 2.2.2.1 can use template file (from [reference](https://medium.com/@pentacent/nginx-and-lets-encrypt-with-docker-in-less-than-5-minutes-b4b8a60d3a71))
          * 2.2.2.2. replace 'example.org' with your domain and subdomain at 'initial-letsencrypt', 'default.conf', docker-compsoe.<env_name>.ssl.yml
          * 2.2.2.3. run initial-letsencrypt script
            * there are several ways to get certificate such as single certificate with multiple domain/subdomain or certificate for each domain/subdomain. check my [gist](https://gist.github.com/stsiwo/13a55cb8abab8517b2f8f78cf6167aae)
          * 2.2.2.4 make sure your setup is correct at [ssl server test labs](https://www.ssllabs.com/ssltest/)
      * 2.3. Setup App
        * 2.3.1: project env vars
          * 2.3.1.1 create 'docker-compose.<env_name>.secrets' to store and setup sensitive info
      * 2.4. Backupper Setup:
        * get backup data & log from each docker service and send to GCS (Cloud Storage) 
        * maybe this can be automate; include startup script
        * 2.4.1: preparation
          * 2.4.1.1: add scope of full control to GCS to your instance; enable to read/write gcs from your instance
          * 2.4.1.2: use Nearline Storage for backup and (set Lifecycle Management to send to Archive Storage... im thinking for now)
        
### GCP Compute Engine Template for Staging/Production Server
  
  1. add metadata
      1. 'enable-oslogin': TRUE
  2. add startup script
  3. API scope
      1. full scope for GCS

### Bump Up Version
  - support major/minor/patch version:
    * major: imcompatible change
    * minor: backward compatible change
    * patch: hotfix at master branch
  - use command: /bin/bash ./bump-version.sh \[-option\]
    - options:
      - increment major version: -m
      - increment minor version: -i
      - increment patch version: -p
  - run above command when:
    - before finishing release branch to increment major/minor version and commit
    - after hotfix to increment patch version
    
### Dummy SMTP/POP3 Server
  - use Mailtrap for staging environment
  - NOTE
    * (smtp) use TLS (not SSL)
    * (pop3 & javax.mail) emailSession.getStore("pop3"); // not "pop3s"
   
### NOTE
  - staging server/production server use different nginx config due to ssl config
    - make sure to match with local nginx config manually
     

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
      
  - 'debug' npm library
    - so buggy, esp using with webpack. 
      - even if set DEBUG env var, still not show logging in console.
      - maybe webpack cache is involving in this some way?
      - switch to console.log with env condition
  
  - React
    - don't mutate 'currentXXX' of useState. this cause hard-to-detect bugs
      ex)
        don't do this!!
        code)
          currentState[prop] = new-value
          setState({
            ...currentState
          })
        ==> when I use 'usePrevious' hook, it always product the same as the current state because of this above code!!!
        DON'T DO ABOVE CODE!!!!

### TODO
  - reivew deployment 
    - ideally don't ssh to vm and use ci/cd to deploy everything
  - alternative for incrontab
    - does gcp provide the nice feature to trigger bash script when upload file?
  - switch to aws
    - gcp will shut down at 2023???????
  - update-docker-compose sh does not work when deploy same version + latest
    - docker-compsoe can't recognize the different content of the same image namge with latest
    - ?? sometimes works correctly
