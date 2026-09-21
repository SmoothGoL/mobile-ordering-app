#!/bin/bash
set -e

SOURCE="./public/"
DEST="/opt/homebrew/var/www/mobile-ordering-app/"

echo "Syncing changes..."
rsync -avc --delete "$SOURCE" "$DEST"
echo "Deployment complete!"