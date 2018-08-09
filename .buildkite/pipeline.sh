#!/bin/bash

cat << EOM
steps:
  - name: ":cucumber: snyk test"
    command: scripts/buildkite-deploy-pr.sh
    agents:
      queue: keno-web-auto
EOM
fi
