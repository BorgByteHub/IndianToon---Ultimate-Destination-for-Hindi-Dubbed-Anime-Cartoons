$files = Get-ChildItem -Path . -Recurse -Filter "*.html" -File

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    $newContent = $content -replace "../../cdnjs.cloudflare.com", "https://cdnjs.cloudflare.com"
    
    if ($content -ne $newContent) {
        Set-Content -Path $file.FullName -Value $newContent
        Write-Host "Updated: $($file.FullName)"
    }
}

Write-Host "Font Awesome links have been updated in all HTML files."
