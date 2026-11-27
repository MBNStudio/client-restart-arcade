'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Pause, Play } from 'lucide-react'
import type { Slide } from '@/data/v2/espaces'

const delai = (ms: number) => ({ ['--delai' as string]: `${ms}ms` }) as React.CSSProperties

/** Durée d'affichage d'une photo du défilé. */
const DUREE = 5500

/**
 * Ouverture : la mise en page Atelier (menu en haut, titre à gauche sur trois lignes qui se dévoilent, trois
 * repères en bas) sur un fond plein écran : un défilé de photos (accueils des trois univers) ou un film
 * (accueil général). Rien ne bouge si l'utilisateur réduit les animations ; un bouton met en pause. La première
 * photo s'affiche sans effet d'entrée, à son cadrage normal.
 */
export function HeroVideo({
  video,
  eyebrow,
  lines,
  accent,
  text,
  marks,
  actions,
  as = 'h1',
}: {
  video: { src?: string; slides?: Slide[]; poster: string; fallback: string; alt: string }
  eyebrow: string
  lines: [string, string, string]
  /** Mot mis en valeur dans les lignes. */
  accent: string
  text: string
  marks: [string, string][]
  actions: ReactNode
  /** L'accueil général a déjà son h1 ailleurs : il peut afficher le titre en <p>. */
  as?: 'h1' | 'p'
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(true)
  const [step, setStep] = useState(0)
  const slides = video.slides
  const count = slides?.length ?? 0
  const current = count ? step % count : 0
  const previous = count && step > 0 ? (step - 1) % count : -1

  useEffect(() => {
    const v = ref.current
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v?.pause()
      setPlaying(false)
      return
    }
    v?.play().catch(() => setPlaying(false))
  }, [])

  useEffect(() => {
    if (count < 2 || !playing) return
    const t = window.setTimeout(() => setStep((n) => n + 1), DUREE)
    return () => window.clearTimeout(t)
  }, [count, playing, step])

  const toggle = () => {
    const v = ref.current
    if (!v) {
      setPlaying((p) => !p)
      return
    }
    if (v.paused) {
      v.play().catch(() => undefined)
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  const Title = as
  const withAccent = (line: string) => {
    const i = line.indexOf(accent)
    if (i < 0) return line
    return (
      <>
        {line.slice(0, i)}
        <em>{accent}</em>
        {line.slice(i + accent.length)}
      </>
    )
  }

  return (
    <section className="v-hero v-on-photo">
      <div className="v-hero__media">
        {slides ? (
          <div className="v-slides" role="img" aria-label={video.alt} data-paused={!playing || undefined} data-started={step > 0 || undefined}>
            {slides.map((s, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={s.src}
                className="v-slide"
                src={s.src}
                alt=""
                style={{ objectPosition: s.focus }}
                fetchPriority={i === 0 ? 'high' : 'low'}
                data-state={i === current ? 'on' : i === previous ? 'prev' : undefined}
              />
            ))}
          </div>
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={video.poster} alt="" fetchPriority="high" onError={(e) => ((e.currentTarget as HTMLImageElement).src = video.fallback)} />
            <video
              ref={ref}
              src={video.src}
              poster={video.poster}
              muted
              loop
              playsInline
              preload="auto"
              aria-label={video.alt}
            />
          </>
        )}
        <div className="v-hero__shade" />
      </div>

      <div className="v-wrap relative pb-12 pt-40 lg:pb-16">
        <p className="v-eyebrow v-appear" style={delai(200)}>
          {eyebrow}
        </p>
        <Title className="v-display v-h1 mt-6 max-w-5xl">
          {lines.map((l, i) => (
            <span key={i} className="v-line">
              <span style={delai(300 + i * 110)}>{withAccent(l)}</span>
            </span>
          ))}
        </Title>
        <p className="v-appear mt-7 max-w-xl text-lg leading-relaxed text-white/80" style={delai(800)}>
          {text}
        </p>
        <div className="v-appear mt-9 flex flex-wrap gap-3" style={delai(950)}>
          {actions}
        </div>

        <div className="v-appear mt-16 hidden grid-cols-3 border-t border-white/15 pt-6 text-sm text-white/70 md:grid" style={delai(1150)}>
          {marks.map(([a, b]) => (
            <p key={a}>
              <span className="text-white">{a}</span>
              <br />
              {b}
            </p>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={toggle}
        className="v-hero__toggle inline-flex size-10 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white backdrop-blur transition hover:bg-black/50"
        aria-label={slides ? (playing ? 'Mettre le défilé en pause' : 'Relancer le défilé') : playing ? 'Mettre la vidéo en pause' : 'Lire la vidéo'}
      >
        {playing ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
      </button>
    </section>
  )
}
