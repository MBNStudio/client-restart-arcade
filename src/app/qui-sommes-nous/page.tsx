import type { Metadata } from 'next'
import { Check } from 'lucide-react'
import { FinalCta } from '@/components/ui'
import { FaqShowroom } from '@/components/v2/FaqShowroom'
import { FaqJsonLd } from '@/components/v2/sections'
import { Block, CtaBand, Frame, PageHero, PaperCard, SectionHeading, BriefPoints } from '@/components/kit'
import { ambiance } from '@/data/images'
import { asset, site } from '@/lib/site'

export const metadata: Metadata = {
  title: "Qui sommes-nous : l'aménagement d'espaces conviviaux depuis l'Isère",
  description:
    "RESTART conçoit et personnalise des équipements de jeu et de détente pour les entreprises, les bars et les particuliers. Atelier à Villette-d'Anthon (38280), près de Lyon.",
  alternates: { canonical: '/qui-sommes-nous/' },
}

const values = [
  {
    title: 'Une équipe à votre service',
    text: 'Composée de professionnels en développement commercial, technique et marketing, notre équipe met à votre service son savoir-faire pour renforcer la fidélité à votre marque.',
  },
  {
    title: 'Personnalisé veut dire personnalisé',
    text: "Covering, couleurs de boutons, T-Molding, logo : vous validez un visuel avant que quoi que ce soit ne parte en fabrication. Aucune surprise à la réception.",
  },
  {
    title: 'Testé avant expédition',
    text: "Nos équipements sont testés et soigneusement emballés dans notre atelier avant chaque expédition.",
  },
  {
    title: 'Joignables après la vente',
    text: 'Garantie de 2 à 3 ans selon les modèles, et un service après-vente joignable par téléphone et par e-mail.',
  },
]

const faq = [
  {
    q: 'Où se trouve RESTART ?',
    a: `L'atelier RESTART est situé ${site.address.street}, ${site.address.postalCode} ${site.address.city}, dans l'est lyonnais (Isère).`,
  },
  {
    q: 'RESTART fabrique-t-il ses équipements ?',
    a: "Nous assemblons, personnalisons et testons les équipements dans notre atelier avant livraison. La personnalisation (covering PVC, couleurs, logo) est réalisée à la commande, sur la base d'un visuel que vous validez.",
  },
  {
    q: 'Travaillez-vous avec les particuliers comme avec les entreprises ?',
    a: "Oui. RESTART équipe les particuliers (salon, salle de jeux, coin détente), les entreprises (salles de pause, espaces d'accueil) et les bars, commerces et lieux de loisirs.",
  },
]

export default function QuiSommesNousPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: '/qui-sommes-nous/', label: 'Qui sommes-nous' }]}
        title="On ne vend pas des machines. On crée des endroits où les gens se croisent."
        visual={
          <Frame>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ambiance.showroom}
              alt="Le showroom RESTART : borne d'arcade, cible de fléchettes, baby-foot, fauteuil massant et cocon de repos"
              fetchPriority="high"
              className="aspect-[16/10] w-full object-cover"
            />
          </Frame>
        }
        brief={
          <BriefPoints
            items={[
              "Spécialiste français de l'aménagement d'espaces de convivialité",
              `Atelier et showroom à ${site.address.city} (${site.address.postalCode}), près de Lyon`,
              'Vente et location, personnalisation à votre image',
              'Livraison partout en France, garantie jusqu’à 3 ans',
            ]}
          />
        }
        primary={{ href: '/contact/', label: 'Nous contacter' }}
      />

      <Block>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {[
            ['7', "familles d'équipements"],
            ['13', 'modèles au catalogue'],
            ['3 ans', 'de garantie maximum'],
            ['5/5', 'sur les avis Google'],
          ].map(([v, l]) => (
            <div key={l} className="card-paper rounded-2xl p-6">
              <p className="font-serif text-4xl font-medium tracking-tight text-heading">{v}</p>
              <p className="mt-1 text-sm text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block>
        <div className="grid items-stretch gap-10 lg:grid-cols-[42fr_58fr] lg:gap-16">
          {/* Le titre sur une photo qui zoome très lentement. */}
          <div className="v-photo relative flex min-h-[22rem] items-end overflow-hidden lg:min-h-[28rem]" data-reveal="image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset('/img/v2/scenes/entreprise-1.webp')}
              alt="Collègues qui rient autour d'un baby-foot et d'une borne d'arcade, dans une salle de pause lumineuse"
              loading="lazy"
              className="v-kenburns absolute inset-0"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
            <h2 className="relative text-balance p-7 font-serif text-3xl font-medium tracking-tight text-white md:p-9 md:text-4xl">
              Un espace de pause vide reste vide. Un espace avec un jeu se remplit tout seul.
            </h2>
          </div>
          <div className="space-y-5 self-center text-foreground/75">
            <p>
              Les entreprises ont multiplié les chartes de qualité de vie au travail, les bars ont
              multiplié les écrans. Dans les deux cas, le problème est le même : rien ne donne
              vraiment aux gens une raison de rester ensemble au même endroit, quelques minutes,
              sans que ce soit une réunion ou une commande.
            </p>
            <p>
              Un baby-foot, une borne d&apos;arcade ou une cible de fléchettes résout ça sans mode
              d&apos;emploi. La partie dure cinq minutes, tout le monde sait jouer, et deux personnes
              qui ne se seraient pas parlé se retrouvent du même côté de la table.
            </p>
            <p>
              C&apos;est pour ça que nous commençons chaque projet par l&apos;espace et par les gens
              qui vont l&apos;occuper, avant de parler modèle et budget.
            </p>
          </div>
        </div>
      </Block>

      <Block>
        <SectionHeading title="Notre façon de travailler" />
        <div className="cards-dim mt-12 grid gap-5 sm:grid-cols-2">
          {values.map((v, i) => (
            <PaperCard
              key={v.title}
              delayMs={(i % 2) * 120}
              icon={<Check className="size-5 shrink-0 text-accent" strokeWidth={2.5} aria-hidden="true" />}
              title={v.title}
            >
              {v.text}
            </PaperCard>
          ))}
        </div>
      </Block>

      <CtaBand
        title="Venez essayer avant de choisir"
        subtitle="L'atelier est ouvert sur rendez-vous. C'est souvent la visite qui tranche entre deux modèles."
        primary={{ href: '/contact/', label: 'Nous contacter' }}
      />

      <section className="py-20 lg:py-28">
        <div className="v-wrap">
          <FaqJsonLd items={faq} />
          <FaqShowroom
            title={
              <>
                Vos <em>questions</em>
              </>
            }
            items={faq}
            photos={[ambiance.showroom, asset('/img/realisations/r117.webp'), asset('/img/v2/scenes/bar-commerce-1.webp')].map((src) => ({ src, alt: '' }))}
          />
        </div>
      </section>

      <FinalCta
        title="Un projet d'aménagement ? Parlons-en."
        subtitle="Décrivez-nous votre espace : nous revenons vers vous avec une proposition chiffrée."
      />
    </>
  )
}
