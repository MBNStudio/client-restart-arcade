import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ContactFormWithPreset } from '@/components/ContactFormWithPreset'
import { Check } from 'lucide-react'
import { JsonLd } from '@/components/ui'
import { FaqShowroom } from '@/components/v2/FaqShowroom'
import { FaqJsonLd } from '@/components/v2/sections'
import { Frame, PageHero, BriefPoints } from '@/components/kit'
import { asset, site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact et devis gratuit sous 48 h',
  description:
    "Décrivez votre projet d'aménagement : borne d'arcade, fléchettes, baby-foot, billard ou flipper. Devis gratuit sous 48 h. RESTART, Villette-d'Anthon (38280), près de Lyon.",
  alternates: { canonical: '/contact/' },
}

const faq = [
  {
    q: 'Sous quel délai recevrai-je une réponse ?',
    a: 'Sous 48 heures ouvrées. Si votre projet est urgent, appelez directement le 06 67 44 36 02 : nous cadrons le besoin en quelques minutes au téléphone.',
  },
  {
    q: 'Le devis est-il payant ou engageant ?',
    a: "Ni l'un ni l'autre. Le devis et l'audit de vos espaces sont gratuits et sans engagement, y compris si nous nous déplaçons.",
  },
  {
    q: 'Intervenez-vous en dehors de la région lyonnaise ?',
    a: "Oui, nous livrons et installons partout en France métropolitaine. Notre atelier est à Villette-d'Anthon (38280), ce qui nous permet simplement d'être plus réactifs sur Lyon, Grenoble et Saint-Étienne.",
  },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: '/contact/', label: 'Contact' }]}
        title="Un devis gratuit, sous 48 heures"
        visual={
          <Frame>
            <div className="p-6 sm:p-8">
              <p className="mb-6 text-sm text-muted-foreground">
                Dites-nous où vous voulez installer et ce que vous imaginez. Même flou, même sans
                budget arrêté : c&apos;est justement le moment où on est le plus utile.
              </p>
              <Suspense fallback={<p className="text-sm text-muted-foreground">Chargement du formulaire…</p>}>
                <ContactFormWithPreset />
              </Suspense>
            </div>
          </Frame>
        }
        briefLabel="Nous joindre"
        brief={
          <address className="not-italic">
            <BriefPoints
              items={[
                <>
                  <a href={`tel:${site.phoneE164}`}>{site.phone}</a>, du lundi au vendredi de 9 h à
                  18 h
                </>,
                <a key="mail" href={`mailto:${site.email}`}>
                  {site.email}
                </a>,
                <a key="wa" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>,
                'Réponse sous 48 heures ouvrées',
              ]}
            />
          </address>
        }
        primary={null}
        secondary={null}
        row
        aside={
          <>
            <div className="card-paper h-full rounded-[24px] p-6">
              <h2 className="font-serif text-lg font-medium tracking-tight">Notre atelier</h2>
              <address className="mt-3 text-sm not-italic text-foreground/70">
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.city}
                <br />
                {site.address.region}
              </address>
              <p className="mt-3 text-sm text-foreground/70">
                Visite sur rendez-vous pour essayer les équipements avant de choisir.
              </p>
            </div>
            <div className="card-paper h-full rounded-[24px] p-6">
              <h2 className="font-serif text-lg font-medium tracking-tight">Ce qu&apos;on vous enverra</h2>
              <ul className="mt-3 space-y-2 text-sm text-foreground/70">
                {[
                  'Une proposition chiffrée, options comprises',
                  'Un visuel de personnalisation si vous en voulez une',
                  'Le délai réel de livraison et d’installation',
                  'Les deux formules : achat et location',
                ].map((x) => (
                  <li key={x} className="flex gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={2.5} aria-hidden="true" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </>
        }
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
            photos={['entreprise-2', 'bar-commerce-3', 'particulier-4'].map((n) => ({ src: asset(`/img/v2/scenes/${n}.webp`), alt: '' }))}
          />
        </div>
      </section>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          url: `${site.url}/contact/`,
          name: 'Contact RESTART',
          mainEntity: { '@id': `${site.url}/#localbusiness` },
        }}
      />
    </>
  )
}
