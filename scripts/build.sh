#!/bin/bash
# Build script for pre-rendered static site
# This script runs all necessary build steps in order

set -e # Exit on error

echo "🏗️  Building client bundle..."
npm run build:client

echo "🔧 Building server bundle..."
npm run build:server

echo "🎨 Pre-rendering static pages..."
npm run prerender

echo "✅ Build complete! Static files ready in dist/"
