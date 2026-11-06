import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, BadgeCheck, Check, ChevronRight, Power, Star } from 'lucide-react'
import type { Audience } from '@/data/catalogue'
import { findUnivers, formatPrice } from '@/data/catalogue'
import { googleRating, reviews } from '@/data/reviews'
import { realisationPhotos } from '@/data/images'
import { produitsHref, type Offer } from '@/data/v2/espaces'
import { JsonLd } from '@/components/ui'
import { asset } from '@/lib/site'
import { GuardLink } from './GuardLink'

export const delai = (ms: number) => ({ ['--delai' as string]: `${ms}ms` }) as React.CSSProperties

/** Modèles d'une gamme, limités à ceux d'un espace s'il est donné. */
export const modelsIn = (slug: string, espace?: Audience) =>
  (findUnivers(slug)?.models ?? []).filter((m) => !espace || m.audiences.includes(espace))

export const priceFrom = (slug: string, espace?: Audience) => {
  const p = modelsIn(slug, espace).flatMap((m) => (m.price != null ? [m.price] : []))
  return p.length ? `dès ${formatPrice(Math.min(...p))}` : 'Sur devis'
}

/** Photo en situation de chaque univers (public/img/situations/). */
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

export function SectionHead({
  eyebrow,
  title,
  text,
  action,
}: {
  eyebrow?: string
  title: ReactNode
  text?: ReactNode
  action?: ReactNode
}) {
  // Sans bouton, le texte passe à droite du titre : pas de grand vide à droite.
  if (text && !action) {
    return (
      <div className="grid items-end gap-6 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          {eyebrow && (
            <p className="v-eyebrow" data-reveal>
              {eyebrow}
            </p>
          )}
          <h2 className="v-display v-h2 mt-6" data-reveal style={delai(80)}>
            {title}
          </h2>
        </div>
        <p className="v-lead lg:col-span-5 lg:pb-2" data-reveal style={delai(140)}>
          {text}
        </p>
      </div>
    )
  }
  return (
    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="v-eyebrow" data-reveal>
            {eyebrow}
          </p>
        )}
        <h2 className="v-display v-h2 mt-6" data-reveal style={delai(80)}>
          {title}
        </h2>
        {text && (
          <p className="v-lead mt-5" data-reveal style={delai(140)}>
            {text}
          </p>
        )}
      </div>
      {action && (
        <div className="self-start md:self-auto" data-reveal style={delai(160)}>
          {action}
        </div>
      )}
    </div>
  )
}

