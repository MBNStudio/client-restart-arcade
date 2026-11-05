'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/** Apparition des éléments [data-reveal] quand ils entrent dans l'écran (mise en page Atelier). */
export function Reveal() {
  const pathname = usePathname()

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.est-visible)')
    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('est-visible'))
      return
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
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
