'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronDown, Menu, Phone, X } from 'lucide-react'
import { findUnivers, univers as allUnivers } from '@/data/catalogue'
import { universImage } from '@/data/images'
import { espacesV2, espaceV2, produitsHref } from '@/data/v2/espaces'
import { openEspaceChooser } from '@/lib/espace'
import { useEspace } from '@/lib/v2/useEspace'
import { site } from '@/lib/site'
import { contactClick, ctaClick } from '@/lib/analytics'
import { Brand } from './Brand'
import { GuardLink } from './GuardLink'

/** Pages qui s'ouvrent par une vidéo plein écran : l'en-tête passe par-dessus, en blanc. */
const overlayPaths = ['/', ...espacesV2.map((e) => e.path)]

const generalNav = [
  { label: 'Réalisations', href: '/realisations/' },
  { label: 'Qui sommes-nous', href: '/qui-sommes-nous/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contact', href: '/contact/' },
]

/**
 * En-tête : la présentation de la version Plateau (barre transparente en haut de page
 * qui se resserre en pilule flottante au défilement, méga-menu Produits en photos).
 * Le menu suit l'espace : celui du site actuel pour chacun des trois publics, et un
 * menu court sur le site général, où « Produits » rouvre la pop-up de choix d'espace.
 */
export function SiteHeader() {
  const pathname = usePathname()
  const espace = useEspace()
  const e = espace ? espaceV2(espace) : null
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mega, setMega] = useState(false)
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const overlay = overlayPaths.includes(pathname)

  useEffect(() => {
    setOpen(false)
    setMega(false)
  }, [pathname])

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      // Se cache en descendant, revient dès qu'on remonte.
      setHidden(y > 400 && y > last + 4)
      if (y < last - 4) setHidden(false)
      last = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!mega) return
    const onDown = (ev: PointerEvent) => {
      if (!rootRef.current?.contains(ev.target as Node)) setMega(false)
    }
    const onKey = (ev: KeyboardEvent) => ev.key === 'Escape' && setMega(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [mega])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  const nav = e ? e.nav : generalNav
  const uList = e ? e.univers.map((s) => findUnivers(s)!) : allUnivers
  const top = !scrolled && !open && !mega
  const homeHref = e ? e.path : '/'
  const current = (href: string) => (pathname === href.split('#')[0] ? 'page' : undefined)

  const productCard = (u: (typeof allUnivers)[number], i: number) => {
    const inner = (
      <>
        <span className="block aspect-[4/3] overflow-hidden rounded-[calc(var(--v-radius)-0.2rem)] bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={universImage(u.slug)} alt="" loading="lazy" className="size-full object-contain p-2 transition duration-500 group-hover:scale-105" />
        </span>
        <span className="flex flex-col gap-0.5 px-2 py-2.5">
          <span className="text-sm font-semibold">{u.navLabel}</span>
          <span className="text-xs text-v-soft">
            {(() => {
              const n = u.models.filter((m) => !e || m.audiences.includes(e.id)).length
              return n > 0 ? `${n} modèle${n > 1 ? 's' : ''}` : 'Sur devis'
            })()}
          </span>
        </span>
      </>
    )
    const cls = 'group flex h-full flex-col rounded-[var(--v-radius)] border border-v-line p-1.5 transition hover:border-v-accent'
    return (
      <li key={u.slug} className="v-mega__item" style={{ ['--i' as string]: i }}>
        {e ? (
          <Link href={produitsHref(e.id, u.slug)} className={cls}>
            {inner}
          </Link>
        ) : (
          <GuardLink rest={`produits/${u.slug}/`} className={cls}>
            {inner}
          </GuardLink>
        )}
      </li>
    )
  }

  return (
    <header
      className="v-header"
      data-overlay={overlay || undefined}
      data-top={top || undefined}
      data-open={open || mega || undefined}
      data-hidden={(hidden && !open && !mega) || undefined}
    >
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-v-btn focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-v-btn-ink"
      >
        Aller au contenu
      </a>

      <div ref={rootRef} className="v-header__pill">
        <Link href={homeHref} aria-label={`RESTART, accueil${e ? ` ${e.label}` : ''}`} className="shrink-0">
          <Brand />
        </Link>

        <nav className="hidden items-center gap-5 whitespace-nowrap xl:flex 2xl:gap-6" aria-label="Navigation principale">
          <button
            type="button"
            className="v-nav-link inline-flex items-center gap-1"
            aria-expanded={mega}
            aria-controls="v-mega"
            onClick={() => setMega((v) => !v)}
          >
            Produits
            <ChevronDown className={`size-3.5 transition-transform duration-500 ${mega ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="v-nav-link" aria-current={current(n.href)}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 md:gap-2">
          <button
            type="button"
            onClick={() => openEspaceChooser('')}
            className="hidden h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 text-[13px] font-semibold opacity-90 transition hover:opacity-100 md:inline-flex"
            style={{ borderColor: 'color-mix(in srgb, currentColor 22%, transparent)' }}
            title="Changer d'espace"
          >
            {e ? e.short : 'Mon espace'}
            <ChevronDown className="size-3.5" aria-hidden="true" />
          </button>
          <a
            href={`tel:${site.phoneE164}`}
            onClick={() => contactClick('phone', 'header')}
            className="hidden h-10 items-center gap-2 px-2 text-sm font-medium opacity-85 transition hover:opacity-100 min-[1700px]:inline-flex"
          >
            <Phone className="size-3.5" aria-hidden="true" />
            {site.phone}
          </a>
          <Link
            href="/contact/"
            onClick={() => ctaClick('Demander un devis', 'header')}
            className="v-header__cta hidden h-10 shrink-0 items-center whitespace-nowrap rounded-full px-5 text-sm font-semibold transition hover:-translate-y-px sm:inline-flex"
            style={{ borderRadius: 'var(--v-pill)' }}
          >
            {e?.kind === 'boutique' ? 'Nous contacter' : 'Devis gratuit'}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            aria-controls="v-menu-mobile"
            className="inline-flex size-10 items-center justify-center rounded-full border transition xl:hidden"
            style={{ borderColor: 'color-mix(in srgb, currentColor 22%, transparent)' }}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Méga-menu Produits */}
      <div id="v-mega" className="v-mega" data-open={mega || undefined} aria-hidden={!mega}>
        <ul className="grid gap-3 p-5" style={{ gridTemplateColumns: `repeat(${Math.min(uList.length, 7)}, minmax(0, 1fr))` }}>
          {uList.map(productCard)}
        </ul>
        <div className="flex items-center justify-between gap-6 border-t border-v-line bg-v-alt/60 px-6 py-4">
          <div className="min-w-0">
            <p className="text-sm font-semibold">
              {e ? `Les produits ${e.label === 'Particulier' ? 'pour la maison' : `pour ${e.label === 'Entreprise' ? 'les entreprises' : 'les bars et commerces'}`}` : 'Pas sûr du modèle ? On vous conseille.'}
            </p>
            <p className="mt-0.5 text-xs text-v-soft">
              {e?.kind === 'boutique' ? 'Prix affichés, livrés montés, paiement en 2x, 3x ou 4x.' : 'Audit de votre espace et devis gratuits, réponse sous 48 heures.'}
            </p>
          </div>
          {e ? (
            <Link href={produitsHref(e.id)} className="v-btn v-btn--solid shrink-0 !min-h-10 text-sm">
              Tout le catalogue
              <ArrowRight aria-hidden="true" />
            </Link>
          ) : (
            <GuardLink rest="produits/" className="v-btn v-btn--solid shrink-0 !min-h-10 text-sm">
              Tout le catalogue
              <ArrowRight aria-hidden="true" />
            </GuardLink>
          )}
        </div>
      </div>

      {/* Menu mobile */}
      <div
        id="v-menu-mobile"
        className="v-mobile-menu fixed inset-x-3 top-[5.25rem] z-30 max-h-[calc(100dvh-6rem)] overflow-y-auto border border-v-line bg-v-surface text-v-ink shadow-[0_30px_70px_-24px_rgba(0,0,0,0.35)] xl:hidden"
        style={{ borderRadius: '1.5rem' }}
        data-open={open || undefined}
        aria-hidden={!open}
      >
        <nav className="flex flex-col gap-1 px-5 py-4" aria-label="Navigation mobile">
          <p className="px-2 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-v-soft">Produits</p>
          <ul className="grid grid-cols-2 gap-1.5">
            {uList.map((u) => (
              <li key={u.slug}>
                {e ? (
                  <Link href={produitsHref(e.id, u.slug)} className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm hover:bg-v-alt">
                    {u.navLabel}
                  </Link>
                ) : (
                  <GuardLink rest={`produits/${u.slug}/`} className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm hover:bg-v-alt">
                    {u.navLabel}
                  </GuardLink>
                )}
              </li>
            ))}
          </ul>
          <div className="my-2 h-px bg-v-line" />
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="rounded-lg px-2 py-3 text-base hover:bg-v-alt">
              {n.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              openEspaceChooser('')
            }}
            className="rounded-lg px-2 py-3 text-left text-base hover:bg-v-alt"
          >
            Changer d&apos;espace{e ? ` (${e.label})` : ''}
          </button>
          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-v-line pt-4">
            <a href={`tel:${site.phoneE164}`} onClick={() => contactClick('phone', 'menu_mobile')} className="v-btn v-btn--line !min-h-11 text-sm">
              <Phone aria-hidden="true" />
              Appeler
            </a>
            <Link href="/contact/" className="v-btn v-btn--solid !min-h-11 text-sm">
              Devis gratuit
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
