echo "Storing puppeteer executable in cache"
mkdir -p ./.cache
if [ -d "/app/.cache/puppeteer" ]; then
  mv /app/.cache/puppeteer ./.cache
else
  echo "Puppeteer cache not found in expected location"
fi