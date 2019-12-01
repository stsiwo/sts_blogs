# Docker Project Template with Multi-Env

### API1
  - docker build --tag=api1:dev --target=development .
  - docker run --name=api1-dev -v ${PWD}:/app -p 80:5000 -e ${PWD}/.env api1:dev
