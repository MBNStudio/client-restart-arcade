'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'

export type DesignSlide = { image: string; alt: string; title: string; detail: string; contain?: boolean }

const STEP_MS = 6000

/**
 * Carrousel de la version Carrousel, réemployé pour montrer les designs et les
 * coverings possibles (mail du 5 novembre) : la diapositive active au centre, ses
 * voisines atténuées de chaque côté, lent zoom sur la photo active. Défilement
 * automatique suspendu au survol, au clavier, sur demande et si les animations sont réduites.
 */
export function DesignCarousel({ slides }: { slides: DesignSlide[] }) {
  const n = slides.length
  const [active, setActive] = useState(0)
  const [hover, setHover] = useState(false)
  const [stopped, setStopped] = useState(false)
  const [reduced, setReduced] = useState(false)
  const prevRel = useRef<number[]>([])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
  }, [])

  const playing = !hover && !stopped && !reduced
  useEffect(() => {
    if (!playing || n < 2) return
    const t = window.setTimeout(() => setActive((i) => (i + 1) % n), STEP_MS)
    return () => window.clearTimeout(t)
  }, [playing, active, n])

  const go = (d: number) => setActive((i) => (i + d + n) % n)
  const rel = slides.map((_, i) => {
    let r = (i - active + n) % n
    if (r > n / 2) r -= n
    return r
  })
  const jumped = rel.map((r, i) => prevRel.current[i] !== undefined && Math.abs(r - prevRel.current[i]) > 1)
  useEffect(() => {
    prevRel.current = rel
  })

  const current = slides[active]

  return (
    <div
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onFocusCapture={() => setHover(true)}
      onBlurCapture={() => setHover(false)}
      aria-roledescription="carrousel"
    >
      <div className="v-carousel">
        {slides.map((s, i) => (
          <figure
            key={s.image + i}
            className={`v-slide ${s.contain ? 'v-slide--contain' : ''}`}
            style={{ ['--rel' as string]: rel[i], ['--a' as string]: Math.min(1, Math.abs(rel[i])), zIndex: 10 - Math.abs(rel[i]) }}
            data-active={i === active || undefined}
            data-far={Math.abs(rel[i]) > 1 || undefined}
            data-jump={jumped[i] || undefined}
            aria-hidden={i !== active}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.image} alt={i === active ? s.alt : ''} loading="lazy" />
            {/* Cliquer sur une voisine la fait venir au centre (les flèches restent pour le clavier). */}
            {Math.abs(rel[i]) === 1 && (
              <button
                type="button"
                tabIndex={-1}
                onClick={() => go(rel[i])}
                aria-label={rel[i] < 0 ? 'Diapositive précédente' : 'Diapositive suivante'}
                className="absolute inset-0 cursor-pointer"
              />
            )}
          </figure>
        ))}
      </div>
      <div className="mt-8 flex flex-col items-center gap-5 text-center">
        <div aria-live="polite">
          <p className="v-display text-2xl">{current.title}</p>
          <p className="mt-1 text-[15px] text-v-soft">{current.detail}</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-v-line bg-v-surface p-1.5">
          <button type="button" onClick={() => go(-1)} aria-label="Précédent" className="inline-flex size-9 items-center justify-center rounded-full hover:bg-v-alt">
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <div className="flex items-center gap-1.5 px-1">
            {slides.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Voir ${s.title}`}
                aria-current={i === active || undefined}
                className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? 'w-6 bg-v-accent' : 'w-1.5 bg-v-ink/25'}`}
              />
            ))}
          </div>
          <button type="button" onClick={() => go(1)} aria-label="Suivant" className="inline-flex size-9 items-center justify-center rounded-full hover:bg-v-alt">
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setStopped((v) => !v)}
            aria-label={stopped ? 'Relancer le défilement' : 'Arrêter le défilement'}
            className="inline-flex size-9 items-center justify-center rounded-full hover:bg-v-alt"
          >
            {stopped ? <Play className="size-3.5" aria-hidden="true" /> : <Pause className="size-3.5" aria-hidden="true" />}
          </button>
        </div>
      </div>
    </div>
  )
}
