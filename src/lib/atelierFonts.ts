import localFont from 'next/font/local'

/*
 * Polices de la version Atelier, les mêmes que sur ab-agencement.com : Fraunces pour
 * les titres, Manrope pour le texte. Fichiers locaux, le build ne dépend pas de Google Fonts.
 */
const fraunces = localFont({
  src: '../fonts/fraunces-variable.woff2',
  variable: '--font-fraunces',
  display: 'swap',
  weight: '100 900',
  fallback: ['Georgia', 'serif'],
})
const manrope = localFont({
  src: '../fonts/manrope-variable.woff2',
  variable: '--font-manrope',
  display: 'swap',
  weight: '200 800',
  fallback: ['system-ui', 'sans-serif'],
})

export const atelierFontVariables = `${fraunces.variable} ${manrope.variable}`
