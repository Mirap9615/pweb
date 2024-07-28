#!/bin/bash
echo "Starting postbuild script"
echo "Current directory: $(pwd)"
echo "Listing /app directory:"
ls -la /app
echo "Listing /app/.cache directory:"
ls -la /app/.cache
echo "Storing puppeteer executable in cache"
mkdir -p ./.cache
if [ -d "/app/.cache/puppeteer" ]; then
  echo "Found Puppeteer cache, moving it"
  mv /app/.cache/puppeteer ./.cache
  echo "Listing ./.cache directory after move:"
  ls -la ./.cache
else
  echo "Puppeteer cache not found in expected location"
  echo "Listing /app/.cache/puppeteer directory:"
  ls -la /app/.cache/puppeteer
fi
echo "Postbuild script completed"