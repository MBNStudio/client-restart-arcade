import type { Metadata } from 'next'
import { formatPrice, univers } from '@/data/catalogue'
import { HeroSlider, type HeroSlide } from '@/components/HeroSlider'
import { HaloHero } from '@/components/HaloHero'
import { PlateauHome } from '@/components/plateau/PlateauHome'
import { CarrouselHome } from '@/components/carrousel/CarrouselHome'
import { heroImage } from '@/data/images'

export const metadata: Metadata = {
  title: "Bornes d'arcade, fléchettes et baby-foot personnalisés, en vente et en location",
  description:
    "RESTART équipe entreprises, bars et particuliers en bornes d'arcade, fléchettes électroniques, baby-foot, billards et flippers numériques. Personnalisation à votre image, livraison et installation partout en France.",
  alternates: { canonical: '/' },
}

const homeFaq = [
  {
    q: 'RESTART vend ou loue ses équipements ?',
    a: "Les deux. La vente concerne surtout les particuliers et les entreprises qui préfèrent investir. La location, réservée aux professionnels, inclut la livraison, l'installation et la maintenance, sans immobiliser de trésorerie. C'est la formule la plus fréquente en bar et en commerce.",
  },
  {
    q: 'Où RESTART livre-t-il ?',
    a: "Partout en France métropolitaine. Notre atelier est situé à Villette-d'Anthon (38280), dans l'est lyonnais, ce qui nous permet d'intervenir rapidement sur Lyon, Villeurbanne, Bourgoin-Jallieu, Grenoble et Saint-Étienne.",
  },
  {
    q: 'Peut-on personnaliser un équipement à ses couleurs ou à son logo ?',
    a: 'Oui. Le covering PVC, la couleur des boutons et le T-Molding sont personnalisables sur les bornes R-TWIN, R-EVOLUTION, R-PRO et R-DART PRO. Les baby-foot sont disponibles en 6 à 8 couleurs. Un visuel vous est soumis pour validation avant fabrication.',
  },
  {
    q: "Quel est le délai entre la commande et l'installation ?",
    a: 'Le devis est établi sous 48 heures. Pour un modèle standard, comptez ensuite deux à trois semaines. Pour un équipement entièrement personnalisé, le délai dépend de la validation du visuel et de la fabrication du covering.',
  },
  {
    q: 'Le paiement en plusieurs fois est-il possible ?',
    a: 'Oui, le paiement en 2, 3 ou 4 fois est disponible sur les achats en ligne. Pour les professionnels, la facturation et la location suivent les conditions précisées au devis.',
  },
]

/** Accroche de chaque gamme dans le carrousel, tirée de sa page univers. */
const heroTitles: Record<string, string> = {
  'borne-arcade': 'De la borne enfant à la borne pro avec monnayeur',
  flechettes: 'Plus de 30 modes de jeu, comptage automatique',
  'baby-foot': "Du hêtre massif aux modèles qui restent dehors toute l'année",
  'fauteuil-massant': 'Zéro gravité, chauffage lombaire et sept zones de massage',
  billard: "L'équipement qui retient le plus longtemps autour de lui",
  'flipper-numerique': 'Plus de 500 tables dans une seule machine',
  'cocon-de-repos': 'Vingt minutes de micro-sieste, isolé du bruit et de la lumière',
}

const heroAlt: Record<string, string> = {
  'borne-arcade': "Rangée de bornes d'arcade éclairées en bleu, joysticks colorés",
  flechettes: 'Fléchettes vertes plantées au centre de la cible',
  'baby-foot': 'Baby-foot colorés dans une salle lumineuse, des joueurs autour',
  'fauteuil-massant': "Fauteuil massant dans un salon de détente d'entreprise",
  billard: 'Billard dans une grande pièce lumineuse aux baies vitrées',
  'flipper-numerique': 'Plateau de flipper illuminé, bumpers et cartes à jouer',
  'cocon-de-repos': 'Cocons de repos Nap&Up installés dans une salle de récupération',
}

export default function Home() {
  const slides: HeroSlide[] = univers.map((u) => {
    const priced = u.models.flatMap((m) => (m.price != null ? [m.price] : []))
    return {
      slug: u.slug,
      image: heroImage(u.slug),
      alt: heroAlt[u.slug],
      name: u.name,
      title: heroTitles[u.slug],
      detail:
        priced.length > 1
          ? `${u.models.length} modèles, de ${formatPrice(Math.min(...priced))} à ${formatPrice(Math.max(...priced))}`
          : priced.length === 1
            ? `${formatPrice(priced[0])}, livré monté et installé`
            : 'Sur devis, en achat ou en location',
      href: `/produits/${u.slug}/`,
    }
  })

  return (
    <>
      <h1 className="sr-only">Transformez vos espaces avec RESTART.</h1>
      <div className="version-plateau">
        <PlateauHome faq={homeFaq} />
      </div>
      <div className="version-halo">
        <PlateauHome faq={homeFaq} hero={<HaloHero />} />
      </div>

      <div className="version-classic">
      <div className="version-studio pt-6 md:pt-8">
        <HeroSlider slides={slides} />
      </div>

      <CarrouselHome />
      </div>
    </>
  )
}
