# Docker Project Template with Multi-Env

## Tasks
  - optimistic locking

### API1
  - docker build --tag=api1:dev --target=development .
  - docker run --name=api1-dev -v ${PWD}:/app -p 80:5000 -e ${PWD}/.env api1:dev
  
### SPA
  - change query string format for array 
    -> from: tags=1,2,3,4,5 to: tags=1&tags=2&tags=3&...
  - useCallback hook instead of nornal function when assign function to component
    -> this is because every time component updates, those function is re-created if don't use useCallback
    -> so this could be performance issue.
  - should save blog every time user changes (not clicking 'save' button)
  - create 'publish' button
