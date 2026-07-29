const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

const replacements = [
  { regex: /Royal Crown Jewellers/g, replacement: "Shree Ramdut Jewellers" },
  { regex: /ROYAL CROWN/g, replacement: "SHREE RAMDUT" },
  { regex: /Royal Crown/g, replacement: "Shree Ramdut" },
  { regex: /royal crown/g, replacement: "shree ramdut" },
  { regex: /royalcrown/g, replacement: "shreeramdut" },
  { regex: /The Royal Journal/g, replacement: "The Shree Ramdut Journal" },
  { regex: /Royal Customer/g, replacement: "Shree Ramdut Customer" },
  { regex: /royal@example\.com/g, replacement: "customer@shreeramdut.com" },
  { regex: />RC</g, replacement: ">SR<" },
  { regex: /RC-/g, replacement: "SR-" },
  { regex: /Royal Club/g, replacement: "Shree Ramdut Club" },
];

function processDirectory(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js') || fullPath.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let newContent = content;
      replacements.forEach(r => {
        newContent = newContent.replace(r.regex, r.replacement);
      });
      if (newContent !== content) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  });
}

processDirectory(directoryPath);

// Also process index.html
const indexPath = path.join(__dirname, 'index.html');
if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');
  let newContent = content;
  replacements.forEach(r => {
    newContent = newContent.replace(r.regex, r.replacement);
  });
  if (newContent !== content) {
    fs.writeFileSync(indexPath, newContent, 'utf8');
    console.log(`Updated ${indexPath}`);
  }
}
