'use client'

import Link from 'next/link'
import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import type { ValueBlock } from '@/data/v2/espaces'

const clamp = (v: number) => Math.min(1, Math.max(0, v))
const tones = ['dark', 'alt', 'light'] as const

/**
 * Blocs qui entrent au défilement (version Panorama) : une grande photo collée au
 * bord de l'écran et le texte de l'autre côté, en alternance. --p passe de 0 à 1
 * pendant que le bloc monte dans l'écran ; la photo arrive d'en dessous, le texte
 * glisse depuis son bord, ligne après ligne. Sert pour la valeur ajoutée sur les
 * accueils et pour expliquer le concept.
 */
export function Chapters({
  blocks,
  startTone = 0,
}: {
  /** `cta` : bouton du bloc (le lien devis s'affiche à côté). */
  blocks: (ValueBlock & { id?: string; cta?: { href: string; label: string } | null })[]
  startTone?: number
}) {
  const refs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const update = () => {
      frame = 0
      const vh = window.innerHeight
      refs.current.forEach((el) => {
        if (!el) return
        const top = el.getBoundingClientRect().top
        el.style.setProperty('--p', clamp((vh - top) / (vh * 0.9)).toFixed(4))
      })
    }
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
    }
  }, [])

  const d = (n: number) => ({ '--d': 0.15 + n * 0.07 }) as CSSProperties

  return (
    <div>
      {blocks.map((b, i) => {
        const id = b.id ?? `bloc-${i + 1}`
        const link = b.cta
        return (
          <section
            key={id}
            id={id}
            ref={(el) => void (refs.current[i] = el)}
            className="v-ch"
            data-side={i % 2 === 0 ? 'left' : 'right'}
            data-tone={tones[(i + startTone) % tones.length]}
            aria-labelledby={`${id}-titre`}
          >
            <div className="v-ch__text">
              <div className="v-in flex items-center gap-[18px]" style={d(0)}>
                <span className="v-ch__num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="v-ch__tag">
                  <strong>{b.label}</strong>
                  <span>{b.short}</span>
                </span>
              </div>
              <h2 id={`${id}-titre`} className="v-in v-display mt-[clamp(16px,2.4svh,30px)] text-[clamp(30px,3vw,46px)] leading-[1.06]" style={d(1)}>
                {b.title}
              </h2>
              <p className="v-ch__lead v-in" style={d(2)}>
                {b.text}
              </p>
              <ul className="v-in mt-[22px] grid gap-2.5" style={d(3)}>
                {b.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-[15px] leading-snug">
                    <span className="v-ch__tick" aria-hidden="true">
                      <Check className="size-3.5" strokeWidth={2.5} />
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
              <ChapterActions style={d(4)}>
                {link && (
                  <Link href={link.href} className="v-ch__cta">
                    {link.label}
                    <span className="v-ch__cta-arrow" aria-hidden="true">
                      <ArrowRight className="size-4" />
                    </span>
                  </Link>
                )}
                <Link href="/contact/" className="text-sm font-medium underline decoration-current/30 underline-offset-[6px] hover:decoration-current">
                  Demander un devis
                </Link>
              </ChapterActions>
            </div>
            <figure className="v-ch__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.image} alt={b.alt} loading="lazy" decoding="async" />
              <figcaption className="v-ch__caption">{b.caption}</figcaption>
            </figure>
          </section>
        )
      })}
    </div>
  )
}

function ChapterActions({ children, style }: { children: ReactNode; style: CSSProperties }) {
  return (
    <div className="v-in mt-[26px] flex flex-wrap items-center gap-x-6 gap-y-3.5" style={style}>
      {children}
    </div>
  )
}
