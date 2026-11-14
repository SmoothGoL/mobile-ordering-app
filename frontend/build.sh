#!/usr/bin/env bash
set -e

# Get the short Git commit SHA
COMMIT_SHA=$(git rev-parse --short HEAD)

echo "Building and pushing mobile-ordering-app:${COMMIT_SHA}..."

# Build and push the multi-arch image
docker buildx build --platform linux/amd64,linux/arm64 \
  -t smoothgol/mobile-ordering-app:${COMMIT_SHA} \
  -t smoothgol/mobile-ordering-app:latest \
  --push .

echo "Successfully built and pushed version ${COMMIT_SHA}!"
