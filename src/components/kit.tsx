import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowRight, BookOpen, Check, ChevronRight, MapPin, Phone, Power } from 'lucide-react'
import { readingTime, type BlogPost } from '@/data/blog'
import { site } from '@/lib/site'
import { Reveal } from '@/components/Reveal'
import { Breadcrumbs } from '@/components/ui'

/*
 * Kit de mise en page « Studio doré » : cartes blanches très arrondies posées
 * sur un fond neutre, boutons pilule, grand média central. Toutes les pages
 * passent par ces composants, le thème actif fournit couleurs et polices.
 */

export const SECTION_HEADING =
  'mx-auto max-w-3xl text-balance text-center font-serif text-3xl font-medium tracking-tight md:text-[2.5rem] md:leading-[1.1]'

export const VISUAL_CARD_CLASS =
  'relative isolate flex flex-col gap-3 overflow-hidden rounded-[24px] border border-border bg-card p-3 pb-5 shadow-[var(--shadow-paper-sm)] [&>span:not([aria-hidden])]:px-2'

/** Halo flou, posé dans l'angle des cartes visuelles. */
export function Glow({ className = '-right-12 -top-14 size-40 bg-accent/10' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 rounded-full blur-3xl ${className}`}
    />
  )
}

/** Pastille ronde reprenant le symbole « marche » du logo RESTART. */
export function BrandMark({ className = 'size-8' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground ${className}`}
    >
      <Power className="size-[55%]" strokeWidth={2.5} />
    </span>
  )
}

