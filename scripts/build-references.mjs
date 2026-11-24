// Médiathèque de références (V3, lot 6) : index des photos de clients fournies par RESTART, rangées par
// commercial, et conversion en WebP des seules photos dont l'accord d'affichage est confirmé.
//
//   node scripts/build-references.mjs            -> régénère src/data/references.generated.json (index, sans image)
//   node scripts/build-references.mjs --convert  -> + convertit en public/img/references/<commercial>/ les photos
//                                                   listées dans src/data/references-accords.json
//
// Sources : assets-client/2026-11/photos-references/{maxime,thibaut,guillaume}/<client>-<produit>-<n>.jpg
// (hors git). Rien n'est publié tant qu'une photo n'est pas dans references-accords.json.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const src = join(root, 'assets-client/2026-11/photos-references')
const out = join(root, 'public/img/references')

const commerciaux = {
  maxime: { nom: 'Maxime', secteur: 'Sud-Est' },
  thibaut: { nom: 'Thibaut', secteur: 'Sud-Ouest' },
  guillaume: { nom: 'Guillaume', secteur: 'Auvergne-Rhône-Alpes' },
}

// Produit repéré dans le nom de fichier (du plus précis au plus général).
const produits = [
  ['borne-d-arcade-twin', 'Borne d’arcade Twin'],
  ['borne-d-arcade-flechette-babyfoot', 'Borne d’arcade, fléchettes, baby-foot'],
  ['borne-d-arcade-flechette', 'Borne d’arcade et fléchettes'],
  ['borne-d-arcade-babyfoot', 'Borne d’arcade et baby-foot'],
  ['flechette-babyfoot-billard', 'Fléchettes, baby-foot, billard'],
  ['flechette-babyfoot', 'Fléchettes et baby-foot'],
  ['flechette-murale', 'Fléchettes murales'],
  ['borne-d-arcade', 'Borne d’arcade'],
  ['pincab', 'Pincab'],
  ['flechette', 'Fléchettes'],
  ['babyfoot', 'Baby-foot'],
  ['billard', 'Billard'],
  ['twin', 'Twin'],
]

const titre = (slug) => slug.split('-').map((w) => (w.length > 2 ? w[0].toUpperCase() + w.slice(1) : w)).join(' ')

const items = []
for (const [dir, c] of Object.entries(commerciaux)) {
  for (const f of readdirSync(join(src, dir)).sort()) {
    if (!/\.jpe?g$/i.test(f)) continue
    const corrompue = f.includes('SOURCE-CORROMPUE')
    const base = f.replace(/\.jpe?g$/i, '').replace('-SOURCE-CORROMPUE', '').replace(/-\d+$/, '')
    const p = produits.find(([k]) => base.endsWith(k) || base.includes(`-${k}`))
    const clientSlug = p ? base.slice(0, base.lastIndexOf(p[0])).replace(/-$/, '') : base
    items.push({
      id: `${dir}/${f.replace(/\.jpe?g$/i, '')}`,
      fichier: `${dir}/${f}`,
      commercial: dir,
      secteur: c.secteur,
      client: titre(clientSlug || base),
      produit: p ? p[1] : 'À préciser',
      ville: null, // à fournir par RESTART (landings par ville et par région)
      utilisable: !corrompue,
    })
  }
}

writeFileSync(join(root, 'src/data/references.generated.json'), JSON.stringify(items, null, 2) + '\n')
console.log(`${items.length} photos indexées`)

if (process.argv.includes('--convert')) {
  const accords = JSON.parse(readFileSync(join(root, 'src/data/references-accords.json'), 'utf8'))
  let n = 0
  for (const it of items.filter((i) => i.utilisable && accords.includes(i.id))) {
    const dest = join(out, `${it.id}.webp`)
    mkdirSync(dirname(dest), { recursive: true })
    if (existsSync(dest)) continue
    await sharp(join(src, it.fichier)).rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(dest)
    n++
  }
  console.log(`${n} photos converties dans public/img/references/`)
}
