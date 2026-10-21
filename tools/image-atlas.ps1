param(
    [Parameter(Mandatory = $true)]
    [string]$Folder,

    [string]$NameContains = '',
    [string]$OutputRoot = '',
    [int]$PreviewLongEdge = 1600,
    [int]$Columns = 3,
    [int]$Rows = 3,
    [int]$CellWidth = 500,
    [int]$ImageHeight = 280
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$resolvedFolder = (Resolve-Path -LiteralPath $Folder).Path
if (-not (Test-Path -LiteralPath $resolvedFolder -PathType Container)) {
    throw "Image folder not found: $Folder"
}

if ([string]::IsNullOrWhiteSpace($OutputRoot)) {
    $sha = [System.Security.Cryptography.SHA256]::Create()
    try {
        $hashBytes = $sha.ComputeHash([Text.Encoding]::UTF8.GetBytes($resolvedFolder.ToLowerInvariant()))
    }
    finally {
        $sha.Dispose()
    }
    $folderKey = -join ($hashBytes[0..5] | ForEach-Object { $_.ToString('x2') })
    $OutputRoot = Join-Path $env:TEMP (Join-Path 'codex-image-atlas' $folderKey)
}

New-Item -ItemType Directory -Path $OutputRoot -Force | Out-Null

$previewDir = Join-Path $OutputRoot 'previews'
New-Item -ItemType Directory -Path $previewDir -Force | Out-Null

$supportedExtensions = @('.png', '.jpg', '.jpeg', '.webp', '.bmp', '.gif')
$images = Get-ChildItem -LiteralPath $resolvedFolder -File |
    Where-Object { $supportedExtensions -contains $_.Extension.ToLowerInvariant() } |
    Where-Object { [string]::IsNullOrWhiteSpace($NameContains) -or $_.Name.Contains($NameContains) } |
    Sort-Object @{
        Expression = {
            if ($_.BaseName -match '^(.*?)-(\d+)$') {
                '{0}|{1:D6}' -f $matches[1], [int]$matches[2]
            }
            else {
                '{0}|{1:D6}' -f $_.BaseName, 0
            }
        }
    }

if ($images.Count -eq 0) {
    throw "No matching images found in $resolvedFolder"
}

$records = @()
$index = 0

foreach ($file in $images) {
    $index++
    $id = 'IMG{0:D2}' -f $index
    $image = [System.Drawing.Image]::FromFile($file.FullName)
    try {
        $width = $image.Width
        $height = $image.Height
        $scale = [Math]::Min(1.0, $PreviewLongEdge / [Math]::Max($width, $height))
        $previewWidth = [Math]::Max(1, [int][Math]::Round($width * $scale))
        $previewHeight = [Math]::Max(1, [int][Math]::Round($height * $scale))

        $previewName = "$id-preview.png"
        $previewPath = Join-Path $previewDir $previewName
        $preview = New-Object System.Drawing.Bitmap($previewWidth, $previewHeight)
        try {
            $graphics = [System.Drawing.Graphics]::FromImage($preview)
            try {
                $graphics.Clear([System.Drawing.Color]::White)
                $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
                $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
                $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
                $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
                $graphics.DrawImage($image, 0, 0, $previewWidth, $previewHeight)
            }
            finally {
                $graphics.Dispose()
            }
            $preview.Save($previewPath, [System.Drawing.Imaging.ImageFormat]::Png)
        }
        finally {
            $preview.Dispose()
        }

        $records += [pscustomobject]@{
            Id = $id
            Name = $file.Name
            Path = $file.FullName
            Width = $width
            Height = $height
            Bytes = $file.Length
            Preview = $previewPath
        }
    }
    finally {
        $image.Dispose()
    }
}

$perSheet = [Math]::Max(1, $Columns * $Rows)
$sheetCount = [Math]::Ceiling($records.Count / $perSheet)
$sheetPaths = @()
$font = New-Object System.Drawing.Font('Microsoft YaHei', 11, [System.Drawing.FontStyle]::Regular)
$headerFont = New-Object System.Drawing.Font('Microsoft YaHei', 14, [System.Drawing.FontStyle]::Bold)
$textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(35, 55, 75))
$mutedBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(95, 110, 125))
$borderPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(205, 215, 225), 1)

