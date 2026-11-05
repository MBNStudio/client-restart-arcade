'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Pause, Play } from 'lucide-react'

const delai = (ms: number) => ({ ['--delai' as string]: `${ms}ms` }) as React.CSSProperties

/**
 * Ouverture de la V2 : la mise en page Atelier (menu en haut, titre à gauche sur
 * trois lignes qui se dévoilent, trois repères en bas) sur une vidéo plein écran
 * comme Halo. La vidéo ne se lance pas si l'utilisateur réduit les animations ;
 * un bouton la met en pause.
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
  video: { src: string; poster: string; fallback: string; alt: string }
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
  const [canPlay, setCanPlay] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.pause()
      setPlaying(false)
      return
    }
    v.play().catch(() => setPlaying(false))
  }, [])

  const toggle = () => {
    const v = ref.current
    if (!v) return
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
          onCanPlay={() => setCanPlay(true)}
          style={{ opacity: canPlay ? 1 : 0, transition: 'opacity 0.8s ease' }}
        />
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
        aria-label={playing ? 'Mettre la vidéo en pause' : 'Lire la vidéo'}
      >
        {playing ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
      </button>
    </section>
  )
}
