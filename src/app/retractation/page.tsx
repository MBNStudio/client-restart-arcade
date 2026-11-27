import type { Metadata } from 'next'
import { LegalPage } from '@/components/LegalPage'
import { TexteLegal } from '@/components/TexteLegal'
import { articlesCgv } from '@/data/legal'

export const metadata: Metadata = {
  title: 'Droit de rétractation',
  description: 'Droit de rétractation Restart Arcade : délai, exercice, retour, remboursement et exceptions (articles 23 à 27 des CGV).',
  alternates: { canonical: '/retractation/' },
}

/** Aucun texte rédigé ici : les articles 23 à 27 des CGV en vigueur. */
export default function Page() {
  return (
    <LegalPage title="Droit de rétractation" href="/retractation/" updated="1er août 2026">
      <p>
        Extrait des <a href="/cgv/">Conditions générales de vente</a>, articles 23 à 27.
      </p>
      <TexteLegal blocs={articlesCgv(23, 27)} />
    </LegalPage>
  )
}
