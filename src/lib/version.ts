/**
 * Versions du site consultables sur la même URL. La version change surtout le
 * hero de l'accueil ; le reste du site est commun. Le choix vit en
 * sessionStorage, comme le thème : une nouvelle visite repart sur la version par
 * défaut. `?version=plateau` dans l'URL force une version (lien de démo).
 *
 * Trois autres propositions, Panorama, Showroom et Atelier, sont des sites à part
 * sur le même dépôt (branches theme-*, publiées sous /panorama/, /showroom/ et
 * /atelier/) : le sélecteur les propose par lien (`externalVersions`).
 */
import { themes } from '@/lib/themes'

export type VersionId = 'studio' | 'halo' | 'plateau' | 'plateau-clair'

export const versions: { id: VersionId; name: string; desc: string }[] = [
  { id: 'plateau', name: 'Plateau', desc: 'Sombre, un mur de photos en situation qui défile' },
  { id: 'plateau-clair', name: 'Plateau clair', desc: 'En clair : les gammes en grand, une à la fois' },
  { id: 'halo', name: 'Halo', desc: 'Film plein écran : flipper, fléchettes, baby-foot et sourires' },
  { id: 'studio', name: 'Carrousel', desc: 'Carrousel photo, puis la pièce racontée par public' },
]

/** Versions publiées comme sites à part sur le même dépôt, ouvertes par lien. */
export type ExternalVersionId = 'panorama' | 'showroom' | 'atelier' | 'plateau-v2'
export const externalVersions: { id: ExternalVersionId; name: string; desc: string; path: string; dev?: string }[] = [
  { id: 'panorama', name: 'Panorama', desc: 'Une pièce en plein écran qui réunit tous les jeux', path: '/panorama/', dev: 'http://localhost:3107/' },
  { id: 'showroom', name: 'Showroom', desc: "Mise en page d'après poltronesofa.com : marine, crème et rouge", path: '/showroom/' },
  { id: 'atelier', name: 'Atelier', desc: "Mise en page d'après ab-agencement.com : lin, noyer et chêne", path: '/atelier/', dev: 'http://localhost:3108/' },
  {
    id: 'plateau-v2',
    name: 'Plateau, retours du 28/10',
    desc: 'Pop-up de choix, un accueil général et un accueil par espace',
    path: '/plateau-v2/',
    dev: 'http://localhost:3109/',
  },
]

/** Site GitHub Pages du dépôt restart-arcade, qui héberge toutes les versions. */
export const PAGES_URL = 'https://mbnstudio.github.io/client-restart-arcade'

/** Adresse d'une version externe : son serveur de dev en local, sinon le site Pages. */
export function externalVersionUrl(v: (typeof externalVersions)[number]) {
  const local = typeof location !== 'undefined' && /^(localhost|127\.0\.0\.1)$/.test(location.hostname)
  return local && v.dev ? v.dev : `${PAGES_URL}${v.path}`
}

/** Versions qui imposent leur propre palette, quel que soit le thème choisi. */
export const VERSION_SCHEMES: Partial<Record<VersionId, 'dark' | 'light'>> = {
  halo: 'light',
  plateau: 'dark',
  'plateau-clair': 'light',
}

export const DEFAULT_VERSION: VersionId = 'studio'
export const VERSION_STORAGE_KEY = 'restart-version'
export const VERSION_EVENT = 'restart:version'

export const isVersion = (value: unknown): value is VersionId =>
  versions.some((v) => v.id === value)

export function currentVersion(): VersionId {
  if (typeof document === 'undefined') return DEFAULT_VERSION
  const v = document.documentElement.dataset.version
  return isVersion(v) ? v : DEFAULT_VERSION
}

export function applyVersion(id: VersionId) {
  const root = document.documentElement
  root.dataset.version = id
  root.dataset.scheme =
    VERSION_SCHEMES[id] ?? themes.find((t) => t.id === root.dataset.theme)?.scheme ?? 'light'
  try {
    sessionStorage.setItem(VERSION_STORAGE_KEY, id)
  } catch {
    // Stockage indisponible : la version s'applique quand même à la page en cours.
  }
  window.dispatchEvent(new CustomEvent(VERSION_EVENT, { detail: id }))
}
