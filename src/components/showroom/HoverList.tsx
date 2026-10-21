'use client'

import Link from 'next/link'
import { useState, type ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

export type HoverItem = {
  id: string
  href: string
  label: string
  short?: string
  blurb: string
  photo: { src: string; alt: string }
}

/**
 * Liste numérotée et une seule photo à côté (publics, raisons de nous choisir) : survoler
 * ou parcourir au clavier une ligne affiche sa photo en fondu et déplie sa phrase.
 * `reverse` met la photo à gauche. Sur mobile, pas de photo : la liste suffit et toutes
 * les phrases sont visibles.
 */
export function HoverList({
  items,
  header,
  reverse = false,
}: {
  items: HoverItem[]
  /** Titre de la section, posé au-dessus de la liste, dans sa colonne. */
  header?: ReactNode
  reverse?: boolean
}) {
  const [active, setActive] = useState(0)

  return (
    <div
      className={`grid items-center gap-10 lg:gap-20 ${reverse ? 'lg:grid-cols-[1.05fr_1fr]' : 'lg:grid-cols-[1fr_1.05fr]'}`}
    >
      <div className={reverse ? 'lg:order-last' : undefined}>
        {header}
        <ul className={`border-t border-[#283444]/15 ${header ? 'mt-10 md:mt-12' : ''}`}>
          {items.map((a, i) => {
            const on = i === active
            return (
              <li key={a.id} className="border-b border-[#283444]/15">
                <Link
                  href={a.href}
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-6 md:py-8"
                >
                  <span className={`text-[13px] font-bold tabular-nums transition ${on ? 'text-[#c4262e]' : 'text-[#283444]/35'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span
                      className={`block text-[24px] font-bold uppercase leading-tight tracking-[0.05em] transition md:text-[32px] ${
                        on ? 'text-[#283444]' : 'text-[#283444] lg:text-[#283444]/40'
                      }`}
                    >
                      {a.label}
                    </span>
                    <span
                      className={`grid transition-all duration-500 ease-out ${
                        on ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[1fr] opacity-100 lg:grid-rows-[0fr] lg:opacity-0'
                      }`}
                    >
                      <span className="overflow-hidden">
                        {a.short && (
                          <span className="block pt-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#283444]/50">
                            {a.short}
                          </span>
                        )}
                        <span className="block max-w-[440px] pt-2 text-[15px] leading-relaxed text-[#283444]/70">{a.blurb}</span>
                      </span>
                    </span>
                  </span>
                  <ArrowRight
                    className={`size-5 self-center transition ${on ? 'translate-x-0 text-[#c4262e]' : 'text-[#283444]/30 lg:-translate-x-1'}`}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="relative hidden aspect-[5/4] overflow-hidden bg-[#283444]/5 lg:block" aria-hidden="true">
        {items.map((a, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={a.id}
            src={a.photo.src}
            alt=""
            loading="lazy"
            className={`absolute inset-0 size-full object-cover transition duration-700 ease-out ${
              i === active ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-0'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
