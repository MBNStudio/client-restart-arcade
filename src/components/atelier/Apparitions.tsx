'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Apparition des éléments [data-reveal] quand ils entrent dans l'écran, comme sur
 * ab-agencement.com. Relancé à chaque changement de page (navigation côté client).
 */
export function Apparitions() {
  const pathname = usePathname()

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.est-visible)')
    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('est-visible'))
      return
    }
    const obs = new IntersectionObserver(
      (entrees) => {
        for (const e of entrees) {
          if (e.isIntersecting) {
            e.target.classList.add('est-visible')
            obs.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    elements.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [pathname])

  return null
}
