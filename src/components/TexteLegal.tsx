import type { BlocLegal } from '@/data/legal'

/** Affiche un texte juridique tel quel ; les éléments de liste qui se suivent sont regroupés. */
export function TexteLegal({ blocs }: { blocs: BlocLegal[] }) {
  const groupes = blocs.reduce<{ balise: string; textes: string[] }[]>((acc, [balise, texte]) => {
    const dernier = acc[acc.length - 1]
    if (balise === 'li' && dernier?.balise === 'li') dernier.textes.push(texte)
    else acc.push({ balise, textes: [texte] })
    return acc
  }, [])

  return groupes.map(({ balise, textes }, i) => {
    if (balise === 'li')
      return (
        <ul key={i}>
          {textes.map((t, j) => (
            <li key={j}>{t}</li>
          ))}
        </ul>
      )
    if (balise === 'h2') return <h2 key={i}>{textes[0]}</h2>
    if (balise === 'h3' || balise === 'h4' || balise === 'h5')
      return (
        <h3 key={i} className="pt-4 font-semibold text-heading">
          {textes[0]}
        </h3>
      )
    return <p key={i}>{textes[0]}</p>
  })
}
