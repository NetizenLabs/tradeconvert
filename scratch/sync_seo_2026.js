const fs = require('fs');
const path = require('path');

const rootDir = 'c:/xampp/htdocs/webtoolkit-pro/tradeconvert';

const ogTagsTemplate = `
  <!-- Open Graph / SEO 2026 -->
  <meta property="og:title" content="TradeConvert 2026 — Professional Trade Reference">
  <meta property="og:description" content="Know exactly what you're owed and calculate trade units with precision. Verified for 2026.">
  <meta property="og:image" content="/assets/og-image.png">
  <meta property="og:url" content="https://tradeconvert.pro/">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="/assets/og-image.png">
`;

function processFiles(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            if (file !== '.git' && file !== 'node_modules' && file !== 'assets' && file !== 'css' && file !== 'js') {
                processFiles(filePath);
            }
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // 1. Inject OG tags if missing
            if (!content.includes('og:image')) {
                content = content.replace(/<\/title>/i, '</title>\n' + ogTagsTemplate);
            }
            
            // 2. Ensure year is 2026 (backup for previous script)
            content = content.replace(/2024/g, '2026').replace(/2025/g, '2026');
            
            fs.writeFileSync(filePath, content);
        }
    });
}

processFiles(rootDir);
