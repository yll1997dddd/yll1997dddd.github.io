call pnpm docs:build
cd docs/.vitepress/dist

git init
git add -A
git commit -m "auto construct blog"

git push -f https://github.com/yll1997dddd/yll1997dddd.github.io.git master:gh-pages