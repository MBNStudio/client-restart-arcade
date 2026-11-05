import type { Metadata } from 'next'
import { GeneralHome } from '@/components/v2/Homes'

export const metadata: Metadata = {
  title: "Bornes d'arcade, fléchettes et baby-foot personnalisés, en vente et en location",
  description:
    "RESTART équipe bars, entreprises et particuliers en bornes d'arcade, fléchettes électroniques, baby-foot, billards et flippers numériques. Personnalisation à votre image, livraison et installation partout en France.",
  alternates: { canonical: '/' },
}

/** Site général, en une page (voir components/v2/Homes.tsx). */
export default function Home() {
  return <GeneralHome />
}
