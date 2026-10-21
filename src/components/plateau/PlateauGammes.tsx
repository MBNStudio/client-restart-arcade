'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

/**
 * Héros de Plateau clair : les gammes en grand, une à la fois. Un volet doré
 * balaie la photo de gauche à droite et pose la gamme suivante ; la colonne
 * de droite donne son nom, une phrase, le prix d'entrée et le lien vers la
 * gamme. Les segments du bas se remplissent au rythme du défilement et se
 * cliquent ; le survol suspend le défilement.
 */
export type GammeSlide = { slug: string; name: string; line: string; price: string; href: string; image: string; alt: string }

// Temps passé sur chaque gamme, volet compris.
const HOLD_MS = 4000

export function PlateauGammes({ slides }: { slides: GammeSlide[] }) {
  const [active, setActive] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [hover, setHover] = useState(false)
  const [onScreen, setOnScreen] = useState(false)
  const box = useRef<HTMLDivElement>(null)

  // Le défilement s'arrête hors de l'écran et quand la version sombre masque ce héros.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting))
    if (box.current) io.observe(box.current)
    return () => io.disconnect()
  }, [])

  const show = (k: number) => {
    if (k === active) return
    setPrev(active)
    setActive(k)
  }

  const s = slides[active]
  const num = (k: number) => String(k + 1).padStart(2, '0')

  return (
    <div
      ref={box}
      className="pl-gammes"
      data-paused={hover || !onScreen || undefined}
      style={{ ['--hold' as string]: `${HOLD_MS}ms` }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link href={s.href} className="pl-gammes__stage" aria-label={`${s.name} : voir la gamme`}>
        {slides.map((g, k) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={g.slug}
            src={g.image}
            alt={k === active ? g.alt : ''}
            aria-hidden={k !== active || undefined}
            data-state={k === active ? (prev === null ? 'on' : 'in') : k === prev ? 'out' : undefined}
            decoding="async"
          />
        ))}
        {prev !== null && <span key={`sweep-${active}`} aria-hidden="true" className="pl-gammes__sweep" />}
      </Link>

      <div className="pl-gammes__panel">
        <div key={s.slug} className="pl-gammes__text">
          <p className="pl-gammes__count">
            {num(active)} <span>/ {String(slides.length).padStart(2, '0')}</span>
          </p>
          <p className="pl-gammes__name">{s.name}</p>
          <p className="pl-gammes__line">{s.line}</p>
          <p className="pl-gammes__price">{s.price}</p>
          <Link href={s.href} className="pl-gammes__link">
            Voir la gamme
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="pl-gammes__dots">
          {slides.map((g, k) => (
            <button
              key={g.slug}
              type="button"
              aria-label={g.name}
              aria-pressed={k === active}
              onClick={() => show(k)}
              data-done={k < active || undefined}
            >
              {k === active && (
                <span
                  key={`bar-${active}`}
                  aria-hidden="true"
                  className="pl-gammes__bar"
                  onAnimationEnd={() => show((active + 1) % slides.length)}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
