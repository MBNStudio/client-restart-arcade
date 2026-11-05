'use client'

import Link from 'next/link'
import { useEffect, useRef, type CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { Audience } from '@/data/catalogue'
import { findUnivers, formatPrice } from '@/data/catalogue'
import { produitsHref } from '@/data/v2/espaces'
import { asset } from '@/lib/site'
import { GuardLink } from './GuardLink'

/** La pièce de la version Panorama : tout ce que vend RESTART, un point par produit (positions en % de la photo). */
const room = {
  image: asset('/img/panorama/piece.webp'),
  alt: "Grande pièce lumineuse aux baies vitrées ouvertes sur un lac et des montagnes, avec un billard, un baby-foot, une borne de fléchettes, un flipper, un fauteuil massant et une borne d'arcade",
  ratio: 1536 / 864,
  hotspots: [
    { slug: 'flechettes', x: 14.8, y: 26.5 },
    { slug: 'baby-foot', x: 17, y: 64 },
    { slug: 'billard', x: 54.5, y: 46 },
    { slug: 'borne-arcade', x: 59.6, y: 26.5 },
    { slug: 'fauteuil-massant', x: 46.5, y: 33 },
    { slug: 'flipper-numerique', x: 84.5, y: 52 },
  ],
}

const priceOf = (slug: string, espace?: Audience) => {
  const p = (findUnivers(slug)?.models ?? []).filter((m) => !espace || m.audiences.includes(espace)).flatMap((m) => (m.price != null ? [m.price] : []))
  return p.length ? `dès ${formatPrice(Math.min(...p))}` : 'Sur devis'
}

/**
 * Pièce interactive (version Panorama), placée plus bas sur l'accueil plutôt qu'à
 * l'arrivée (mail du 5 novembre). La photo se pose en entrant dans l'écran.
 * Dans un espace, seuls les produits de cet espace ont un point.
 */
export function InteractiveRoom({ espace, univers }: { espace?: Audience; univers?: string[] }) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const update = () => {
      frame = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      el.style.setProperty('--s', String(Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height * 0.4)))))
    }
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', request, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', request)
    }
  }, [])

  const spots = room.hotspots.filter((h) => !univers || univers.includes(h.slug))

  return (
    <section ref={ref} className="v-room" aria-labelledby="piece-titre">
      <div className="v-room__frame" style={{ '--ar': room.ratio } as CSSProperties}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={room.image} alt={room.alt} loading="lazy" decoding="async" />
        <ul className="absolute inset-0" aria-label="Les équipements de la pièce">
          {spots.map((h) => {
            const u = findUnivers(h.slug)
            if (!u) return null
            const label = `${u.name}, ${priceOf(h.slug, espace)}`
            const inner = (
              <>
                <span className="v-spot__dot" aria-hidden="true" />
                <span className="v-spot__card" aria-hidden="true">
                  <span className="flex flex-col gap-0.5 pr-1">
                    <span className="text-[14px] font-semibold">{u.name}</span>
                    <span className="v-spot__price text-[12.5px] text-white/70">{priceOf(h.slug, espace)}</span>
                  </span>
                  <span className="v-spot__go">
                    <ArrowUpRight className="size-4" strokeWidth={2} />
                  </span>
                </span>
              </>
            )
            return (
              <li key={h.slug} className="v-spot" style={{ left: `${h.x}%`, top: `${h.y}%` }} data-flip={h.x > 62 || undefined}>
                {espace ? (
                  <Link href={produitsHref(espace, h.slug)} className="v-spot__link" aria-label={label}>
                    {inner}
                  </Link>
                ) : (
                  <GuardLink rest={`produits/${h.slug}/`} className="v-spot__link" ariaLabel={label}>
                    {inner}
                  </GuardLink>
                )}
              </li>
            )
          })}
        </ul>
      </div>
      <div className="v-room__shade" aria-hidden="true" />
      <div className="v-room__copy">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/75">La pièce RESTART</p>
        <h2 id="piece-titre" className="v-display mx-auto mt-3 max-w-3xl text-[clamp(1.9rem,3.6vw,3.2rem)] leading-[1.05] text-white">
          Tout ce que nous installons, dans une seule pièce
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-[15px] text-white/75">Touchez un point pour découvrir l&apos;équipement et son prix.</p>
      </div>
    </section>
  )
}
