// Typographie française, appliquée à la compilation (next.config.ts) : l'espace avant « : ; ! ? » € % et après « devient
// insécable, pour qu'aucune ligne ne commence par un de ces signes. Vaut pour tous les textes du site, y compris ceux
// ajoutés plus tard ; les fichiers sources ne changent pas.
//
// Seuls les textes sont touchés (chaînes, gabarits, texte JSX, valeurs des JSON), jamais le code.
import ts from 'typescript'

const INSECABLE = ' '
export const typo = (s) => s.replace(/(?<=\S|^) (?=[:;!?»€%])/g, INSECABLE).replace(/« /g, `«${INSECABLE}`)

const TEXTES = new Set([
  ts.SyntaxKind.StringLiteral,
  ts.SyntaxKind.NoSubstitutionTemplateLiteral,
  ts.SyntaxKind.TemplateHead,
  ts.SyntaxKind.TemplateMiddle,
  ts.SyntaxKind.TemplateTail,
  ts.SyntaxKind.JsxText,
])

function traiterCode(source, fichier) {
  const arbre = ts.createSourceFile(fichier, source, ts.ScriptTarget.Latest, true, fichier.endsWith('x') ? ts.ScriptKind.TSX : ts.ScriptKind.TS)
  const morceaux = []
  const visiter = (noeud) => {
    // Le texte JSX commence dès la fin du nœud précédent : ses espaces de tête en font partie.
    if (TEXTES.has(noeud.kind)) morceaux.push([noeud.kind === ts.SyntaxKind.JsxText ? noeud.pos : noeud.getStart(arbre), noeud.end])
    noeud.getChildren(arbre).forEach(visiter)
  }
  visiter(arbre)
  let sortie = ''
  let fin = 0
  for (const [de, a] of morceaux.sort((x, y) => x[0] - y[0])) {
    sortie += source.slice(fin, de) + typo(source.slice(de, a))
    fin = a
  }
  return sortie + source.slice(fin)
}

const traiterValeur = (v) =>
  typeof v === 'string'
    ? typo(v)
    : Array.isArray(v)
      ? v.map(traiterValeur)
      : v && typeof v === 'object'
        ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, traiterValeur(x)]))
        : v

export default function typoFrLoader(source) {
  const fichier = this.resourcePath
  return fichier.endsWith('.json') ? JSON.stringify(traiterValeur(JSON.parse(source))) : traiterCode(source, fichier)
}
