const fs = require('fs');
const path = require('path');

const files = [
  'src/app/page.tsx',
  'src/app/about/page.tsx',
  'src/app/ideas/intelligent-automation/page.tsx',
  'src/app/ideas/interactive-strategy/page.tsx',
  'src/app/ideas/working-in-practice/page.tsx'
];

files.forEach(f => {
  const full = path.join(__dirname, f);
  if (fs.existsSync(full)) {
    let c = fs.readFileSync(full, 'utf8');
    // Fix common mojibake patterns (UTF-8 misread as Windows-1252)
    c = c.replace(/â"/g, ' - ');  // em dash
    c = c.replace(/â/g, "'");    // right single quote
    c = c.replace(/â/g, "'");    // left single quote
    c = c.replace(/âœ/g, '"');    // left double quote
    c = c.replace(/â/g, '"');     // right double quote
    c = c.replace(/'"/g, ' - ');  // partial fix
    c = c.replace(/Ãââœ/g, '-');
    c = c.replace(/Ãââ/g, "'");
    fs.writeFileSync(full, c, 'utf8');
    console.log('Fixed:', f);
  }
});
console.log('DONE');
