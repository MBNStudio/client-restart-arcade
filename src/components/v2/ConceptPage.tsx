import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Audience } from '@/data/catalogue'
import { espaceHref, espaceV2, produitsHref } from '@/data/v2/espaces'
import { Breadcrumbs } from '@/components/ui'
import { Chapters } from './Chapters'
import { Marquee, Reviews, delai } from './sections'

const titles: Record<Audience, { title: string; description: string; crumb: string }> = {
  'bar-commerce': {
    title: 'Notre concept : faire de votre établissement un lieu de vie',
    description:
      "Le concept RESTART pour les bars, restaurants, campings et commerces : des jeux qui prolongent le temps passé sur place, fidélisent vos clients et portent votre enseigne. Achat ou location, monnayeur en option.",
    crumb: 'Notre concept',
  },
  entreprise: {
    title: 'Le concept : des lieux de passage devenus lieux de vie',
    description:
      "Le concept RESTART pour les entreprises : des salles de pause et des espaces d'accueil qui créent du lien, au service du bien-être de vos collaborateurs et de l'expérience de vos visiteurs.",
    crumb: 'Le concept',
  },
  particulier: {
    title: 'Je crée : une borne, des fléchettes, un baby-foot à votre image',
    description:
      "Personnalisez votre jeu RESTART : covering, boutons LED ou dorés, stickers, porte-gobelet. Assemblé dans notre atelier en Isère, livré et installé partout en France, Corse comprise.",
    crumb: 'Je crée',
  },
}

export const conceptMetadata = (id: Audience): Metadata => ({
  title: titles[id].title,
  description: titles[id].description,
  alternates: { canonical: espaceHref(id, 'concept/') },
})

/**
 * Page « Notre concept » (« Je crée » pour les particuliers) : expliquée avec les
 * blocs qui entrent au défilement de la version Panorama (mail du 5 novembre).
 */
export function ConceptView({ id }: { id: Audience }) {
  const e = espaceV2(id)
  const c = e.concept
  const blocks = c.blocks.map((b, i) => ({
    ...b,
    id: i === c.blocks.length - 1 ? 'livraison' : `concept-${i + 1}`,
    cta: i === 1 ? { href: produitsHref(id), label: 'Voir les produits' } : null,
  }))

  return (
    <>
      <section className="pb-20 pt-6 lg:pb-28">
        <div className="v-wrap">
          <Breadcrumbs
            items={[
              { href: e.path, label: e.label },
              { href: espaceHref(id, 'concept/'), label: titles[id].crumb },
            ]}
          />
          <div className="mt-10 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="v-eyebrow v-appear">{titles[id].crumb}</p>
              <h1 className="v-display v-h1 mt-6">
                <span className="v-line">
                  <span style={delai(150)}>{c.title}</span>
                </span>
                <span className="v-line">
                  <span style={delai(260)}>
                    <em>{c.accent}</em>.
                  </span>
                </span>
              </h1>
            </div>
            <div className="flex flex-col justify-end gap-5 lg:col-span-5">
              {c.intro.map((p, i) => (
                <p key={i} className="v-lead v-appear" style={delai(400 + i * 120)}>
                  {p}
                </p>
              ))}
              <div className="v-appear mt-3 flex flex-wrap gap-3" style={delai(700)}>
                <Link href={produitsHref(id)} className="v-btn v-btn--solid">
                  Voir les produits <ArrowRight aria-hidden="true" />
                </Link>
                <Link href="/contact/" className="v-btn v-btn--line">
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Marquee words={id === 'particulier' ? ['Vos couleurs', 'Boutons LED', 'Bouton « Gold »', 'Sticker enfant', 'Porte-gobelet', 'Livré monté'] : ['Vos couleurs', 'Votre logo', 'Votre identité', 'Achat ou location', 'Partout en France']} />

      <Chapters blocks={blocks} />

      <Reviews />
    </>
  )
}
