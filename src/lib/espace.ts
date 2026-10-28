import type { Audience } from '@/data/catalogue'
import { audiencePath } from '@/data/audiencePages'
import { asset } from '@/lib/site'

/**
 * Espaces du site (retours RESTART du 28 octobre) : un accueil général et un
 * accueil par public. À la première visite, une pop-up propose de choisir son
 * espace ; le choix est gardé dans le navigateur (localStorage) et la visite
 * suivante qui arrive sur l'accueil général est renvoyée vers celui de l'espace.
 * Fermer la pop-up laisse sur l'accueil général et s'en souvient aussi.
 */
export type EspaceChoice = Audience | 'general'

/** Clé propre à cette version : le site Pages partage son localStorage avec les autres propositions. */
export const ESPACE_STORAGE_KEY = 'restart-plateau-v2-espace'
/** Posée à la première page de la visite : on ne redirige qu'en arrivant sur le site. */
export const ESPACE_SESSION_KEY = 'restart-plateau-v2-visite'
export const ESPACE_OPEN_EVENT = 'restart:espace-open'

/** Ordre donné par RESTART : commerce, entreprise, particulier. */
export const espaces: { id: Audience; label: string; short: string; line: string; photo: string; alt: string }[] = [
  {
    id: 'bar-commerce',
    label: 'Bar & commerce',
    short: 'Commerce',
    line: 'Animer votre établissement et fidéliser vos clients',
    photo: asset('/img/situations/bar.webp'),
    alt: "Pub équipé d'un flipper, de fléchettes, d'une borne, d'un baby-foot et d'un billard",
  },
  {
    id: 'entreprise',
    label: 'Entreprise',
    short: 'Entreprise',
    line: 'Des salles de pause où vos équipes aiment se retrouver',
    photo: asset('/img/situations/entreprise.webp'),
    alt: "Collègues autour d'un billard dans l'espace détente de leur entreprise",
  },
  {
    id: 'particulier',
    label: 'Particulier',
    short: 'Particulier',
    line: "L'ambiance des salles d'arcade, à la maison",
    photo: asset('/img/situations/maison.webp'),
    alt: "Amis réunis dans un salon autour d'une borne d'arcade",
  },
]

export const espacePaths = Object.fromEntries(espaces.map((e) => [e.id, audiencePath(e.id)])) as Record<
  Audience,
  string
>

export function storedEspace(): EspaceChoice | null {
  try {
    const v = localStorage.getItem(ESPACE_STORAGE_KEY)
    return v === 'general' || espaces.some((e) => e.id === v) ? (v as EspaceChoice) : null
  } catch {
    return null
  }
}

export function storeEspace(choice: EspaceChoice) {
  try {
    localStorage.setItem(ESPACE_STORAGE_KEY, choice)
  } catch {
    // Stockage indisponible (navigation privée) : le choix vaut pour la page en cours.
  }
}

/** Espace de la page affichée, d'après son adresse. */
export const espaceOfPath = (pathname: string) => espaces.find((e) => pathname.startsWith(espacePaths[e.id]))?.id

/**
 * Script lancé dans le <head>, avant le premier rendu : si la visite commence sur
 * l'accueil général et qu'un espace a été choisi lors d'une visite précédente,
 * on part tout de suite sur l'accueil de cet espace, sans flash.
 * `?accueil=general` désactive la redirection (lien de démo).
 */
export function espaceBootScript(basePath: string) {
  return `(function(){try{
var L=localStorage,S=sessionStorage,K=${JSON.stringify(ESPACE_STORAGE_KEY)},V=${JSON.stringify(ESPACE_SESSION_KEY)};
var b=${JSON.stringify(basePath)},p=${JSON.stringify(espacePaths)};
var first=!S.getItem(V);S.setItem(V,'1');
var c=L.getItem(K),here=location.pathname;
if(first&&p[c]&&(here===b+'/'||here===b)&&!/[?&]accueil=/.test(location.search))location.replace(b+p[c]);
}catch(e){}})();`
}
