#!/usr/bin/env bash

set -x

if [[ $APPCENTER_BRANCH = 'master' ]];
then
  echo “Switching to PRODUCTION environment”  
  rm -f $APPCENTER_SOURCE_DIRECTORY/config/index.js
  rm -f $APPCENTER_SOURCE_DIRECTORY/src/env/vars
  cp -v $APPCENTER_SOURCE_DIRECTORY/config-vars/prod/index.js $APPCENTER_SOURCE_DIRECTORY/config
  cp -v $APPCENTER_SOURCE_DIRECTORY/env/prod/vars.js $APPCENTER_SOURCE_DIRECTORY/src/env
  echo "Done"
else
  echo “Using development config”
  echo $APPCENTER_BRANCH
fi
