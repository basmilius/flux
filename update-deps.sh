#!/usr/bin/env zsh

bun update --cwd docs --latest
bun update --cwd packages/components --latest
bun update --cwd packages/dashboard --latest
bun update --cwd packages/internals --latest
bun update --cwd packages/types --latest
