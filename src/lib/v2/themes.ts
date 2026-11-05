/**
 * Thèmes de la V2. Chacun change tout le site : couleurs, polices, arrondis.
 * Les valeurs vivent dans src/app/v2.css (`:root[data-theme='…']`) ; ce fichier
 * ne sert qu'au sélecteur (nom, description, pastilles) et au script de démarrage.
 * Le choix est gardé dans le navigateur (localStorage).
 */
export type V2Theme = {
  id: string
  name: string
  desc: string
  scheme: 'light' | 'dark'
  /** Pastilles du sélecteur : fond, texte, accent, section sombre. */
  swatch: [string, string, string, string]
}

export const v2Themes: V2Theme[] = [
  {
    id: 'atelier',
    name: 'Atelier',
    desc: 'Lin, noyer et chêne, titres à empattements',
    scheme: 'light',
    swatch: ['#f6f1ea', '#24170e', '#9c7445', '#16100b'],
  },
  {
    id: 'nuit',
    name: 'Nuit',
    desc: 'Noir profond et or pâle, comme Plateau',
    scheme: 'dark',
    swatch: ['#000000', '#ffffff', '#f6e3be', '#0d0d0e'],
  },
  {
    id: 'showroom',
    name: 'Showroom',
    desc: 'Marine, crème et rouge',
    scheme: 'light',
    swatch: ['#f7f3ec', '#283444', '#c4262e', '#283444'],
  },
  {
    id: 'galerie',
    name: 'Galerie',
    desc: 'Blanc cassé, noir et sable, très épuré',
    scheme: 'light',
    swatch: ['#f7f5f1', '#1d1c1a', '#8a6d4b', '#1d1713'],
  },
  {
    id: 'sauge',
    name: 'Sauge',
    desc: 'Vert tapis de billard et crème',
    scheme: 'light',
    swatch: ['#eef1ea', '#1c2a21', '#2f6a4c', '#17241c'],
  },
  {
    id: 'arcade',
    name: 'Arcade',
    desc: 'Nuit bleutée, magenta et cyan',
    scheme: 'dark',
    swatch: ['#0b0d17', '#e8ebf5', '#ff2e93', '#06070d'],
  },
]

export const V2_DEFAULT_THEME = 'atelier'
/** Clé propre à cette version : le site Pages partage son localStorage avec les autres propositions. */
export const V2_THEME_KEY = 'restart-v2-theme'
export const V2_THEME_EVENT = 'restart:v2-theme'

export function applyV2Theme(id: string) {
  const t = v2Themes.find((x) => x.id === id) ?? v2Themes[0]
  const root = document.documentElement
  root.dataset.theme = t.id
  root.dataset.scheme = t.scheme
  try {
    localStorage.setItem(V2_THEME_KEY, t.id)
  } catch {
    // Stockage indisponible : le thème vaut pour la page en cours.
  }
  window.dispatchEvent(new CustomEvent(V2_THEME_EVENT, { detail: t.id }))
}

/** Lancé dans le <head> avant le premier rendu : pose le thème choisi, sans flash. `?theme=nuit` force un thème. */
export function v2ThemeBootScript() {
  const schemes = Object.fromEntries(v2Themes.map((t) => [t.id, t.scheme]))
  return `(function(){try{
var s=${JSON.stringify(schemes)},k=${JSON.stringify(V2_THEME_KEY)};
var q=new URLSearchParams(location.search).get('theme');
var t=(q&&s[q])?q:localStorage.getItem(k);
if(q&&s[q])localStorage.setItem(k,q);
if(t&&s[t]){var r=document.documentElement;r.dataset.theme=t;r.dataset.scheme=s[t];}
}catch(e){}})();`
}
