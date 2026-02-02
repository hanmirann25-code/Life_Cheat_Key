@echo off
echo --- GIT STATUS ---
git status
echo --- GIT LOG ---
git log -n 5 --oneline
echo --- GIT REMOTE ---
git remote -v
