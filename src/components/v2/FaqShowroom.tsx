'use client'

import { useId, useState, type ReactNode } from 'react'
import { Plus } from 'lucide-react'

/**
 * FAQ dans la mise en page « Où allez-vous jouer ? » de la version Showroom
 * (mail du 5 novembre) : liste numérotée à gauche, grande photo à droite. Ouvrir
 * une question déplie sa réponse et change la photo en fondu. Sur mobile, pas de photo.
 */
export function FaqShowroom({
  items,
  photos,
  eyebrow = 'Questions fréquentes',
  title,
  aside,
}: {
  items: { q: string; a: string }[]
  photos: { src: string; alt: string }[]
  eyebrow?: string
  title: ReactNode
  aside?: ReactNode
}) {
  const [active, setActive] = useState(0)
  const base = useId()

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
      <div>
        <p className="v-eyebrow" data-reveal>
          {eyebrow}
        </p>
        <h2 className="v-display v-h2 mt-5" data-reveal>
          {title}
        </h2>
        <ul className="mt-10 border-t border-v-line md:mt-12">
          {items.map((f, i) => {
            const on = i === active
            const id = `${base}-${i}`
            return (
              <li key={f.q} className="border-b border-v-line">
                <h3 className="text-base" style={{ fontFamily: 'var(--v-font-body)', letterSpacing: 'normal' }}>
                  <button
                    type="button"
                    aria-expanded={on}
                    aria-controls={id}
                    onClick={() => setActive(on ? -1 : i)}
                    className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-5 text-left md:py-6"
                  >
                    <span className={`text-[13px] font-bold tabular-nums transition ${on ? 'text-v-accent' : 'text-v-soft/60'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`text-[15px] font-bold uppercase leading-snug tracking-[0.06em] transition md:text-[17px] ${on ? 'text-v-ink' : 'text-v-ink/55 group-hover:text-v-ink'}`}
                    >
                      {f.q}
                    </span>
                    <Plus
                      className={`size-5 self-center transition duration-500 ${on ? 'rotate-45 text-v-accent' : 'text-v-soft'}`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={id}
                  role="region"
                  className={`grid transition-all duration-500 ease-out ${on ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[520px] pb-6 pl-14 text-[15px] leading-relaxed text-v-soft">{f.a}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
        {aside}
      </div>

      <div className="v-photo relative hidden aspect-[5/4] lg:sticky lg:top-28 lg:block" aria-hidden="true">
        {photos.map((p, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={p.src + i}
            src={p.src}
            alt=""
            loading="lazy"
            className={`absolute inset-0 size-full object-cover transition duration-700 ease-out ${
              i === (active < 0 ? 0 : active) % photos.length ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-0'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
