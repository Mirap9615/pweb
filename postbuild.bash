#!/bin/bash

echo "Starting postbuild script"
echo "Current directory: $(pwd)"

echo "Installing dependencies..."
export PUPPETEER_SKIP_DOWNLOAD="true"
npm install

echo "DEBUG: Running npm run build manually..."
npm run build || echo "ERROR: Build failed!"

echo "Listing dist/ directory after build:"
ls -la dist
echo "Listing dist/assets/ directory after build:"
ls -la dist/assets

echo "Listing /app directory:"
ls -la /app
echo "Listing /app/.cache directory:"
ls -la /app/.cache

echo "Storing Puppeteer executable in cache"
mkdir -p ./.cache
if [ -d "/app/.cache/puppeteer" ]; then
  echo "Found Puppeteer cache, moving it"
  mv /app/.cache/puppeteer ./.cache
  echo "Listing ./.cache directory after move:"
  ls -la ./.cache
else
  echo "Puppeteer cache not found in expected location"
  echo "Listing /app/.cache/puppeteer directory:"
  ls -la /app/.cache/puppeteer || echo "Directory does not exist"
fi

echo "Postbuild script completed successfully"