@echo off
cd /d "%~dp0"
echo Starting SkillsHub API Server...
start /b node server.js
timeout /t 2 >nul
echo.
echo Server running at http://localhost:3000
echo.
echo Usage:
echo   set SKILLS_API_URL=http://localhost:3000
echo   npx skills find python
echo.
pause