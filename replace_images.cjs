const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

const localImages = [
  '/images/ring.jpg',
  '/images/necklace.jpg',
  '/images/bangle.jpg',
  '/images/earrings.jpg',
  '/images/pendant.jpg'
];

let imageCounter = 0;

function processDirectory(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Replace unsplash images
      let updated = false;
      let newContent = content.replace(/https:\/\/images\.unsplash\.com\/photo-[^"'\s]+/g, (match) => {
        updated = true;
        const replaceWith = localImages[imageCounter % localImages.length];
        imageCounter++;
        return replaceWith;
      });

      if (updated) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`Updated images in ${fullPath}`);
      }
    }
  });
}

processDirectory(directoryPath);
