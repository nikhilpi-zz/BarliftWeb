#!/bin/bash
# use predefined variables to access passed arguments
#echo arguments to the shell
grunt build
git add -A
git commit -m $1
git push origin master
git push heroku master