import type { Metadata } from 'next'
import { LegalPage } from '@/components/LegalPage'
import { TexteLegal } from '@/components/TexteLegal'
import { cgv } from '@/data/legal'

export const metadata: Metadata = {
  title: 'Conditions générales de vente',
  description: 'Conditions générales de vente Restart Arcade : commande, prix, paiement, livraison, rétractation, garanties et litiges.',
  alternates: { canonical: '/cgv/' },
}

/** Texte des CGV en vigueur, repris du site actuel (scripts/build-legal.py). */
export default function Page() {
  return (
    <LegalPage title="Conditions générales de vente" href="/cgv/" updated="1er août 2026">
      <TexteLegal blocs={cgv} />
    </LegalPage>
  )
}
