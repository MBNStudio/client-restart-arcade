import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CtaLink } from './CtaLink'

/**
 * Héros Plateau : le titre à gauche, un visuel à droite. Plateau y met le mur
 * de photos (`PhotoWall`), Plateau clair les gammes une à une
 * (`PlateauGammes`) ; les deux sont rendus et le CSS n'affiche que celui de la
 * version (`.pl-only-dark`, `.pl-only-clair`).
 */
export function PlateauHero({ children }: { children: ReactNode }) {
  return (
    <section className="pl-hero relative overflow-hidden">
      <div aria-hidden="true" className="pl-hero-glow" />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pb-12 pt-14 sm:px-6 md:pt-16 lg:grid-cols-[0.95fr_1.15fr] lg:gap-6 lg:pb-16">
        <div className="relative z-10">
          <p aria-hidden="true" className="pl-display text-[3.1rem] leading-[0.98] sm:text-[4.2rem] lg:text-[4.9rem]">
            Transformez vos espaces
          </p>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-pl-ink/60">
            Bornes d&apos;arcade, fléchettes, baby-foot, billards et flippers. Personnalisés à votre image, livrés montés et
            installés partout en France.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <CtaLink />
            <Link
              href="/produits/"
              className="inline-flex h-11 items-center gap-1.5 rounded-xl px-4 text-sm font-semibold text-pl-ink/75 transition hover:text-pl-ink"
            >
              Le catalogue
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
        {children}
      </div>
    </section>
  )
}

/**
 * Mur de photos de la version Plateau. Quatre colonnes (trois sous 640 px)
 * défilent sans fin, une sur deux en sens inverse ; le mur est incliné en
 * perspective, déborde jusqu'au bord de la fenêtre et s'estompe sur ses quatre
 * bords. Au survol, la colonne s'arrête et la photo visée avance. Tout est en
 * CSS ; chaque colonne est dupliquée pour que la boucle ne se voie pas.
 */
export type PlateauShot = { name: string; image: string; alt: string; href: string }

export function PhotoWall({ shots }: { shots: PlateauShot[] }) {
  const columns = [0, 1, 2, 3].map((c) => shots.filter((_, i) => i % 4 === c))
  return (
    <div className="pl-wall" aria-label="Nos équipements en situation">
      <div className="pl-wall__tilt">
        {columns.map((col, c) => (
          <div key={c} className="pl-wall__col" style={{ ['--c' as string]: c }}>
            <ul className="pl-wall__track">
              {[...col, ...col].map((s, i) => {
                const copy = i >= col.length
                return (
                  <li key={`${s.image}-${i}`} className="pl-wall__card" aria-hidden={copy || undefined}>
                    <Link href={s.href} tabIndex={copy ? -1 : undefined} className="pl-wall__link">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={s.image} alt={copy ? '' : s.alt} loading="lazy" decoding="async" />
                      <span className="pl-wall__name">{s.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
