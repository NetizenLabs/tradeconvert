$payload = @{
    host = "tradeconvert.pro"
    key = "e805d2d098f04e6f9d18431a2f3329f1"
    keyLocation = "https://tradeconvert.pro/e805d2d098f04e6f9d18431a2f3329f1.txt"
    urlList = @(
        "https://tradeconvert.pro/",
        "https://tradeconvert.pro/about/",
        "https://tradeconvert.pro/blog/",
        "https://tradeconvert.pro/blog/board-feet-calculator-lumber-estimation-2026/",
        "https://tradeconvert.pro/blog/circuit-breaker-sizing-guide-2026/",
        "https://tradeconvert.pro/blog/concrete-calculator-2026/",
        "https://tradeconvert.pro/blog/concrete-psi-requirements-aci-318/",
        "https://tradeconvert.pro/blog/drywall-calculator-waste-factor-guide-2026/",
        "https://tradeconvert.pro/blog/excavation-volume-spoil-hauling-guide-2026/",
        "https://tradeconvert.pro/blog/lumber-dimensions-nominal-vs-actual/",
        "https://tradeconvert.pro/blog/pipe-size-water-flow-calculator-2026/",
        "https://tradeconvert.pro/blog/roofing-calculator-guide-2026/",
        "https://tradeconvert.pro/blog/roofing-material-calculator-guide-2026/",
        "https://tradeconvert.pro/blog/soil-swell-compaction-factors-guide/",
        "https://tradeconvert.pro/blog/stair-stringer-calculator-building-code-2026/",
        "https://tradeconvert.pro/blog/voltage-drop-calculation-nec/",
        "https://tradeconvert.pro/blog/voltage-drop-calculator-guide-2026/",
        "https://tradeconvert.pro/blog/what-water-pressure-is-too-high/",
        "https://tradeconvert.pro/concrete/",
        "https://tradeconvert.pro/conduit-fill/",
        "https://tradeconvert.pro/contact/",
        "https://tradeconvert.pro/drywall/",
        "https://tradeconvert.pro/electrical/",
        "https://tradeconvert.pro/excavation/",
        "https://tradeconvert.pro/length/",
        "https://tradeconvert.pro/lumber/",
        "https://tradeconvert.pro/paint/",
        "https://tradeconvert.pro/pressure/",
        "https://tradeconvert.pro/privacy/",
        "https://tradeconvert.pro/roofing/",
        "https://tradeconvert.pro/stair/",
        "https://tradeconvert.pro/temperature/",
        "https://tradeconvert.pro/tile/",
        "https://tradeconvert.pro/torque/",
        "https://tradeconvert.pro/voltage-drop/",
        "https://tradeconvert.pro/volume/",
        "https://tradeconvert.pro/weight/"
    )
} | ConvertTo-Json -Depth 5

Write-Output "Sending IndexNow submission payload to bing.com..."
try {
    $response = Invoke-RestMethod -Uri "https://www.bing.com/indexnow" -Method Post -ContentType "application/json; charset=utf-8" -Body $payload
    Write-Output "IndexNow submission to Bing succeeded! Response: $response"
} catch {
    Write-Output "IndexNow to Bing failed: $_"
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $body = $reader.ReadToEnd()
        Write-Output "Error body: $body"
    }
}