try {
    for ($sheetIndex = 0; $sheetIndex -lt $sheetCount; $sheetIndex++) {
        $chunk = @($records | Select-Object -Skip ($sheetIndex * $perSheet) -First $perSheet)
        $rowCount = [Math]::Ceiling($chunk.Count / $Columns)
        $margin = 20
        $cellGap = 20
        $labelHeight = 34
        $rowHeight = $ImageHeight + $labelHeight + 20
        $sheetWidth = $margin * 2 + $Columns * $CellWidth + ($Columns - 1) * $cellGap
        $sheetHeight = $margin * 2 + 38 + $rowCount * $rowHeight
        $sheetPath = Join-Path $OutputRoot ('contact-{0:D2}.png' -f ($sheetIndex + 1))

        $bitmap = New-Object System.Drawing.Bitmap($sheetWidth, $sheetHeight)
        try {
            $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
            try {
                $graphics.Clear([System.Drawing.Color]::White)
                $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
                $graphics.DrawString(
                    ("图片索引 {0}/{1} · {2}" -f ($sheetIndex + 1), $sheetCount, $resolvedFolder),
                    $headerFont,
                    $textBrush,
                    $margin,
                    12
                )

                for ($cellIndex = 0; $cellIndex -lt $chunk.Count; $cellIndex++) {
                    $record = $chunk[$cellIndex]
                    $column = $cellIndex % $Columns
                    $row = [Math]::Floor($cellIndex / $Columns)
                    $cellX = $margin + $column * ($CellWidth + $cellGap)
                    $cellY = $margin + 38 + $row * $rowHeight
                    $imageBoxX = $cellX
                    $imageBoxY = $cellY
                    $imageBoxWidth = $CellWidth
                    $imageBoxHeight = $ImageHeight

                    $graphics.FillRectangle(
                        [System.Drawing.Brushes]::White,
                        $imageBoxX,
                        $imageBoxY,
                        $imageBoxWidth,
                        $imageBoxHeight
                    )
                    $graphics.DrawRectangle(
                        $borderPen,
                        $imageBoxX,
                        $imageBoxY,
                        $imageBoxWidth,
                        $imageBoxHeight
                    )

                    $preview = [System.Drawing.Image]::FromFile($record.Preview)
                    try {
                        $fitScale = [Math]::Min(
                            ($imageBoxWidth - 8) / $preview.Width,
                            ($imageBoxHeight - 8) / $preview.Height
                        )
                        $drawWidth = [Math]::Max(1, [int][Math]::Round($preview.Width * $fitScale))
                        $drawHeight = [Math]::Max(1, [int][Math]::Round($preview.Height * $fitScale))
                        $drawX = $imageBoxX + [int](($imageBoxWidth - $drawWidth) / 2)
                        $drawY = $imageBoxY + [int](($imageBoxHeight - $drawHeight) / 2)
                        $graphics.DrawImage($preview, $drawX, $drawY, $drawWidth, $drawHeight)
                    }
                    finally {
                        $preview.Dispose()
                    }

                    $label = "$($record.Id)  $($record.Name)"
                    if ($label.Length -gt 52) {
                        $label = $label.Substring(0, 49) + '...'
                    }
                    $graphics.DrawString($label, $font, $textBrush, $cellX, $imageBoxY + $imageBoxHeight + 6)
                    $graphics.DrawString(
                        ("{0} × {1} px" -f $record.Width, $record.Height),
                        $font,
                        $mutedBrush,
                        $cellX,
                        $imageBoxY + $imageBoxHeight + 34
                    )
                }
            }
            finally {
                $graphics.Dispose()
            }
            $bitmap.Save($sheetPath, [System.Drawing.Imaging.ImageFormat]::Png)
            $sheetPaths += $sheetPath
        }
        finally {
            $bitmap.Dispose()
        }
    }
}
finally {
    $font.Dispose()
    $headerFont.Dispose()
    $textBrush.Dispose()
    $mutedBrush.Dispose()
    $borderPen.Dispose()
}

$manifestPath = Join-Path $OutputRoot 'index.md'
$manifest = New-Object Text.StringBuilder
[void]$manifest.AppendLine('# 图片索引')
[void]$manifest.AppendLine()
[void]$manifest.AppendLine("- 来源目录：``$resolvedFolder``")
[void]$manifest.AppendLine("- 筛选条件：``$NameContains``")
[void]$manifest.AppendLine("- 图片数量：$($records.Count)")
[void]$manifest.AppendLine("- 预览缩放：长边不超过 $PreviewLongEdge px")
[void]$manifest.AppendLine()
[void]$manifest.AppendLine('| ID | 文件名 | 原始尺寸 | 原图 | 预览 |')
[void]$manifest.AppendLine('| --- | --- | --- | --- | --- |')
foreach ($record in $records) {
    $sizeKb = [Math]::Round($record.Bytes / 1KB, 1)
    [void]$manifest.AppendLine(
        "| $($record.Id) | $($record.Name) | $($record.Width) × $($record.Height) ($sizeKb KB) | ``$($record.Path)`` | ``$($record.Preview)`` |"
    )
}
[void]$manifest.AppendLine()
[void]$manifest.AppendLine('## 缩略总览')
[void]$manifest.AppendLine()
foreach ($sheetPath in $sheetPaths) {
    [void]$manifest.AppendLine("- ``$sheetPath``")
}
[IO.File]::WriteAllText($manifestPath, $manifest.ToString(), [System.Text.UTF8Encoding]::new($false))

[pscustomobject]@{
    ImageCount = $records.Count
    Manifest = $manifestPath
    ContactSheets = $sheetPaths -join [Environment]::NewLine
    PreviewDirectory = $previewDir
} | Format-List
