'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { logo } from '@/data/images'
import { site } from '@/lib/site'
import { contactClick } from '@/lib/analytics'
import { horairesCourts, navigation } from '@/components/atelier/nav'

const Telephone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </svg>
)

/**
 * En-tête de la version Atelier, repris d'ab-agencement.com : logo à gauche, liens en
 * pastilles et sous-menus au survol, bouton téléphone à droite. Transparent sur la photo
 * d'ouverture de l'accueil, fond lin flouté dès qu'on défile ; masqué quand on descend,
 * de retour quand on remonte. Sous 1024 px, menu plein écran sur fond encre.
 */
export function Header() {
  const pathname = usePathname()
  const transparent = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [cache, setCache] = useState(false)
  const [ouvert, setOuvert] = useState(false)
  const [monte, setMonte] = useState(false) // menu présent dans le DOM (animation de fermeture)
  const dernierY = useRef(0)
  const actif = (href: string) => pathname.startsWith(href)

  useEffect(() => {
    const maj = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      setCache(y > 400 && y > dernierY.current)
      dernierY.current = y
    }
    maj()
    window.addEventListener('scroll', maj, { passive: true })
    return () => window.removeEventListener('scroll', maj)
  }, [])

  useEffect(() => setOuvert(false), [pathname])

  useEffect(() => {
    const html = document.documentElement
    if (ouvert) {
      setMonte(true)
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => html.classList.add('menu-ouvert')))
      document.body.style.overflow = 'hidden'
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOuvert(false)
      const mq = window.matchMedia('(min-width: 1024px)')
      const onMq = (e: MediaQueryListEvent) => e.matches && setOuvert(false)
      document.addEventListener('keydown', onKey)
      mq.addEventListener('change', onMq)
      return () => {
        cancelAnimationFrame(raf)
        document.removeEventListener('keydown', onKey)
        mq.removeEventListener('change', onMq)
      }
    }
    html.classList.remove('menu-ouvert')
    document.body.style.overflow = ''
    const t = setTimeout(() => setMonte(false), 700)
    return () => clearTimeout(t)
  }, [ouvert])

  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-noyer focus:px-5 focus:py-3 focus:text-lin"
      >
        Aller au contenu
      </a>
      <header
        className="entete fixed inset-x-0 top-0 z-50"
        data-transparent={transparent || undefined}
        data-scrolled={scrolled || undefined}
        data-cache={(cache && !ouvert) || undefined}
      >
        <div className="conteneur flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
          <Link href="/" className="relative z-10 flex shrink-0 items-center" aria-label={`${site.name}, accueil`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} alt="" width={1350} height={495} className="h-9 w-auto lg:h-10 xl:h-11" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
            {navigation.map((l) =>
              l.sousMenu ? (
                <div key={l.libelle} className="sous-menu-parent relative">
                  <Link
                    href={l.href}
                    className={`lien-nav flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.92rem] font-medium ${l.sousMenu.some((s) => actif(s.href)) ? 'est-actif' : ''}`}
                  >
                    {l.libelle}
                    <svg className="chevron size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </Link>
                  <div className="sous-menu absolute top-full left-0 pt-2">
                    <ul className="min-w-56 rounded-2xl border border-trait bg-lin p-2 text-noyer shadow-[0_18px_50px_rgb(22_16_11/0.14)]">
                      {l.sousMenu.map((s) => (
                        <li key={s.href}>
                          <Link
                            href={s.href}
                            className={`block rounded-xl px-4 py-2.5 text-[0.92rem] font-medium whitespace-nowrap transition-colors duration-300 hover:bg-sable ${actif(s.href) ? 'bg-sable' : ''}`}
                            aria-current={actif(s.href) ? 'page' : undefined}
                          >
                            {s.libelle}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`lien-nav rounded-full px-4 py-2 text-[0.92rem] font-medium ${actif(l.href) ? 'est-actif' : ''}`}
                  aria-current={actif(l.href) ? 'page' : undefined}
                >
                  {l.libelle}
                </Link>
              ),
            )}
            <a
              href={`tel:${site.phoneE164}`}
              className="bouton-entete btn ml-3 !px-5 !py-2.5"
              onClick={() => contactClick('phone', 'header')}
            >
              <Telephone />
              {site.phone}
            </a>
          </nav>

          <button
            type="button"
            className="bouton-menu relative z-10 -mr-2 flex size-11 items-center justify-center rounded-full lg:hidden"
            aria-label={ouvert ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={ouvert}
            aria-controls="menu-mobile"
            onClick={() => setOuvert((o) => !o)}
          >
            <span className="barres" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      {/* Menu plein écran (mobile et tablette) */}
      <div
        id="menu-mobile"
        className="menu-mobile sur-sombre fixed inset-0 z-40 bg-encre text-lin lg:hidden"
        hidden={!monte}
        onClick={(e) => (e.target as HTMLElement).closest('a') && setOuvert(false)}
      >
        <div className="conteneur flex h-full flex-col overflow-y-auto pt-28 pb-10">
          <nav aria-label="Navigation mobile" className="flex flex-col">
            <Link href="/" className="lien-menu font-display border-b border-lin/10 py-4 text-4xl font-light" style={{ '--i': 0 } as React.CSSProperties}>
              Accueil
            </Link>
            {navigation.map((l, i) =>
              l.sousMenu ? (
                <div key={l.libelle} className="lien-menu border-b border-lin/10 py-4" style={{ '--i': i + 1 } as React.CSSProperties}>
                  <Link href={l.href} className="font-display block text-4xl font-light">
                    {l.libelle}
                  </Link>
                  <ul className="mt-2 space-y-1 pl-1">
                    {l.sousMenu.map((s) => (
                      <li key={s.href}>
                        <Link href={s.href} className="flex items-center gap-3 py-1.5 text-lg text-lin/75" aria-current={actif(s.href) ? 'page' : undefined}>
                          <span className="block h-px w-4 bg-chene" aria-hidden="true" />
                          {s.libelle}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  className="lien-menu font-display border-b border-lin/10 py-4 text-4xl font-light"
                  style={{ '--i': i + 1 } as React.CSSProperties}
                  aria-current={actif(l.href) ? 'page' : undefined}
                >
                  {l.libelle}
                </Link>
              ),
            )}
          </nav>
          <div className="lien-menu mt-auto space-y-2 pt-10 text-lin/70" style={{ '--i': 7 } as React.CSSProperties}>
            <a href={`tel:${site.phoneE164}`} className="block text-2xl text-lin" onClick={() => contactClick('phone', 'menu')}>
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="block" onClick={() => contactClick('email', 'menu')}>
              {site.email}
            </a>
            <p className="text-sm">{horairesCourts}</p>
          </div>
        </div>
      </div>
    </>
  )
}
