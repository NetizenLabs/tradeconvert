const fs = require('fs');
const path = require('path');

const rootDir = 'c:/xampp/htdocs/webtoolkit-pro/tradeconvert';

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
            
            // Update NEC 2023 to NEC 2026
            let updatedContent = content.replace(/NEC 2023/g, 'NEC 2026');
            
            if (content !== updatedContent) {
                fs.writeFileSync(filePath, updatedContent);
                console.log(`Updated NEC standard to 2026 in ${filePath}`);
            }
        }
    });
}

processFiles(rootDir);
