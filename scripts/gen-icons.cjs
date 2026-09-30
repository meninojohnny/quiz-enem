/** Gera os ícones PNG do PWA a partir de public/icon.svg. */
const fs = require('fs')
const sharp = require('sharp')

const svg = fs.readFileSync('public/icon.svg')

// Versão maskable: o mesmo desenho com folga de 10% em cada lado, para o
// recorte adaptativo do Android não cortar o glifo.
const maskable = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
     <rect width="80" height="80" fill="#0a1a3a"/>
     <g transform="translate(8,8)">${svg.toString().replace(/<\/?svg[^>]*>/g, '')}</g>
   </svg>`,
)

async function main() {
  await sharp(svg, { density: 384 }).resize(192, 192).png().toFile('public/icon-192.png')
  await sharp(svg, { density: 384 }).resize(512, 512).png().toFile('public/icon-512.png')
  await sharp(maskable, { density: 384 }).resize(512, 512).png().toFile('public/icon-maskable-512.png')
  await sharp(svg, { density: 384 }).resize(180, 180).png().toFile('public/apple-touch-icon.png')
  await sharp(svg, { density: 128 }).resize(32, 32).png().toFile('public/favicon.png')
  console.log('ícones gerados')
}

main()
