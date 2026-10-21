'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { reviews } from '@/data/reviews'

/**
 * Avis clients de la version Carrousel : une rangée qui défile (trois avis visibles
 * sur ordinateur, un et demi sur mobile), avec une flèche de chaque côté. Les flèches
 * avancent d'une carte et s'estompent en bout de rangée ; le défilement au doigt ou
 * au trackpad reste possible.
 */
export function ReviewsCarousel() {
  const track = useRef<HTMLUListElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  useEffect(() => {
    const el = track.current
    if (!el) return
    const update = () => {
      setAtStart(el.scrollLeft <= 4)
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4)
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const go = (dir: -1 | 1) => {
    const el = track.current
    const card = el?.querySelector('li')
    if (!el || !card) return
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: 'smooth' })
  }

  return (
    <div className="crs-reviews-wrap">
      <ul ref={track} className="crs-reviews" aria-label="Avis clients">
        {reviews.map((r) => (
          <li key={r.author}>
            <figure className="crs-review">
              <blockquote>« {r.text} »</blockquote>
              <figcaption>{r.author}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="crs-reviews__arrow crs-reviews__arrow--prev"
        aria-label="Avis précédents"
        onClick={() => go(-1)}
        disabled={atStart}
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        className="crs-reviews__arrow crs-reviews__arrow--next"
        aria-label="Avis suivants"
        onClick={() => go(1)}
        disabled={atEnd}
      >
        <ChevronRight className="size-5" aria-hidden="true" />
      </button>
    </div>
  )
}
