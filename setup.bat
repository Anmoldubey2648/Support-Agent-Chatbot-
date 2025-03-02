@echo off
echo Setting up CDP Chatbot...

:: Create desktop shortcut
cscript create_shortcut.vbs //Nologo

echo Setup complete! You can now:
echo 1. Double-click the "CDP Chatbot" shortcut on your desktop
echo 2. Or run start_chatbot.bat directly from this folder
echo.
echo Press any key to exit...
pause >nul 