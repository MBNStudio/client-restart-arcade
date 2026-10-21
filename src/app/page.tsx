import type { Metadata } from 'next'
import { AtelierHome } from '@/components/atelier/AtelierHome'

export const metadata: Metadata = {
  title: "Bornes d'arcade, fléchettes et baby-foot personnalisés, en vente et en location",
  description:
    "RESTART équipe entreprises, bars et particuliers en bornes d'arcade, fléchettes électroniques, baby-foot, billards et flippers numériques. Personnalisation à votre image, livraison et installation partout en France.",
  alternates: { canonical: '/' },
}

export default function Home() {
  return <AtelierHome />
}
