'use client'

import Link from 'next/link'
import { ctaClick } from '@/lib/analytics'

/** Bouton « Demander un devis » du héros Plateau, avec son suivi de clic. */
export function CtaLink() {
  return (
    <Link
      href="/contact/"
      onClick={() => ctaClick('Demander un devis', 'plateau_hero')}
      className="pl-btn-primary inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-semibold"
    >
      Demander un devis
    </Link>
  )
}
