#!/bin/bash

# Define the target destination
TARGET_DIR="$HOME/Downloads/mobile-ordering-app"

# Remove target directory if it exists
rm -fr "$TARGET_DIR"

# Create the target directory
mkdir "$TARGET_DIR"

# Copy files while preserving structure and applying exclusions
# The -a flag preserves permissions and structure, -v provides verbose output
rsync -av \
  --exclude='/node_modules' \
  --exclude='/copy.sh' \
  --exclude='/.git' \
  --exclude='/src/assets/fonts' \
  --exclude='/server.js' \
  --exclude='/Dockerfile' \
  --exclude='/vite.config.js' \
  --exclude='/README.md' \
  --exclude='/build.sh' \
  --exclude='/.gitignore' \
  --exclude='/package-lock.json' \
  --exclude='/.gitattributes' \
  --exclude='/ecosystem.config.cjs' \
  --exclude='/docker-compose.yml' \
  --exclude='/eslint.config.js' \
  --exclude='/src/assets/images' \
  --exclude='.DS_Store' \
  --exclude='/src/index.css' \
  . "$TARGET_DIR"

echo "Copy completed to $TARGET_DIR"
