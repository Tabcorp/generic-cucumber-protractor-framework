#!/bin/sh
set -e
. /var/lib/buildkite-agent/.bash_profile

echo "current node"
echo node -v

echo "Use node LTS/Boron 6.12.3 version"
nvm install 6.12.3
nvm use 6.12.3

echo "run npm install"
npm install

echo "run synk test"
npm install -g snyk
snyk test