const fs = require('fs');
const path = require('path');

const rootDir = 'c:/xampp/htdocs/webtoolkit-pro/tradeconvert';

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            if (file !== '.git' && file !== 'node_modules' && file !== 'assets' && file !== 'css' && file !== 'js') {
                processDirectory(filePath);
            }
        } else if (file.endsWith('.html') || file.endsWith('.txt') || file.endsWith('.xml')) {
            let content = fs.readFileSync(filePath, 'utf8');
            let updatedContent = content.replace(/2025/g, '2026');
            
            if (content !== updatedContent) {
                fs.writeFileSync(filePath, updatedContent);
                console.log(`Updated year to 2026 in ${filePath}`);
            }
        }
    });
}

processDirectory(rootDir);
