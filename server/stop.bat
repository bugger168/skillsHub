@echo off
echo Stopping SkillsHub API Server...
taskkill /f /im node.exe 2>nul
echo Server stopped.
pause