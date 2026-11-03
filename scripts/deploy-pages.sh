#!/usr/bin/env bash
# Construit le site en export statique et le publie sur la branche gh-pages (GitHub Pages).
# Usage : npm run deploy:pages
set -euo pipefail
cd "$(dirname "$0")/.."
ROOT="$(pwd)"

REMOTE="$(git remote get-url origin)"
HOLD="$(mktemp -d)"
ROUTES=(robots.ts sitemap.ts opengraph-image.tsx)

restore() {
  for f in "${ROUTES[@]}"; do
    [ -f "$HOLD/$f" ] && mv "$HOLD/$f" "$ROOT/app/$f"
  done
}
trap restore EXIT

# Routes dynamiques incompatibles avec l’export statique : retirées le temps du build.
for f in "${ROUTES[@]}"; do mv "app/$f" "$HOLD/$f"; done

rm -rf out
GITHUB_PAGES=true NEXT_PUBLIC_SITE_URL=https://okira-coder.github.io/portofolio npx next build
touch out/.nojekyll

PUBLISH="$(mktemp -d)"
cp -R out/. "$PUBLISH"
cd "$PUBLISH"
git init -q -b gh-pages
git add -A
git commit -q -m "Déploiement du site"
git push -f "$REMOTE" gh-pages
echo "Publié : https://okira-coder.github.io/portofolio/"
