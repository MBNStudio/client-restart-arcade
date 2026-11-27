/**
 * Thèmes du site. Chacun change tout le site : couleurs, polices, arrondis.
 * Les valeurs vivent dans src/app/v2.css (`:root[data-theme='…']`) ; ce fichier
 * sert à la liste des thèmes et au script de démarrage.
 * Rien n'est gardé dans le navigateur : le thème suit l'univers de la page.
 */
export type V2Theme = {
  id: string
  name: string
  desc: string
  scheme: 'light' | 'dark'
  /** Pastilles du sélecteur : fond, texte, accent, section sombre. */
  swatch: [string, string, string, string]
}

/**
 * V4 : un thème par univers, arrêtés par RESTART (mail du 27 novembre 2026) : Particulier et Entreprise comme
 * en V3, « Thème 1 » pour les bars & commerces. Le thème est imposé par l'univers de la page (ThemeByEspace).
 */
export const v2Themes: V2Theme[] = [
  {
    id: 'arcade-particulier',
    name: 'Particulier',
    desc: "Arcade de nuit, bleu RESTART et appel à l'action rose",
    scheme: 'dark',
    swatch: ['#0b0d17', '#e8ebf5', '#ff2e93', '#4444fe'],
  },
  {
    id: 'arcade-entreprise',
    name: 'Entreprise',
    desc: 'Arcade en mode clair, gris perle (pas de fond blanc)',
    scheme: 'light',
    swatch: ['#e6e7e8', '#12132a', '#ff2e93', '#4444fe'],
  },
  {
    id: 'theme-1',
    name: 'Bars & commerces',
    desc: 'Indigo profond, tout en bleu RESTART',
    scheme: 'dark',
    swatch: ['#0b0e2e', '#eceeff', '#4444fe', '#aab0ff'],
  },
]

export const V2_DEFAULT_THEME = 'arcade-particulier'
export const V2_THEME_EVENT = 'restart:v2-theme'

/** Thème de chaque univers (adresse de l'espace → thème). */
export const themeOfEspace = (espace: string | null | undefined) =>
  espace === 'entreprise' ? 'arcade-entreprise' : espace === 'bar-commerce' ? 'theme-1' : V2_DEFAULT_THEME

export function applyV2Theme(id: string) {
  const t = v2Themes.find((x) => x.id === id) ?? v2Themes[0]
  const root = document.documentElement
  root.dataset.theme = t.id
  root.dataset.scheme = t.scheme
  window.dispatchEvent(new CustomEvent(V2_THEME_EVENT, { detail: t.id }))
}

/**
 * Lancé dans le <head> avant le premier rendu : pose le thème de l'univers de la page, sans flash.
 * `?theme=theme-1` force un thème (démo). `espacePaths` : univers → adresse (ex. « /entreprises/ »).
 */
export function v2ThemeBootScript(basePath: string, espacePaths: Record<string, string>) {
  const schemes = Object.fromEntries(v2Themes.map((t) => [t.id, t.scheme]))
  const byEspace = Object.fromEntries(Object.keys(espacePaths).map((k) => [espacePaths[k], themeOfEspace(k)]))
  return `(function(){try{
var s=${JSON.stringify(schemes)},e=${JSON.stringify(byEspace)},b=${JSON.stringify(basePath)};
var q=new URLSearchParams(location.search).get('theme'),t=s[q]?q:null;
if(!t){var h=location.pathname;if(b&&h.indexOf(b)===0)h=h.slice(b.length);for(var k in e){if(h.indexOf(k)===0){t=e[k];break}}}
if(t&&s[t]){var r=document.documentElement;r.dataset.theme=t;r.dataset.scheme=s[t];}
}catch(x){}})();`
}
