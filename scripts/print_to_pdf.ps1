Param(
  [string]$HtmlPath,
  [string]$PdfPath
)
$ErrorActionPreference = 'Stop'
$candidates = @(
  'C:\Program Files\Microsoft\Edge\Application\msedge.exe',
  'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
  'msedge',
  'C:\Program Files\Google\Chrome\Application\chrome.exe',
  'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe'
)
$made = $false
foreach ($c in $candidates) {
  try {
    $cmd = Get-Command $c -ErrorAction SilentlyContinue
    if ($cmd) {
      & $cmd.Source --headless --disable-gpu --print-to-pdf="$PdfPath" "$HtmlPath"
      if (Test-Path $PdfPath) {
        Write-Output "PDF created: $PdfPath using: $($cmd.Source)"
        $made = $true
        break
      }
    }
  } catch { }
}
if (-not $made) {
  Write-Output "No headless-capable browser found. Open the HTML and Save as PDF."
  exit 1
}
