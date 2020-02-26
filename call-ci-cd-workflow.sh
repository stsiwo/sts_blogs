#!/bin/bash

workflow="$1" # type of workflow to be run
release_workflow="release"
master_from_release_workflow="master-release"
master_from_hotfix_workflow="master-hotfix"
available_workflows=("$release_workflow" "$master_from_release_workflow" "$master_from_hotfix_workflow")
release_workflow_name="run_release_workflow"
master_from_release_workflow_name="run_master_from_release_workflow"
master_from_hotfix_workflow_name="run_master_from_hotfix_workflow"
api_endpoint="https://circleci.com/api/v2/project/gh/stsiwo/sts_blogs/pipeline"


# check parameter is valid
if [[ " ${available_workflows[*]} " != *" $workflow "* ]]; then
  echo "unsupported workflow. please select one from 'release', 'master-release', or 'master-hotfix'" 
  exit 125
fi

# check api token is set to CIRCLECI_API_TOKEN env variable
if [ -z "$CIRCLECI_API_TOKEN"  ]; then
  echo "env variable: CIRCLECI_API_TOKEN is unset or empty. please set proper api token before run this command."
  exit 125
fi

# pick proper workflow name from workflow parameter from user
if [ "$workflow" == "$release_workflow" ]; then target_workflow="$release_workflow_name" 
elif [ "$workflow" == "$master_from_release_workflow" ]; then target_workflow="$master_from_release_workflow_name"
elif [ "$workflow" == "$master_from_hotfix_workflow" ]; then target_workflow="$master_from_hotfix_workflow_name"
fi

# prepare json body for request
# JSON syntax: property name must be enclosed with DOUBLE QUOTES (NOT SINGLE QUOTES)
body=$(cat <<EOF
  { "parameters": { "$target_workflow": true }}
EOF
)

# curl request for triggering workflow to circleci api
curl -X POST  $api_endpoint \
  -H "Circle-Token: $CIRCLECI_API_TOKEN" \
  -H 'Content-Type: application/json' -H 'Accept: application/json' \
  -d "$body" 
