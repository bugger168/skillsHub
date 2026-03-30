@echo off
echo Checking SkillsHub API Server...
echo.
curl -s http://localhost:3000/health
echo.
echo.
curl -s http://localhost:3000/api/skills
echo.
pause