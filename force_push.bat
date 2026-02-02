@echo off
echo --- ADDING ---
git add .
echo --- COMMITTING ---
git commit -m "feat: SEO optimization complete and force push" --allow-empty
echo --- PUSHING ---
git push origin main --force
echo --- PUSH COMPLETE ---
