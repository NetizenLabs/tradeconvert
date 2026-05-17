<?php
header("Content-Type: application/xml; charset=utf-8");

$baseUrl = "https://tradeconvert.pro";
$excludeDirs = [".git", "assets", "css", "js", "scratch", "tools"];
$urls = [];

// Helper function to recursively find directories with index.html or standalone html files
function scanDirectory($dir, $relPath = '') {
    global $excludeDirs, $baseUrl, $urls;
    
    $items = scandir($dir);
    foreach ($items as $item) {
        if ($item === '.' || $item === '..') continue;
        
        $fullPath = $dir . DIRECTORY_SEPARATOR . $item;
        $currentRelPath = $relPath ? $relPath . '/' . $item : $item;
        
        if (is_dir($fullPath)) {
            if (in_array($item, $excludeDirs)) continue;
            
            // Check if directory has index.html
            $indexPath = $fullPath . DIRECTORY_SEPARATOR . 'index.html';
            if (file_exists($indexPath)) {
                $lastmod = date("Y-m-d", filemtime($indexPath));
                
                // Determine priority
                $priority = "0.8";
                $changefreq = "monthly";
                
                if ($currentRelPath === 'blog') {
                    $priority = "0.8";
                    $changefreq = "weekly";
                } elseif (strpos($currentRelPath, 'blog/') === 0) {
                    $priority = "0.8";
                    $changefreq = "monthly";
                } elseif (in_array($currentRelPath, ['about', 'contact'])) {
                    $priority = "0.5";
                    $changefreq = "yearly";
                } elseif ($currentRelPath === 'privacy') {
                    $priority = "0.3";
                    $changefreq = "yearly";
                } else {
                    $priority = "0.9";
                }
                
                $urls[] = [
                    'loc' => $baseUrl . '/' . $currentRelPath . '/',
                    'lastmod' => $lastmod,
                    'changefreq' => $changefreq,
                    'priority' => $priority
                ];
            }
            
            // Recursive scan
            scanDirectory($fullPath, $currentRelPath);
        }
    }
}

// Add the root index.html
$rootIndex = __DIR__ . DIRECTORY_SEPARATOR . 'index.html';
if (file_exists($rootIndex)) {
    $urls[] = [
        'loc' => $baseUrl . '/',
        'lastmod' => date("Y-m-d", filemtime($rootIndex)),
        'changefreq' => 'weekly',
        'priority' => '1.0'
    ];
}

// Scan subdirectories
scanDirectory(__DIR__);

// Print XML sitemap
echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

foreach ($urls as $url) {
    echo "  <url>\n";
    echo "    <loc>" . htmlspecialchars($url['loc']) . "</loc>\n";
    echo "    <lastmod>" . $url['lastmod'] . "</lastmod>\n";
    echo "    <changefreq>" . $url['changefreq'] . "</changefreq>\n";
    echo "    <priority>" . $url['priority'] . "</priority>\n";
    echo "  </url>\n";
}

echo '</urlset>';
