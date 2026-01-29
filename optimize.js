const sharp = require('sharp');
const path = require('path');

const images = [
  { name: 'kj-banner.jpg', width: 1920 },
  { name: 'kj-about.jpg', width: 800 },
  { name: 'Agentic-AI.jpg', width: 800 },
  { name: 'interactive-strategy-pic.jpg', width: 800 },
  { name: 'structure-agency.png', width: 800 },
  { name: 'iso-1.png', width: 600 },
  { name: 'kj-logo.png', width: 400 },
  { name: 'kj-logo-white.png', width: 200 },
  { name: 'kj-logo-black.png', width: 200 },
];

async function optimize() {
  for (const img of images) {
    const input = path.join(__dirname, 'public', img.name);
    const output = path.join(__dirname, 'public', img.name);
    const ext = path.extname(img.name).toLowerCase();
    
    try {
      if (ext === '.png') {
        await sharp(input).resize(img.width).png({ quality: 80 }).toFile(output + '.tmp');
      } else {
        await sharp(input).resize(img.width).jpeg({ quality: 80 }).toFile(output + '.tmp');
      }
      require('fs').renameSync(output + '.tmp', output);
      console.log('Optimized:', img.name);
    } catch (e) {
      console.log('Error with', img.name, e.message);
    }
  }
}
optimize();
