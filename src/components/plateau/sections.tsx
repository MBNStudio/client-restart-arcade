import type { ReactNode } from 'react'
import Link from 'next/link'
import { BadgeCheck, ChevronRight, Star } from 'lucide-react'
import { allModels, findUnivers, formatPrice, type Audience } from '@/data/catalogue'
import { googleRating, reviews } from '@/data/reviews'
import { asset } from '@/lib/site'

/** Sections Plateau communes à l'accueil général et aux accueils de chaque espace. */

export const priceFrom = (slug: string) => {
  const p = findUnivers(slug)?.models.flatMap((m) => (m.price != null ? [m.price] : [])) ?? []
  return p.length ? `dès ${formatPrice(Math.min(...p))}` : 'sur devis'
}

export const formulas: Record<Audience, string[]> = {
  entreprise: ['Achat ou location', 'Maintenance incluse en location', 'Usage libre, sans monnayeur', "Garantie jusqu'à 3 ans"],
  'bar-commerce': ['Location sans immobiliser de trésorerie', 'Monnayeur en option', 'Maintenance assurée', 'À vos couleurs'],
  particulier: ['Paiement en 2x, 3x ou 4x', 'Livré monté et installé', 'Prise en main sur place', "Garantie jusqu'à 3 ans"],
}

/** Photos en situation, tirées de restart-arcade.fr (public/img/situations/). */
export const situation = (slug: string) => asset(`/img/situations/${slug}.webp`)

export const situationAlt: Record<string, string> = {
  'borne-arcade': "Amis autour d'une borne d'arcade",
  flechettes: 'Partie de fléchettes électroniques sur une borne de fléchettes',
  'baby-foot': 'Baby-foot en bois dans une pièce lumineuse décorée de plantes',
  'fauteuil-massant': "Fauteuil massant dans l'espace détente d'une entreprise",
  billard: "Collègues autour d'un billard dans un espace de pause",
  'flipper-numerique': "Flipper numérique installé dans la cuisine d'un bureau",
  'cocon-de-repos': 'Cocon de repos dans une salle de récupération',
}

export function SectionTitle({ title, text, center = true }: { title: string; text?: ReactNode; center?: boolean }) {
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'}>
      <h2 className="pl-display text-[2.4rem] leading-[1.02] sm:text-[3.2rem]">{title}</h2>
      {text && <div className="mt-5 text-[16px] leading-relaxed text-pl-ink/55">{text}</div>}
    </div>
  )
}

/** Chiffres : la bande « ils nous font confiance » de Resend. */
export function StatsBand({ intro }: { intro: string }) {
  return (
    <section className="border-t border-pl-ink/[0.07]">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6">
        <p className="text-center text-sm text-pl-ink/45">{intro}</p>
        <ul className="mt-7 grid grid-cols-2 gap-y-6 text-center sm:grid-cols-5">
          <li>
            <span className="pl-stat">
              <span className="inline-flex items-center gap-1.5">
                <Star className="size-4 fill-pl-gold text-pl-gold" aria-hidden="true" />
                {googleRating.value}
              </span>
            </span>
            <span className="pl-stat-label">avis Google</span>
          </li>
          <li>
            <span className="pl-stat">{allModels.length}</span>
            <span className="pl-stat-label">modèles au catalogue</span>
          </li>
          <li>
            <span className="pl-stat">5 000</span>
            <span className="pl-stat-label">jeux sur les bornes PRO</span>
          </li>
          <li>
            <span className="pl-stat">48 h</span>
            <span className="pl-stat-label">pour recevoir un devis</span>
          </li>
          <li className="col-span-2 sm:col-span-1">
            <span className="pl-stat">3 ans</span>
            <span className="pl-stat-label">de garantie, au plus</span>
          </li>
        </ul>
      </div>
    </section>
  )
}

/** Avis : le défilé « Beyond expectations » de Resend. */
export function ReviewsBand() {
  return (
    <section>
      <div className="py-24 lg:py-32">
        <SectionTitle title="Ils ont essayé, ils en parlent" />
        <div className="pl-marquee mt-14" aria-label="Avis clients">
          <ul className="pl-marquee-track">
            {[...reviews, ...reviews].map((r, i) => (
              <li
                key={`${r.author}-${i}`}
                aria-hidden={i >= reviews.length}
                className="pl-card w-[320px] shrink-0 rounded-2xl p-6 text-left"
              >
                <div className="flex gap-0.5" aria-label="5 étoiles sur 5">
                  {Array.from({ length: 5 }, (_, s) => (
                    <Star key={s} className="size-3.5 fill-pl-gold text-pl-gold" aria-hidden="true" />
                  ))}
                </div>
                <p className="mt-4 text-[14px] leading-relaxed text-pl-ink/75">« {r.text} »</p>
                <p className="mt-5 text-[13px] font-semibold">{r.author}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/** Questions fréquentes et appel final, côte à côte. */
export function FaqCta({
  faq,
  title = (
    <>
      Le jeu, livré monté.
      <br />
      Partout en France.
    </>
  ),
  text = 'Décrivez votre projet en deux minutes : proposition chiffrée sous 48 heures.',
}: {
  faq: { q: string; a: string }[]
  title?: ReactNode
  text?: string
}) {
  return (
    <section className="border-t border-pl-ink/[0.07]">
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-5 py-24 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:py-32">
        <div>
          <SectionTitle center={false} title="Vos questions" />
          <div className="mt-10 divide-y divide-pl-ink/[0.08] border-y border-pl-ink/[0.08]">
            {faq.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[15px] font-medium">
                  {f.q}
                  <ChevronRight
                    className="size-4 shrink-0 text-pl-ink/40 transition group-open:rotate-90"
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-3 pr-8 text-[14px] leading-relaxed text-pl-ink/55">{f.a}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="pl-card relative overflow-hidden rounded-3xl lg:sticky lg:top-28">
          <div aria-hidden="true" className="pl-final-glow" />
          <div className="relative flex flex-col items-start px-7 py-12 sm:px-10 sm:py-14">
            <BadgeCheck className="size-7 text-pl-ink/60" strokeWidth={1.5} aria-hidden="true" />
            <p className="pl-display mt-6 text-[2.4rem] leading-[1.02] sm:text-[3rem]">{title}</p>
            <p className="mt-5 max-w-sm text-pl-ink/55">{text}</p>
            <Link
              href="/contact/"
              className="pl-btn-primary mt-9 inline-flex h-11 items-center gap-2 rounded-xl px-6 text-sm font-semibold"
            >
              Demander un devis gratuit
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
