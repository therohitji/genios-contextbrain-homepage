#!/bin/bash
set -e

REPO_ROOT="$(git rev-parse --show-toplevel)"

echo "==> Building..."
cd "$REPO_ROOT"
bun run build

echo "==> Switching to dist branch..."
git checkout dist

echo "==> Cleaning old tracked files..."
git rm -rf . --quiet

echo "==> Copying fresh build..."
cp -r "$REPO_ROOT/dist/." .

echo "==> Writing .htaccess..."
cat > .htaccess << 'EOF'
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [QSA,L]
EOF

echo "==> Staging all files..."
git add -A

echo "==> Committing..."
git commit -m "deploy: $(date '+%Y-%m-%d %H:%M')"

echo "==> Pushing to GitHub..."
git push upstream dist

echo "==> Back to main..."
git checkout main

echo ""
echo "✓ Done. Go to Hostinger → GIT → Deploy."
