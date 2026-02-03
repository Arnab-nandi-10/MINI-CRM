$env:ComSpec = "C:\Windows\System32\cmd.exe"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $scriptDir

$serverCmd = "`$env:ComSpec='C:\Windows\System32\cmd.exe'; Set-Location '$projectRoot\server'; npm start"
$clientCmd = "`$env:ComSpec='C:\Windows\System32\cmd.exe'; Set-Location '$projectRoot\client'; npm start"

Start-Process powershell -ArgumentList "-NoExit", "-Command", $serverCmd
Start-Process powershell -ArgumentList "-NoExit", "-Command", $clientCmd
