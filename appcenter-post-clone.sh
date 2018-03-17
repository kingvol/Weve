#!/usr/bin/env bash

set -x

if [[ process.env.NODE_ENV === "production" ]];
then
  echo “Switching to PRODUCTION environment”
  echo process.env.NODE_ENV