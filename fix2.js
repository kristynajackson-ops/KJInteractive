const fs = require('fs');
const files = [
  'C:/Users/krist/Site/src/app/page.tsx',
  'C:/Users/krist/Site/src/app/about/page.tsx',
  'C:/Users/krist/Site/src/app/ideas/intelligent-automation/page.tsx',
  'C:/Users/krist/Site/src/app/ideas/interactive-strategy/page.tsx',
  'C:/Users/krist/Site/src/app/ideas/working-in-practice/page.tsx'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let c = fs.readFileSync(f, 'utf8');
    // Fix remaining broken patterns
    c = c.replace(/'"/g, ' - ');
    c = c.replace(//g, "'");
    c = c.replace(/œ/g, '"');
    c = c.replace(//g, '');
    fs.writeFileSync(f, c, 'utf8');
    console.log('Fixed:', f);
  }
});
