<?php
header("Content-Type: application/xml; charset=utf-8");

$baseUrl = "https://tradeconvert.pro/blog";
$blogDir = __DIR__ . DIRECTORY_SEPARATOR . 'blog';
$urls = [];

// Helper function to recursively find directories with index.html in the blog folder
function scanBlogDirectory($dir, $relPath = '') {
    global $baseUrl, $urls;
    
    if (!is_dir($dir)) return;

    $items = scandir($dir);
    foreach ($items as $item) {
        if ($item === '.' || $item === '..') continue;
        
        $fullPath = $dir . DIRECTORY_SEPARATOR . $item;
        $currentRelPath = $relPath ? $relPath . '/' . $item : $item;
        
        if (is_dir($fullPath)) {
            // Check if directory has index.html
            $indexPath = $fullPath . DIRECTORY_SEPARATOR . 'index.html';
            if (file_exists($indexPath)) {
                $lastmod = date("Y-m-d", filemtime($indexPath));
                
                $urls[] = [
                    'loc' => $baseUrl . '/' . $currentRelPath . '/',
                    'lastmod' => $lastmod,
                    'changefreq' => 'monthly',
                    'priority' => '0.8'
                ];
            }
            
            // Recursive scan
            scanBlogDirectory($fullPath, $currentRelPath);
        }
    }
}

// Add the root blog index.html
$rootIndex = $blogDir . DIRECTORY_SEPARATOR . 'index.html';
if (file_exists($rootIndex)) {
    $urls[] = [
        'loc' => $baseUrl . '/',
        'lastmod' => date("Y-m-d", filemtime($rootIndex)),
        'changefreq' => 'weekly',
        'priority' => '0.9'
    ];
}

// Scan blog subdirectories
scanBlogDirectory($blogDir);

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
