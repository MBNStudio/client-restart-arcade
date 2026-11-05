import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PhotoWall, type PlateauShot } from '@/components/plateau/PlateauHero'
import { Breadcrumbs } from '@/components/ui'
import { realisationPhotos } from '@/data/images'
import { Reviews, delai } from '@/components/v2/sections'
import { GuardLink } from '@/components/v2/GuardLink'

export const metadata: Metadata = {
  title: 'Nos réalisations : espaces de pause, bars et salons équipés',
  description:
    "Installations RESTART chez nos clients, partout en France : bornes d'arcade personnalisées, fléchettes électroniques, baby-foot d'extérieur, billards, espaces de pause et salles de jeux.",
  alternates: { canonical: '/realisations/' },
}

/**
 * Nos réalisations : le mur de références qui défile de la version Plateau, gardé
 * pour cette page et pas pour l'accueil (mail du 5 novembre), puis toutes les photos.
 * Les photos sont celles publiées sur restart-arcade.fr.
 */
export default function RealisationsPage() {
  const shots: PlateauShot[] = realisationPhotos.map((src, i) => ({
    name: '',
    image: src,
    alt: `Installation RESTART chez un client, photo ${i + 1}`,
    href: '#galerie',
  }))

  return (
    <>
      <section className="v-wall-zone overflow-hidden pb-12 pt-6 lg:pb-20">
        <div className="v-wrap">
          <Breadcrumbs items={[{ href: '/realisations/', label: 'Nos réalisations' }]} />
          <div className="mt-6 grid items-center gap-10 lg:grid-cols-[0.95fr_1.15fr] lg:gap-6">
            <div className="relative z-10">
              <p className="v-eyebrow v-appear">Nos réalisations</p>
              <h1 className="v-display v-h1 mt-6">
                <span className="v-line">
                  <span style={delai(150)}>Ils nous ont</span>
                </span>
                <span className="v-line">
                  <span style={delai(260)}>
                    confié leurs <em>espaces</em>.
                  </span>
                </span>
              </h1>
              <p className="v-lead v-appear mt-6 max-w-md" style={delai(450)}>
                Bars, campings, entreprises, salons : {realisationPhotos.length} installations, de la borne personnalisée au
                baby-foot d&apos;extérieur, livrées et installées partout en France.
              </p>
              <div className="v-appear mt-9 flex flex-wrap gap-3" style={delai(600)}>
                <Link href="/contact/" className="v-btn v-btn--solid">
                  Parlons de votre projet <ArrowRight aria-hidden="true" />
                </Link>
                <GuardLink rest="produits/" className="v-btn v-btn--line">
                  Voir les produits
                </GuardLink>
              </div>
            </div>
            <PhotoWall shots={shots} />
          </div>
        </div>
      </section>

      <section id="galerie" className="border-t border-v-line py-24 lg:py-28">
        <div className="v-wrap">
          <h2 className="v-display v-h2" data-reveal>
            Toutes les <em>photos</em>
          </h2>
          <ul className="mt-12 columns-2 gap-3 sm:gap-5 lg:columns-3">
            {realisationPhotos.map((src, i) => (
              <li key={src} className="mb-3 break-inside-avoid sm:mb-5" data-reveal="image" style={delai((i % 3) * 80)}>
                <div className="v-photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`Installation RESTART chez un client, photo ${i + 1}`} loading="lazy" className="!h-auto" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Reviews />
    </>
  )
}
