const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

// Extensions a procesar
const imageExts = ['.jpg', '.jpeg', '.png'];

// Función para procesar recursivamente
async function optimizeImages(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Ignorar node_modules y otros directorios
      if (!file.startsWith('.')) {
        await optimizeImages(filePath);
      }
    } else {
      const ext = path.extname(file).toLowerCase();

      if (imageExts.includes(ext)) {
        const webpPath = filePath.replace(/\.[^/.]+$/, '.webp');
        const originalSize = stat.size / (1024 * 1024); // MB

        try {
          // Detectar si es fotografía o gráfico
          const isPhoto = ext === '.jpg' || ext === '.jpeg';

          // Convertir a WebP con calidad adaptativa
          const quality = isPhoto ? 75 : 80; // Fotos: 75, Gráficos: 80

          await sharp(filePath)
            .webp({ quality })
            .toFile(webpPath);

          const webpSize = fs.statSync(webpPath).size / (1024 * 1024);
          const savings = ((1 - webpSize / originalSize) * 100).toFixed(1);

          console.log(`✅ ${path.relative(publicDir, filePath)}`);
          console.log(`   ${originalSize.toFixed(2)} MB → ${webpSize.toFixed(2)} MB (${savings}% ahorrado)`);
        } catch (error) {
          console.error(`❌ Error procesando ${file}:`, error.message);
        }
      }
    }
  }
}

console.log('🚀 Iniciando optimización de imágenes...\n');
optimizeImages(publicDir)
  .then(() => console.log('\n✨ ¡Optimización completada!'))
  .catch(err => console.error('Error:', err));
