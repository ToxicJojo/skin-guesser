#!/bin/bash

# abort on errors
set -e

npm run build:champion-data
npm run build

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:ToxicJojo/league-skin-guesser.git master:gh-pages

cd ..
