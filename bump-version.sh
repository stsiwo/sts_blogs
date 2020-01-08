#!/bin/bash

# update version 
# -m: increment major version
# -i: increment minor version
# -p: increment patch version

versionfile=./version.txt
currentversion=`cat $versionfile`
arr=(${currentversion//./ })

# "m:" -> ':' - option has arguments (e.g., -m major)
# "m" -> w/o ":" - only option (e.g., -m)
while getopts "mip" option; do
  case $option in
    m ) 
      (( arr[0]++ ))
      # don't put any space between = (e.g., arr[0] = 0) -> cause errors
      arr[1]=0
      arr[2]=0
    ;;
    i ) 
      (( arr[1]++ ))
      arr[2]=0
    ;;
    p ) 
      (( arr[2]++ ))
    ;;
  esac
done

nextversion=$( IFS=$'.'; echo "${arr[*]}" )

echo ${nextversion} > $versionfile 
