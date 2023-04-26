#!/bin/bash

pnpm --filter '@fancee/*' -r build
pnpm --filter '@fancee/*' -r publish --access restricted --no-git-checks
