import legal from './legal.generated.json'

/** CGV en vigueur, mot pour mot : liste de [balise, texte] produite par scripts/build-legal.py. */
export type BlocLegal = [string, string]

export const cgv = (legal.cgv as BlocLegal[]).filter(([balise]) => balise !== 'h1')

/** Les articles `de` à `a` inclus, titres compris. */
export function articlesCgv(de: number, a: number): BlocLegal[] {
  const debut = (n: number) => cgv.findIndex(([balise, texte]) => balise !== 'p' && balise !== 'li' && new RegExp(`^Article ${n}\\D`).test(texte))
  const i = debut(de)
  const j = debut(a + 1)
  if (i < 0 || j < 0) throw new Error(`Articles ${de} à ${a} introuvables dans les CGV`)
  return cgv.slice(i, j)
}
