@echo off
echo Starting CDP Chatbot...

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    echo Press any key to open the download page...
    pause >nul
    start https://nodejs.org/
    exit
)

:: Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

:: Start the server
start cmd /k "npm start"

:: Wait for server to start
timeout /t 3 /nobreak >nul

:: Open the application in default browser
start http://localhost:3000

echo Chatbot is running!
echo You can close this window when you're done using the chatbot. 