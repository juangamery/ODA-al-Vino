const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

// Mapeo de extensiones antiguas a WebP
const imagePattern = /(['"])\/oda\/([^'"]+)\.(jpg|jpeg|png)(['"])/gi;

function updateFiles(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!file.startsWith('.') && file !== 'node_modules') {
        updateFiles(filePath);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx')) {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;

      // Reemplazar referencias a imágenes
      content = content.replace(imagePattern, (match, q1, path, ext, q2) => {
        return `${q1}/oda/${path}.webp${q2}`;
      });

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Actualizado: ${file}`);
      }
    }
  }
}

console.log('🔄 Actualizando referencias de imágenes a WebP...\n');
updateFiles(srcDir);
console.log('\n✨ Referencias actualizadas!');
