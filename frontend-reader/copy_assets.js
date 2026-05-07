const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\user\\.gemini\\antigravity\\brain\\b6567e03-4fbe-42b3-87a6-dd43b80c91cd';
const destDir = path.join(__dirname, 'public', 'assets');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

fs.copyFileSync(path.join(srcDir, 'zzz_proxy_emblem_no_text_1778139700368.png'), path.join(destDir, 'emblem.png'));
fs.copyFileSync(path.join(srcDir, 'zzz_tech_barcode_1778139475360.png'), path.join(destDir, 'barcode.png'));
fs.copyFileSync(path.join(srcDir, 'zzz_bangboo_tv_1778139493648.png'), path.join(destDir, 'bangboo.png'));
fs.copyFileSync(path.join(srcDir, 'zzz_warning_stamp_1778139511951.png'), path.join(destDir, 'warning.png'));
console.log('Assets copied successfully.');
