'use client'

import { useState } from 'react'
import { realisationCategories, realisationPhoto } from '@/data/images'

/**
 * Réalisations classées par produit : un onglet par catégorie, et « Toutes » qui
 * les présente l'une après l'autre avec leur titre. Plus lisible qu'une galerie
 * sans distinction (retour de RESTART du 6 novembre).
 */
export function RealisationsGallery() {
  const [active, setActive] = useState<string>('toutes')
  const total = realisationCategories.reduce((n, c) => n + c.photos.length, 0)
  const shown = active === 'toutes' ? realisationCategories : realisationCategories.filter((c) => c.slug === active)

  const tab = (slug: string, label: string, count: number) => {
    const on = active === slug
    return (
      <button
        key={slug}
        type="button"
        role="tab"
        aria-selected={on}
        onClick={() => setActive(slug)}
        className={`inline-flex h-10 items-center gap-2 whitespace-nowrap border px-4 text-sm font-semibold transition ${
          on ? 'border-v-btn bg-v-btn text-v-btn-ink' : 'border-v-line text-v-ink hover:border-v-accent'
        }`}
        style={{ borderRadius: 'var(--v-pill)' }}
      >
        {label}
        <span className={`text-xs tabular-nums ${on ? 'opacity-75' : 'text-v-soft'}`}>{count}</span>
      </button>
    )
  }

  return (
    <div>
      <div role="tablist" aria-label="Catégories de réalisations" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {tab('toutes', 'Toutes', total)}
        {realisationCategories.map((c) => tab(c.slug, c.label, c.photos.length))}
      </div>

      <div className="mt-12 space-y-16">
        {shown.map((c) => (
          <section key={c.slug} aria-labelledby={`real-${c.slug}`}>
            <div className="flex items-baseline justify-between gap-4 border-b border-v-line pb-4">
              <h3 id={`real-${c.slug}`} className="v-display text-[1.7rem] leading-tight sm:text-[2.1rem]">
                {c.label}
              </h3>
              <span className="text-sm text-v-soft">
                {c.photos.length} installation{c.photos.length > 1 ? 's' : ''}
              </span>
            </div>
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {c.photos.map((n) => (
                <li key={n}>
                  <div className="v-photo aspect-square">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={realisationPhoto(n)} alt={`Installation RESTART chez un client : ${c.label.toLowerCase()}`} loading="lazy" />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
