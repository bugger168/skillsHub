@echo off
echo ========================================
echo  SkillsHub Skills Finder
echo ========================================
echo.

REM 设置环境变量
set SKILLS_API_URL=http://localhost:3000

REM 检查服务是否运行
curl -s http://localhost:3000/health >nul 2>&1
if errorlevel 1 (
    echo [!] 服务未启动，正在启动...
    cd /d "%~dp0"
    start /b node server.js
    timeout /t 2 >nul
    echo [OK] 服务已启动
    echo.
)

echo API: http://localhost:3000
echo.
echo 使用方法:
echo   npx skills find python
echo   npx skills find code
echo   npx skills find debug
echo.
echo ========================================
echo.

REM 进入交互模式
cmd /k "set SKILLS_API_URL=http://localhost:3000"