/** Bouton principal : pilule pleine. */
export function SheenButton({
  href,
  children,
  className = '',
  size = 'md',
}: {
  href: string
  children: ReactNode
  className?: string
  size?: 'md' | 'lg'
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-primary font-semibold text-primary-foreground shadow-[0_8px_20px_-10px_rgba(0,0,0,0.55)] transition hover:-translate-y-px hover:brightness-125 ${
        size === 'lg' ? 'h-12 px-7 text-base' : 'h-11 px-5 text-sm'
      } ${className}`}
    >
      {children}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
    </Link>
  )
}

export function GhostButton({ href, children }: { href: string; children: ReactNode }) {
  const cls =
    'inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-input bg-card px-5 text-sm font-semibold transition hover:bg-muted'
  return href.startsWith('tel:') || href.startsWith('mailto:') ? (
    <a href={href} className={cls}>
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  )
}

/** Carte du grand média : coins très arrondis, fond neutre. */
export function Frame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`min-w-0 overflow-hidden rounded-[28px] border border-border bg-card shadow-[var(--shadow-paper-md)] ${className}`}
    >
      {children}
    </div>
  )
}

/** Encadré de synthèse : carte sombre, puces cochées. */
export function BriefCard({ label = 'En bref', children }: { label?: string; children: ReactNode }) {
  return (
    <aside
      aria-label={label}
      className="card-brand h-full w-full rounded-[24px] px-6 py-7 text-sm leading-relaxed sm:px-8 md:text-[15px]"
    >
      <Glow className="-right-16 -top-20 size-56 bg-[#f2a457]/25" />
      <div className="[&_a]:underline [&_a]:underline-offset-2">{children}</div>
    </aside>
  )
}

/** Puces cochées de l'encadré de synthèse. */
export function BriefPoints({ items }: { items: ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-white/12 md:mt-1">
            <Check className="size-3" strokeWidth={3} aria-hidden="true" />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/**
 * Carte d'en-tête : libellé, H1, chapô facultatif, puis une ligne de pied
 * avec la marque à gauche et les actions à droite.
 */
export function InfoCard({
  eyebrow,
  title,
  lead,
  primary,
  secondary,
}: {
  eyebrow?: ReactNode
  title: ReactNode
  lead?: ReactNode
  primary?: { href: string; label: string } | null
  secondary?: { href: string; label: string } | null
}) {
  return (
    <div className="relative rounded-[28px] border border-border bg-card px-6 pb-6 pt-7 shadow-[var(--shadow-paper-sm)] sm:px-8 sm:pt-8">
      <a
        href={`tel:${site.phoneE164}`}
        aria-label={`Appeler RESTART au ${site.phone}`}
        className="absolute right-6 top-6 hidden size-11 items-center justify-center rounded-full border border-input bg-card text-foreground transition hover:bg-muted sm:inline-flex"
      >
        <Phone className="size-4" aria-hidden="true" />
      </a>
      {eyebrow && <p className="mb-3 text-sm text-muted-foreground">{eyebrow}</p>}
      <h1 className="max-w-3xl text-balance font-serif text-[2rem] font-medium leading-[1.06] tracking-tight sm:pr-14 sm:text-[2.5rem] lg:text-[2.875rem]">
        {title}
      </h1>
      {lead && (
        <div className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {lead}
        </div>
      )}
      <div className="mt-6 flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        <span className="inline-flex items-center gap-2.5 text-sm text-ink-soft">
          <BrandMark className="size-7" />
          <span>
            <span className="font-semibold text-foreground">RESTART</span>
            <span className="text-muted-foreground"> · {site.tagline}</span>
          </span>
        </span>
        {(primary || secondary) && (
          <div className="flex flex-wrap items-center gap-2.5">
            {secondary && (
              <GhostButton href={secondary.href}>
                {secondary.href.startsWith('tel:') && <Phone className="size-4" aria-hidden="true" />}
                {secondary.label}
              </GhostButton>
            )}
            {primary && <SheenButton href={primary.href}>{primary.label}</SheenButton>}
          </div>
        )}
      </div>
    </div>
  )
}

/** Carte « Conçu par » : l'atelier, l'adresse et une ligne directe. */
export function MakerCard() {
  return (
    <div className="h-full rounded-[24px] border border-border bg-card p-6 shadow-[var(--shadow-paper-sm)]">
      <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
        Conçu et installé par
      </p>
      <div className="mt-3 flex items-center gap-3">
        <BrandMark className="size-11" />
        <div>
          <p className="text-lg font-semibold tracking-tight text-heading">RESTART</p>
          <p className="text-sm text-muted-foreground">{site.tagline}</p>
        </div>
      </div>
      <ul className="mt-5 space-y-2.5 border-t border-border pt-4 text-sm">
        <li className="flex items-start gap-2.5 text-ink-soft">
          <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          Atelier à {site.address.city} ({site.address.postalCode}), livraison partout en France
        </li>
        <li>
          <a
            href={`tel:${site.phoneE164}`}
            className="flex items-center gap-2.5 font-medium text-foreground transition hover:text-accent"
          >
            <Phone className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            {site.phone}
          </a>
        </li>
      </ul>
    </div>
  )
}

/** Carte de repères chiffrés, présentée comme une fiche technique. */
export function SpecsCard({
  title = 'Repères',
  rows,
}: {
  title?: string
  rows: { label: string; value: ReactNode }[]
}) {
  return (
    <div className="rounded-[24px] border border-border bg-card p-6 shadow-[var(--shadow-paper-sm)]">
      <h2 className="text-lg font-semibold tracking-tight text-heading">{title}</h2>
      <dl className="mt-3 divide-y divide-border text-sm">
        {rows.map((r) => (
          <div key={r.label} className="flex items-baseline justify-between gap-6 py-2.5">
            <dt className="text-muted-foreground">{r.label}</dt>
            <dd className="text-right font-medium text-foreground">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

/** Trois engagements côte à côte, chacun avec son icône en pastille. */
export function FeatureTrio({
  items,
}: {
  items: { icon: ReactNode; title: string; text: string }[]
}) {
  return (
    <ul className="grid gap-6 rounded-[24px] border border-border bg-card p-6 shadow-[var(--shadow-paper-sm)] sm:grid-cols-3 sm:gap-4">
      {items.map((it) => (
        <li key={it.title}>
          <span className="inline-flex size-10 items-center justify-center rounded-full bg-muted text-foreground">
            {it.icon}
          </span>
          <p className="mt-3 text-sm font-semibold text-foreground">{it.title}</p>
          <p className="mt-0.5 text-sm leading-snug text-muted-foreground">{it.text}</p>
        </li>
      ))}
    </ul>
  )
}

/** Carte sombre d'appel à l'action, sous le média. */
export function DarkCta({
  title,
  text,
  href = '/contact/',
  label = 'Demander un devis',
}: {
  title: string
  text: string
  href?: string
  label?: string
}) {
  return (
    <div className="card-brand flex flex-col gap-5 rounded-[24px] p-7 sm:flex-row sm:items-center sm:justify-between">
      <Glow className="-left-10 -bottom-24 size-56 bg-[#f2a457]/25" />
      <div>
        <p className="text-lg font-semibold tracking-tight text-white">{title}</p>
        <p className="mt-1 text-sm text-white/65">{text}</p>
      </div>
      <Link
        href={href}
        className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#141414] transition hover:bg-[#fff4e2]"
      >
        {label}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </Link>
    </div>
  )
}

/**
 * Hero du gabarit : fil d'Ariane, carte d'en-tête (libellé, H1, actions), grand
 * média, puis deux colonnes : la synthèse sur carte sombre à gauche, la carte
 * de l'atelier (ou un contenu dédié) à droite.
 */
export function PageHero({
  crumbs,
  title,
  visual,
  brief,
  briefLabel,
  primary = { href: '/contact/', label: 'Demander un devis' },
  secondary = { href: `tel:${site.phoneE164}`, label: 'Appeler' },
  aside,
  row = false,
}: {
  /** Synthèse et cartes de côté sur une seule rangée de même hauteur (une carte par colonne). */
  row?: boolean
  crumbs?: { href: string; label: string }[]
  title: ReactNode
  visual: ReactNode
  brief: ReactNode
  briefLabel?: string
  primary?: { href: string; label: string } | null
  secondary?: { href: string; label: string } | null
  aside?: ReactNode
}) {
  const eyebrow = crumbs && crumbs.length > 1 ? crumbs[crumbs.length - 2].label : briefLabel
  return (
    <section className="relative mx-auto w-full max-w-5xl px-4 pb-8 pt-8 sm:px-6 md:pb-10 md:pt-10">
      {crumbs && <Breadcrumbs items={crumbs} />}
      <InfoCard eyebrow={eyebrow} title={title} primary={primary} secondary={secondary} />
      <div className="relative mt-6 w-full min-w-0">{visual}</div>
      {row ? (
        <div className="mt-6 grid items-stretch gap-6 md:grid-cols-3">
          <BriefCard label={briefLabel}>{brief}</BriefCard>
          {aside}
        </div>
      ) : (
        // Cartes de même hauteur : la synthèse s'étire à la hauteur de la colonne de droite.
        <div className="mt-6 grid items-stretch gap-6 lg:grid-cols-[1fr_360px]">
          <BriefCard label={briefLabel}>{brief}</BriefCard>
          <div className="flex flex-col gap-6 [&>*:only-child]:h-full">{aside ?? <MakerCard />}</div>
        </div>
      )}
    </section>
  )
}

export function SectionHeading({ title, subtitle }: { title: ReactNode; subtitle?: ReactNode }) {
  return (
    <>
      <h2 className={SECTION_HEADING}>{title}</h2>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-2xl text-balance text-center text-base text-muted-foreground md:text-lg">
          {subtitle}
        </p>
      )}
    </>
  )
}

/** Section standard. `band` la pose sur une grande carte blanche arrondie. */
export function Block({
  children,
  className = '',
  id,
  band = false,
}: {
  children: ReactNode
  className?: string
  id?: string
  band?: boolean
}) {
  const inner = (
    <section
      id={id}
      className={`mx-auto w-full max-w-6xl scroll-mt-28 px-4 py-12 sm:px-6 md:py-16 ${className}`}
    >
      {children}
    </section>
  )
  return band ? (
    <div className="mx-auto w-full max-w-7xl px-3 sm:px-6">
      <div className="rounded-[32px] border border-border bg-card shadow-[var(--shadow-paper-sm)]">
        {inner}
      </div>
    </div>
  ) : (
    inner
  )
}

/** Bandeau CTA : carte sombre pleine largeur. */
export function CtaBand({
  title = 'Livré monté, installé, prêt à jouer',
  subtitle = 'Devis gratuit sous 48 h. Achat ou location, partout en France.',
  primary = { href: '/contact/', label: 'Demander un devis' },
  secondary = { href: '/realisations/', label: 'Nos réalisations' },
}: {
  title?: string
  subtitle?: string
  primary?: { href: string; label: string }
  secondary?: { href: string; label: string }
}) {
  return (
    <div className="mx-auto my-6 w-full max-w-6xl px-4 sm:px-6">
      <section className="card-brand flex flex-col gap-6 rounded-[28px] px-7 py-9 md:flex-row md:items-center md:justify-between md:px-10">
        <Glow className="-right-10 -top-24 size-72 bg-[#f2a457]/25" />
        <div>
          <h2 className="text-2xl font-medium tracking-tight text-white md:text-3xl">{title}</h2>
          <p className="mt-2 text-white/65">{subtitle}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2.5">
          <Link
            href={secondary.href}
            className="inline-flex h-11 items-center justify-center rounded-full border border-white/20 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            {secondary.label}
          </Link>
          <Link
            href={primary.href}
            className="group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#141414] transition hover:bg-[#fff4e2]"
          >
            {primary.label}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export type RowItem = { href: string; title: string; summary?: string; image?: string }

/** Liste en lignes : survoler une ligne estompe les autres. */
export function RowList({ items }: { items: RowItem[] }) {
  return (
    <ul className="rows-dim mt-10 grid gap-x-10 border-t border-border sm:grid-cols-2">
      {items.map((it) => (
        <li key={it.href} className="border-b border-border">
          <Link href={it.href} className="group flex items-center gap-4 py-4">
            {it.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={it.image}
                alt=""
                loading="lazy"
                className="size-12 shrink-0 rounded-2xl border border-border bg-white object-contain p-1 transition duration-500 group-hover:scale-105"
              />
            )}
            <span className="min-w-0 flex-1">
              <span className="block text-base font-semibold leading-snug tracking-tight text-heading">
                {it.title}
              </span>
              {it.summary && (
                <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                  {it.summary}
                </span>
              )}
            </span>
            <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-border transition group-hover:bg-primary group-hover:text-primary-foreground">
              <ChevronRight className="size-4" strokeWidth={2} aria-hidden="true" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

/** Liste d'articles « Pour aller plus loin ». */
export function ArticleRows({ posts }: { posts: BlogPost[] }) {
  return (
    <ul className="mt-10 overflow-hidden rounded-[24px] border border-border bg-card shadow-[var(--shadow-paper-sm)]">
      {posts.map((p, i) => (
        <li key={p.slug} className={i > 0 ? 'border-t border-border' : ''}>
          <Link
            href={`/blog/${p.slug}/`}
            className="group flex items-center gap-4 px-5 py-4 transition hover:bg-muted sm:px-6"
          >
            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
              <BookOpen className="size-4 text-foreground" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1 font-medium leading-snug">{p.title}</span>
            <span className="hidden shrink-0 text-xs text-muted-foreground sm:block">
              {readingTime(p.words)} min de lecture
            </span>
            <ChevronRight
              className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
              strokeWidth={2}
              aria-hidden="true"
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}

/** Cartes à icône (engagements sans visuel). */
export function PaperCard({
  icon,
  title,
  children,
  delayMs = 0,
  className = '',
}: {
  icon?: ReactNode
  title: ReactNode
  children: ReactNode
  delayMs?: number
  className?: string
}) {
  return (
    <Reveal
      delayMs={delayMs}
      className={`card-paper flex cursor-default flex-col gap-3 rounded-[24px] p-6 transition duration-300 hover:-translate-y-0.5 ${className}`}
    >
      {icon && (
        <span className="inline-flex size-10 items-center justify-center rounded-full bg-muted">
          {icon}
        </span>
      )}
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <div className="text-sm leading-relaxed text-muted-foreground">{children}</div>
    </Reveal>
  )
}
