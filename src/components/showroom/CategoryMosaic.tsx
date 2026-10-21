'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { ctaClick } from '@/lib/analytics'

export type Category = { href: string; label: string; meta: string; image: string; alt: string }

/**
 * Mosaïque des gammes : toutes visibles d'un coup, sans défilement. La première
 * gamme prend un grand carré, la quatrième une bande large ; les autres sont des
 * tuiles simples. Légende en capitales sur la photo, trait rouge qui s'allonge
 * et photo qui avance au survol.
 */
const spans = [
  'col-span-2 row-span-2',
  '',
  '',
  'col-span-2',
  '',
  '',
  '',
  '',
]

export function CategoryMosaic({ items }: { items: Category[] }) {
  return (
    <ul className="grid auto-rows-[190px] grid-cols-2 gap-2 sm:auto-rows-[240px] md:gap-3 lg:auto-rows-[clamp(220px,17vw,265px)] lg:grid-cols-4">
      {items.map((c, i) => {
        const big = i === 0
        return (
          <li key={c.href} className={spans[i] ?? ''}>
            <Link
              href={c.href}
              onClick={() => ctaClick(c.label, 'accueil_gammes')}
              className="group relative flex size-full flex-col justify-end overflow-hidden bg-[#283444]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.image}
                alt={c.alt}
                loading="lazy"
                className="absolute inset-0 size-full object-cover transition duration-[900ms] ease-out group-hover:scale-[1.05]"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#141b25]/85 via-[#141b25]/20 to-transparent transition-opacity duration-500 group-hover:opacity-90"
              />
              <span
                aria-hidden="true"
                className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-full bg-white/90 text-[#283444] opacity-0 transition duration-300 group-hover:opacity-100 md:right-4 md:top-4"
              >
                <ArrowUpRight className="size-4" strokeWidth={2.25} />
              </span>
              <span className="relative block p-4 text-white md:p-6">
                <span
                  className={`block font-bold uppercase leading-tight tracking-[0.06em] ${
                    big ? 'text-[20px] md:text-[30px]' : 'text-[14px] md:text-[18px]'
                  }`}
                >
                  {c.label}
                </span>
                <span
                  aria-hidden="true"
                  className="mt-2.5 block h-[3px] w-8 bg-[#c4262e] transition-all duration-300 group-hover:w-16"
                />
                <span className="mt-2.5 block text-[12px] font-medium text-white/75 md:text-[13px]">{c.meta}</span>
              </span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
