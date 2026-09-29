try {
    $ppt = New-Object -ComObject PowerPoint.Application
    $pres = $ppt.Presentations.Open("C:\Users\shree\Downloads\PathPilot_AI_HackMatrix5_Submission.pptx", 1, 0, 0)
    $exportDir = "C:\Users\shree\.gemini\antigravity-ide\scratch\pathpilot-ai\slide_previews"
    if (-not (Test-Path $exportDir)) {
        New-Item -ItemType Directory -Path $exportDir -Force | Out-Null
    }
    $pres.SaveAs($exportDir, 17)
    $pres.Close()
    $ppt.Quit()
    [System.Runtime.Interopservices.Marshal]::ReleaseComObject($ppt) | Out-Null
    Write-Output "PowerPoint slides exported to PNG successfully!"
} catch {
    Write-Output "PowerPoint COM error: $($_.Exception.Message)"
}
