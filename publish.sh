#!/bin/bash

pnpm build
pnpm --filter "@fancee/*" -r publish --access restricted --no-git-checks
