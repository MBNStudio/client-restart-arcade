/**
 * Thèmes du site. Chacun change tout le site : couleurs, polices, arrondis.
 * Les valeurs vivent dans src/app/v2.css (`:root[data-theme='…']`) ; ce fichier
 * ne sert qu'au sélecteur (nom, description, pastilles) et au script de démarrage.
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
 * V3 : trois thèmes, un par univers (retours de RESTART du 19 novembre 2026), tous dérivés de l'Arcade V2
 * et de la charte (principale #4444FE, polices Orbitron et Poppins). Le thème est imposé par l'univers de la
 * page (voir ThemeByEspace) ; le sélecteur sert à comparer les trois pendant la recette.
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
    id: 'arcade-bar',
    name: 'Bars & commerces',
    desc: "Arcade de nuit, appel à l'action bleu cyan",
    scheme: 'dark',
    swatch: ['#0b0d17', '#e8ebf5', '#00ccd5', '#4444fe'],
  },
]

export const V2_DEFAULT_THEME = 'arcade-particulier'
export const V2_THEME_EVENT = 'restart:v2-theme'

/** Thème de chaque univers (adresse de l'espace → thème). */
export const themeOfEspace = (espace: string | null | undefined) =>
  espace === 'entreprise' ? 'arcade-entreprise' : espace === 'bar-commerce' ? 'arcade-bar' : V2_DEFAULT_THEME

export function applyV2Theme(id: string) {
  const t = v2Themes.find((x) => x.id === id) ?? v2Themes[0]
  const root = document.documentElement
  root.dataset.theme = t.id
  root.dataset.scheme = t.scheme
  window.dispatchEvent(new CustomEvent(V2_THEME_EVENT, { detail: t.id }))
}

/**
 * Lancé dans le <head> avant le premier rendu : pose le thème de l'univers de la page, sans flash.
 * `?theme=arcade-bar` force un thème (démo). `espacePaths` : univers → adresse (ex. « /entreprises/ »).
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
