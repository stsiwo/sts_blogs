#!/bin/bash

# set current version to env var
# caveats
#  - use source command

versionfile=./version.txt
currentversion=`cat $versionfile`
export APP_VERSION=$currentversion 

