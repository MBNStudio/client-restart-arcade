// Photos de la V4 (retours de RESTART du 27/11/2026) : convertit en WebP les photos fournies pour le défilé
// d'ouverture et les encarts, plus les références clients choisies pour les blocs 01 / 02 / 03.
//
//   node scripts/build-photos-v4.mjs
//
// Sources (hors git) : assets-client/2026-11/retours-v3/photos-home/ et assets-client/2026-11/photos-references/.
// Pour remplacer une photo : changer son chemin ci-dessous et relancer.
import { mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const recues = join(root, 'assets-client/2026-11/retours-v3/photos-home/SITE INTERNET')
const refs = join(root, 'assets-client/2026-11/photos-references')
const out = join(root, 'public/img/v4')

const particulier = (n, ext) => `1. SITE PARTICULIER HOME PAGE/Salle de jeux particuliers (${n}).${ext}`
const entreprise = (n) => `3. SITE ENTREPRISE HOME PAGE/Salle de pause entreprise (${n}).png`
const bar = (n) => `4. SITE BAR ET COMMERCE HOME PAGE/Bar et commerces (${n}).png`
const encartsP = '2. SITE PARTICULIER ENCARTS HOME PAGE'
const encartsB = '5. SITE BAR ET COMMERCE ENCARTS HOME PAGE'

// destination -> source ; l'ordre du défilé commence par la photo la mieux définie.
const photos = {
  // Défilé d'ouverture
  'hero/particulier-1': [recues, particulier(2, 'png')],
  'hero/particulier-2': [recues, particulier(3, 'jpg')],
  'hero/particulier-3': [recues, particulier(4, 'jpg')],
  'hero/particulier-4': [recues, particulier(5, 'jpg')],
  'hero/particulier-5': [recues, particulier(1, 'jpg')],
  'hero/entreprise-1': [recues, entreprise(4)],
  'hero/entreprise-2': [recues, entreprise(2)],
  'hero/entreprise-3': [recues, entreprise(1)],
  'hero/entreprise-4': [recues, entreprise(3)],
  'hero/bar-commerce-1': [recues, bar(1)],
  'hero/bar-commerce-2': [recues, bar(2)],
  'hero/bar-commerce-3': [recues, bar(4)],
  'hero/bar-commerce-4': [recues, bar(3)],
  // Encarts
  'encarts/particulier-r-evolution': [recues, `${encartsP}/Borne d'arcade R-EVOLUTION.JPG`],
  'encarts/particulier-r-dart-pro': [recues, `${encartsP}/Fléchette R-DART PRO.png`],
  'encarts/particulier-salle-de-jeux': [recues, `${encartsP}/Salle de jeux particuliers (2).png`],
  'encarts/bar-location': [recues, `${encartsB}/AU BUREAU ALBI - Fléchette + Billard (1).png`],
  'encarts/bar-achat': [recues, `${encartsB}/BUFFALO GRILL - Borne d'arcade (1).jpg`],
  'encarts/bar-sur-mesure': [recues, `${encartsB}/ESPRIT PADEL - Borne d'arcade + fléchette (2).JPG`],
  // Blocs 01 / 02 / 03 : références clients (provisoires, RESTART les changera)
  'blocs/particulier-1': [refs, 'thibaut/domaine-de-massoulac-borne-d-arcade-1.jpg'],
  'blocs/particulier-2': [refs, 'thibaut/domaine-de-roussillon-babyfoot-3.jpg'],
  'blocs/particulier-3': [refs, 'thibaut/l-embuscade-flechette-2.jpg'],
  'blocs/entreprise-1': [refs, 'guillaume/zonzini-flechette-4.jpg'],
  'blocs/entreprise-2': [refs, 'thibaut/padel-flechette-5.jpg'],
  'blocs/entreprise-3': [refs, 'thibaut/polygone-indoor-flechette-borne-d-arcade-billard-1.jpg'],
  'blocs/bar-commerce-1': [refs, 'thibaut/le-bigourdan-borne-d-arcade-babyfoot.jpg'],
  'blocs/bar-commerce-2': [refs, 'thibaut/chope-compagnie-flechette-babyfoot-2.jpg'],
  'blocs/bar-commerce-3': [refs, 'thibaut/bar-le-central-borne-d-arcade-3.jpg'],
}

for (const [dest, [dir, file]] of Object.entries(photos)) {
  const to = join(out, `${dest}.webp`)
  mkdirSync(dirname(to), { recursive: true })
  const max = dest.startsWith('hero/') ? 2400 : 1600
  const info = await sharp(join(dir, file), { limitInputPixels: false })
    .rotate() // orientation EXIF (photos de téléphone)
    .resize({ width: max, height: max, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(to)
  console.log(dest, `${info.width}x${info.height}`, `${Math.round(info.size / 1024)} Ko`)
}
