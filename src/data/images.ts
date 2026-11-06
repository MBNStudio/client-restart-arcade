import { asset } from '@/lib/site'

/**
 * Visuels repris de restart-arcade.fr (API WooCommerce + pages univers),
 * convertis en WebP 1400 px. Un dossier par modèle ou univers dans
 * `public/produits/<slug>/`, le 0 étant le visuel principal.
 */
const productImageCount: Record<string, number> = {
  'r-kids': 5,
  'r-level': 4,
  'r-twin': 4,
  'r-evolution': 2,
  'r-pro': 7,
  'r-dart': 4,
  'r-dart-pro': 3,
  'bf-start': 6,
  'bf-4-saisons': 6,
  'bf-premium': 6,
  'bf-4-saisons-6-joueurs': 6,
  'm-serenity': 5,
  billard: 5,
  'flipper-numerique': 1,
  'cocon-de-repos': 4,
}

export function productImages(slug: string): string[] {
  const n = productImageCount[slug] ?? 0
  return Array.from({ length: n }, (_, i) => asset(`/produits/${slug}/${i}.webp`))
}

export const productImage = (slug: string): string | undefined => productImages(slug)[0]

/** Visuel représentatif de chaque univers (celui du modèle phare). */
const universCover: Record<string, string> = {
  'borne-arcade': 'r-pro',
  flechettes: 'r-dart-pro',
  'baby-foot': 'bf-premium',
  'fauteuil-massant': 'm-serenity',
  billard: 'billard',
  'flipper-numerique': 'flipper-numerique',
  'cocon-de-repos': 'cocon-de-repos',
}

export const universImage = (slug: string) => productImage(universCover[slug] ?? slug)
export const universGallery = (slug: string) => productImages(slug)

/** Photos d'installations clients (page Réalisations et bandeau d'accueil). */
export const realisationPhotos = [
  27, 33, 35, 36, 40, 41, 46, 50, 58, 60, 61, 64, 67, 68, 73, 75, 117, 123, 125, 126, 129, 131,
  135, 136, 140, 149, 157,
].map((n) => asset(`/img/realisations/r${n}.webp`))

/** Les mêmes photos, classées par produit (page Réalisations). Une photo à deux produits va au plus visible. */
export const realisationCategories: { slug: string; label: string; photos: number[] }[] = [
  { slug: 'borne-arcade', label: "Bornes d'arcade", photos: [140, 157, 117, 27, 40, 41, 46, 61] },
  { slug: 'flechettes', label: 'Fléchettes', photos: [149, 131, 135, 136, 50, 60, 64, 67, 68, 73, 75] },
  { slug: 'baby-foot', label: 'Baby-foot', photos: [33, 58, 35, 36] },
  { slug: 'billard', label: 'Billard', photos: [126, 125, 123, 129] },
]
export const realisationPhoto = (n: number) => asset(`/img/realisations/r${n}.webp`)

export const ambiance = {
  salleDePause: asset('/img/ambiance/0.webp'),
  bar: asset('/img/ambiance/1.webp'),
  showroom: asset('/img/ambiance/2.webp'),
  equipe: asset('/img/ambiance/5.webp'),
  bureau: asset('/img/ambiance/6.webp'),
}

export const logo = asset('/img/logo/restart.webp')

/** Miniature d'article reprise du blog d'origine. */
export const blogImage = (slug: string) => asset(`/img/blog/${slug}.webp`)

/** Visuel en situation de chaque gamme, pour le carrousel d'accueil (scripts/gen_hero.py). */
export const heroImage = (universSlug: string) => asset(`/img/hero/${universSlug}.webp`)
