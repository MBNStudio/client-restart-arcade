/**
 * Les sept propositions de refonte, toutes publiées sur le site GitHub Pages du
 * dépôt restart-arcade : Plateau, Plateau clair, Halo et Carrousel sur main (à la
 * racine, `?version=`), Panorama, Showroom et Atelier sur leur branche theme-* (sous-dossier).
 * Cette branche ne sert qu'une version : l'onglet « Version » renvoie vers les
 * autres, chacune à son adresse. En local, chaque site pointe vers son serveur de dev.
 */
const ROOT = 'https://stephanebally69-star.github.io/restart-arcade'

type Site = 'main' | 'panorama' | 'showroom' | 'atelier'
const SITE_PATH: Record<Site, string> = { main: '', panorama: '/panorama', showroom: '/showroom', atelier: '/atelier' }
const DEV: Partial<Record<Site, string>> = {
  main: 'http://localhost:4321',
  panorama: 'http://localhost:3107',
  atelier: 'http://localhost:3108',
}

export type SiteVersion = { id: string; name: string; desc: string; site: Site; path: string }

export const versions: SiteVersion[] = [
  { id: 'panorama', name: 'Panorama', desc: 'Une pièce en plein écran qui réunit tous les jeux', site: 'panorama', path: '/' },
  {
    id: 'showroom',
    name: 'Showroom',
    desc: "Mise en page d'après poltronesofa.com : marine, crème et rouge",
    site: 'showroom',
    path: '/',
  },
  {
    id: 'atelier',
    name: 'Atelier',
    desc: "Mise en page d'après ab-agencement.com : lin, noyer et chêne",
    site: 'atelier',
    path: '/',
  },
  { id: 'plateau', name: 'Plateau', desc: 'Sombre, un produit à la fois sur un plateau tournant en 3D', site: 'main', path: '/?version=plateau' },
  {
    id: 'plateau-clair',
    name: 'Plateau clair',
    desc: 'La version Plateau en clair, passage au noir au défilement',
    site: 'main',
    path: '/?version=plateau-clair',
  },
  { id: 'halo', name: 'Halo', desc: 'Film plein écran : flipper, fléchettes, baby-foot et sourires', site: 'main', path: '/?version=halo' },
  { id: 'studio', name: 'Carrousel', desc: 'Carrousel photo, puis la pièce racontée par public', site: 'main', path: '/?version=studio' },
]

/** Adresse d'une version : son serveur de dev en local, sinon le site Pages. */
export function versionUrl(v: SiteVersion) {
  const local = typeof location !== 'undefined' && /^(localhost|127\.0\.0\.1)$/.test(location.hostname)
  const dev = DEV[v.site]
  return local && dev ? dev + v.path : ROOT + SITE_PATH[v.site] + v.path
}

/** Version servie par ce build. */
export const CURRENT_VERSION = 'atelier'
