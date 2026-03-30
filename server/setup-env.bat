@echo off
echo ========================================
echo  设置 SkillsHub 环境变量
echo ========================================
echo.

setx SKILLS_API_URL "http://localhost:3000"

echo.
echo ✅ 环境变量已设置!
echo.
echo 请关闭当前终端并重新打开，然后运行:
echo   npx skills find python
echo.
pause