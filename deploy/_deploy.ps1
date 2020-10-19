$filename = Get-Date -UFormat '+%Y%m%d%H%M%S'
$filename = 'ap-web_' + $filename
$stage_deploy_path = "staging-folder"
$prod_deploy_path = "production-folder"
$server_archive_path = "C:\my-shared-folder"
$server_share_path = "\\my-server\share\"
Compress-Archive '.\ap-web\build\*' ".\$($filename).zip" -CompressionLevel Optimal
'Expand-Archive -Force -Path "'+$filename+'.zip"  -DestinationPath "'+$stage_deploy_pat+'"' | Out-File -encoding utf8 -FilePath ".\$($filename)_stage.ps1" -NoClobber
'Expand-Archive -Force -Path "'+$filename+'.zip"  -DestinationPath "'+$prod_deploy_path+'"' | Out-File -encoding utf8 -FilePath ".\$($filename)_prod.ps1" -NoClobber
Remove-Item ".\_deploy_latest_prod.bat"
'F:' +"`r`n" + 'cd '+ $server_archive_path +"`r`n" + 'PowerShell -NoProfile -ExecutionPolicy Bypass -Command "& ''./'+$filename+'_prod.ps1''"' +"`r`n" | Out-File -encoding ascii -FilePath ".\_deploy_latest_prod.bat" -NoClobber
Remove-Item ".\_deploy_latest_stage.bat"
'F:' +"`r`n" + 'cd '+ $server_archive_path  +"`r`n" + 'PowerShell -NoProfile -ExecutionPolicy Bypass -Command "& ''./'+$filename+'_stage.ps1''"' +"`r`n" | Out-File -encoding ascii -FilePath ".\_deploy_latest_stage.bat" -NoClobber

Copy-Item "$($filename)*" -Destination "$($server_share_path)"
Copy-Item "_deploy_latest_prod.bat" -Destination "$($server_share_path)" -Force
Copy-Item "_deploy_latest_stage.bat" -Destination "$($server_share_path)" -Force