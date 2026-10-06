cmdc@echo off

echo ============================================
echo Environment Setup - Playwright + OpenCart
echo ============================================

echo [1/7] Installing test data, environment variables, date/time handling...
call npm install @faker-js/faker luxon dotenv
if errorlevel 1 goto :error

echo [2/7] Installing API / Data validation...
call npm install ajv csv-parse xlsx
if errorlevel 1 goto :error

echo [3/7] Installing Accessibility Testing (WCAG)...
call npm install @axe-core/playwright
if errorlevel 1 goto :error

echo [4/7] Installing Allure Reporting...
call npm install allure-playwright
if errorlevel 1 goto :error

echo [5/7] Installing Node.js TypeScript Types...
call npm install -D @types/node
if errorlevel 1 goto :error

echo [6/7] Installing Playwright Browsers...
call npx playwright install
if errorlevel 1 goto :error

echo [7/7] Installing MySQL Database Connectivity...
call npm install mysql2
if errorlevel 1 goto :error

echo ============================================
echo Environment Setup Completed Successfully!
echo ============================================
goto :end

:error
echo ============================================
echo ERROR: Installation failed!
echo ============================================
exit /b 1

:end
pause