/** Bandeau de mots qui défile (version Atelier). */
export function Marquee({ words, label = 'Nos équipements' }: { words: string[]; label?: string }) {
  return (
    <section className="v-marquee" aria-label={label}>
      <div className="v-marquee__track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center" aria-hidden={copy === 1 ? true : undefined}>
            {words.map((m) => (
              <span key={m} className="flex items-center">
                <span className="v-display whitespace-nowrap px-6 text-3xl lg:px-10 lg:text-5xl">{m}</span>
                <Power className="size-5 text-v-accent lg:size-6" strokeWidth={2.5} aria-hidden="true" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

/** Cartes à contour (version Plateau) : les trois cibles, des offres ou des packs. */
export function OfferCards({ offers, dark = false }: { offers: Offer[]; dark?: boolean }) {
  return (
    <ul className={`grid gap-5 lg:grid-cols-3 ${dark ? '' : ''}`}>
      {offers.map((o, i) => (
        <li key={o.title} className="v-card group" data-reveal style={delai(i * 90)}>
          <div className="relative aspect-[4/3] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={o.image} alt={o.alt} loading="lazy" className="size-full object-cover transition duration-700 ease-out group-hover:scale-[1.06]" />
            <span className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-[12px] font-semibold text-white backdrop-blur">
              {o.tag}
            </span>
          </div>
          <div className="flex flex-1 flex-col p-6">
            <h3 className="v-display text-[1.45rem] leading-tight">
              <Link href={o.href} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
                {o.title}
              </Link>
            </h3>
            <p className={`mt-3 text-[14.5px] leading-relaxed ${dark ? 'text-v-on-dark-soft' : 'text-v-soft'}`}>{o.text}</p>
            <ul className="mt-5 flex flex-col gap-2 text-[13.5px]">
              {o.points.map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <span className="v-tick">
                    <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <span aria-hidden="true" className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[13px] font-semibold">
              {o.cta}
              <ArrowRight className="size-3.5 transition group-hover:translate-x-1" />
            </span>
          </div>
        </li>
      ))}
    </ul>
  )
}

/**
 * Grille pêle-mêle des gammes (version Showroom) : la première prend un grand carré,
 * la quatrième une bande large ; légende en capitales, trait qui s'allonge au survol.
 * Sans espace (site général), chaque tuile rouvre la pop-up de choix d'espace.
 */
const BIG = 'col-span-2 row-span-2'
const WIDE = 'col-span-2'
/** Répartition selon le nombre de gammes, pour que la grille de 4 colonnes tombe juste. */
const mosaicSpans: Record<number, string[]> = {
  1: [BIG],
  2: [BIG, BIG],
  3: [BIG, WIDE, WIDE],
  4: [BIG, '', '', WIDE],
  5: [BIG, '', '', '', ''],
  6: [BIG, '', '', WIDE, WIDE, WIDE],
  7: [BIG, '', '', WIDE, '', '', WIDE],
}

export function GammeMosaic({ univers, espace, exclude }: { univers: string[]; espace?: Audience; exclude?: string }) {
  const list = univers.filter((s) => s !== exclude)
  return (
    <ul className="grid auto-rows-[190px] grid-cols-2 gap-2 sm:auto-rows-[240px] md:gap-3 lg:auto-rows-[clamp(220px,17vw,265px)] lg:grid-cols-4">
      {list.map((slug, i) => {
        const u = findUnivers(slug)!
        const big = i === 0
        const count = modelsIn(slug, espace).length
        const meta = `${count > 0 ? `${count} modèle${count > 1 ? 's' : ''} · ` : ''}${priceFrom(slug, espace)}`
        const cls = 'group relative flex size-full flex-col justify-end overflow-hidden bg-v-dark'
        const inner = (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={situation(slug)}
              alt={situationAlt[slug] ?? u.name}
              loading="lazy"
              className="absolute inset-0 size-full object-cover transition duration-[900ms] ease-out group-hover:scale-[1.05]"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
            <span
              aria-hidden="true"
              className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-full bg-white/90 text-black opacity-0 transition duration-300 group-hover:opacity-100 md:right-4 md:top-4"
            >
              <ArrowUpRight className="size-4" strokeWidth={2.25} />
            </span>
            <span className="relative block p-4 text-white md:p-6">
              <span className={`block font-bold uppercase leading-tight tracking-[0.06em] ${big ? 'text-[20px] md:text-[30px]' : 'text-[14px] md:text-[18px]'}`}>
                {u.navLabel}
              </span>
              <span aria-hidden="true" className="mt-2.5 block h-[3px] w-8 bg-v-dark-accent transition-all duration-300 group-hover:w-16" />
              <span className="mt-2.5 block text-[12px] font-medium text-white/75 md:text-[13px]">{meta}</span>
            </span>
          </>
        )
        return (
          <li key={slug} className={(mosaicSpans[list.length] ?? [])[i] ?? ''} data-reveal="image" style={delai(i * 60)}>
            {espace ? (
              <Link href={produitsHref(espace, slug)} className={cls} style={{ borderRadius: 'var(--v-radius)' }}>
                {inner}
              </Link>
            ) : (
              <GuardLink rest={`produits/${slug}/`} className={cls} style={{ borderRadius: 'var(--v-radius)' }}>
                {inner}
              </GuardLink>
            )}
          </li>
        )
      })}
    </ul>
  )
}

/** « Chaque projet est unique » (version Atelier) : trois colonnes décalées qui apparaissent au défilement. */
export function Projects({ items, title }: { items: { src: string; tag: string; caption: string }[]; title?: ReactNode }) {
  const columns = [items.slice(0, 2), items.slice(2, 4), items.slice(4, 6)]
  return (
    <section className="bg-v-alt py-24 lg:py-32">
      <div className="v-wrap">
        <SectionHead
          eyebrow="Réalisations"
          title={
            title ?? (
              <>
                Chaque projet est <em>unique</em>
              </>
            )
          }
          action={
            <Link href="/realisations/" className="v-btn v-btn--solid">
              Voir les {realisationPhotos.length} photos <ArrowRight aria-hidden="true" />
            </Link>
          }
        />
        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {columns.map((col, c) => (
            <div key={c} className={`flex flex-col gap-3 sm:gap-5 ${c === 1 ? 'lg:mt-24' : ''} ${c === 2 ? 'hidden lg:flex' : ''}`}>
              {col.map((p, i) => (
                <Link key={p.src + i} href="/realisations/" className="group block" data-reveal="image" style={delai((c + i) * 100)}>
                  <div className={`v-photo ${i === 0 ? 'aspect-[4/5]' : 'aspect-square'}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.src} alt={p.caption} loading="lazy" />
                  </div>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-v-accent">{p.tag}</p>
                  <p className="mt-1 text-[0.95rem] text-v-soft">{p.caption}</p>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Avis qui défilent (version Plateau, déjà sur le site actuel). */
export function Reviews() {
  return (
    <section className="v-dark py-24 lg:py-32">
      <div className="v-wrap text-center">
        <p className="v-eyebrow justify-center" data-reveal>
          <Star className="size-3.5 fill-current" aria-hidden="true" /> {googleRating.value} sur Google · {googleRating.count} avis
        </p>
        <h2 className="v-display v-h2 mt-6" data-reveal style={delai(80)}>
          Ils ont essayé, ils en <em>parlent</em>
        </h2>
      </div>
      <div className="v-reviews mt-14" aria-label="Avis clients">
        <ul className="v-reviews__track">
          {[...reviews, ...reviews].map((r, i) => (
            <li
              key={`${r.author}-${i}`}
              aria-hidden={i >= reviews.length || undefined}
              className="v-card w-[320px] shrink-0 p-6 text-left hover:!transform-none"
            >
              <div className="flex gap-0.5" aria-label="5 étoiles sur 5">
                {Array.from({ length: 5 }, (_, s) => (
                  <Star key={s} className="size-3.5 fill-v-dark-accent text-v-dark-accent" aria-hidden="true" />
                ))}
              </div>
              <p className="mt-4 text-[14px] leading-relaxed text-v-on-dark-soft">« {r.text} »</p>
              <p className="mt-5 text-[13px] font-semibold">{r.author}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** « Vos questions » (version Halo) : questions fréquentes et carte d'appel, côte à côte, sous chaque produit. */
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
  cta = { href: '/contact/', label: 'Demander un devis gratuit' },
}: {
  faq: { q: string; a: string }[]
  title?: ReactNode
  text?: string
  cta?: { href: string; label: string }
}) {
  return (
    <section className="border-t border-v-line">
      <FaqJsonLd items={faq} />
      <div className="v-wrap grid items-start gap-12 py-24 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:py-32">
        <div>
          <h2 className="v-display v-h2" data-reveal>
            Vos <em>questions</em>
          </h2>
          <div className="mt-10 divide-y divide-v-line border-y border-v-line">
            {faq.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[15px] font-semibold">
                  {f.q}
                  <ChevronRight className="size-4 shrink-0 text-v-soft transition group-open:rotate-90" aria-hidden="true" />
                </summary>
                <p className="mt-3 pr-8 text-[14.5px] leading-relaxed text-v-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="v-card relative overflow-hidden lg:sticky lg:top-28" style={{ borderRadius: 'calc(var(--v-radius) + 0.75rem)' }}>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -right-16 size-72 rounded-full blur-3xl"
            style={{ background: 'color-mix(in srgb, var(--v-accent) 22%, transparent)' }}
          />
          <div className="relative flex flex-col items-start px-7 py-12 sm:px-10 sm:py-14">
            <BadgeCheck className="size-7 text-v-soft" strokeWidth={1.5} aria-hidden="true" />
            <p className="v-display mt-6 text-[2.2rem] leading-[1.04] sm:text-[2.8rem]">{title}</p>
            <p className="mt-5 max-w-sm text-v-soft">{text}</p>
            <Link href={cta.href} className="v-btn v-btn--solid mt-9">
              {cta.label}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export function FaqJsonLd({ items }: { items: { q: string; a: string }[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      }}
    />
  )
}
