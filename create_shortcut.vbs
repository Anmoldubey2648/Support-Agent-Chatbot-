Set oWS = WScript.CreateObject("WScript.Shell")
sLinkFile = oWS.ExpandEnvironmentStrings("%USERPROFILE%") & "\Desktop\CDP Chatbot.lnk"
Set oLink = oWS.CreateShortcut(sLinkFile)
oLink.TargetPath = oWS.CurrentDirectory & "\start_chatbot.bat"
oLink.IconLocation = "%SystemRoot%\System32\SHELL32.dll,44"
oLink.Description = "CDP Chatbot"
oLink.WorkingDirectory = oWS.CurrentDirectory
oLink.Save 