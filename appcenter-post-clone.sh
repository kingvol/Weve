#!/usr/bin/env bash

set -x

if [[ $APPCENTER_BRANCH = 'master' ]];
then
  echo “Switching to PRODUCTION environment”  
  rm -f $APPCENTER_SOURCE_DIRECTORY/config/index.js
  cp -v $APPCENTER_SOURCE_DIRECTORY/config-vars/index.js $APPCENTER_SOURCE_DIRECTORY/config
  echo "Done"
else
  echo “Using development config”
  echo $APPCENTER_BRANCH
fi
