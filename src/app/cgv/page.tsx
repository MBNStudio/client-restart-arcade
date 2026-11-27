import type { Metadata } from 'next'
import { LegalPage } from '@/components/LegalPage'
import legal from '@/data/legal.generated.json'

export const metadata: Metadata = {
  title: 'Conditions générales de vente',
  description: 'Conditions générales de vente Restart Arcade : commande, prix, paiement, livraison, rétractation, garanties et litiges.',
  alternates: { canonical: '/cgv/' },
}

/** Texte des CGV en vigueur, repris du site actuel (scripts/build-legal.py) : les listes sont regroupées. */
const blocs = (legal.cgv as [string, string][])
  .filter(([tag]) => tag !== 'h1')
  .reduce<{ tag: string; textes: string[] }[]>((acc, [tag, texte]) => {
    const dernier = acc[acc.length - 1]
    if (tag === 'li' && dernier?.tag === 'li') dernier.textes.push(texte)
    else acc.push({ tag, textes: [texte] })
    return acc
  }, [])

export default function Page() {
  return (
    <LegalPage title="Conditions générales de vente" href="/cgv/" updated="1er août 2026">
      {blocs.map(({ tag, textes }, i) => {
        if (tag === 'li')
          return (
            <ul key={i}>
              {textes.map((t, j) => (
                <li key={j}>{t}</li>
              ))}
            </ul>
          )
        if (tag === 'h2') return <h2 key={i}>{textes[0]}</h2>
        if (tag === 'h3' || tag === 'h4' || tag === 'h5')
          return (
            <h3 key={i} className="pt-4 font-semibold text-heading">
              {textes[0]}
            </h3>
          )
        return <p key={i}>{textes[0]}</p>
      })}
    </LegalPage>
  )
}
