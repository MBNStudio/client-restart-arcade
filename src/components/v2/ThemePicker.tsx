'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Palette, X } from 'lucide-react'
import { applyV2Theme, V2_DEFAULT_THEME, V2_THEME_EVENT, v2Themes } from '@/lib/v2/themes'

/**
 * Sélecteur de thème, en bas à gauche : chaque thème change tout le site (couleurs,
 * polices, arrondis). Le choix est gardé pour les visites suivantes. En attendant la
 * nouvelle charte de RESTART, il sert à comparer les ambiances.
 */
export function ThemePicker() {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(V2_DEFAULT_THEME)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCurrent(document.documentElement.dataset.theme ?? V2_DEFAULT_THEME)
    const on = (e: Event) => setCurrent((e as CustomEvent<string>).detail)
    window.addEventListener(V2_THEME_EVENT, on)
    return () => window.removeEventListener(V2_THEME_EVENT, on)
  }, [])

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const active = v2Themes.find((t) => t.id === current) ?? v2Themes[0]

  return (
    <div ref={rootRef} className="fixed bottom-20 left-3 z-[60] md:bottom-5 md:left-5">
      <div
        id="v-theme-panel"
        data-open={open || undefined}
        className="v-theme-panel absolute bottom-[calc(100%+0.6rem)] left-0 w-[19rem] overflow-hidden rounded-2xl border border-v-line bg-v-surface text-v-ink shadow-[0_30px_70px_-20px_rgba(0,0,0,0.45)]"
        role="dialog"
        aria-label="Choisir un thème"
      >
        <div className="flex items-center justify-between border-b border-v-line px-4 py-3">
          <p className="text-[13px] font-semibold">Thème du site</p>
          <button type="button" onClick={() => setOpen(false)} aria-label="Fermer" className="text-v-soft hover:text-v-ink">
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
        <ul className="max-h-[60vh] overflow-y-auto p-2">
          {v2Themes.map((t) => {
            const on = t.id === current
            return (
              <li key={t.id}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => applyV2Theme(t.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${on ? 'bg-v-alt' : 'hover:bg-v-alt/60'}`}
                >
                  <span className="flex shrink-0 overflow-hidden rounded-full border border-v-line" aria-hidden="true">
                    {t.swatch.map((c, i) => (
                      <span key={i} className="block h-7 w-3.5" style={{ background: c }} />
                    ))}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14px] font-semibold">{t.name}</span>
                    <span className="block text-[12px] leading-snug text-v-soft">{t.desc}</span>
                  </span>
                  {on && <Check className="size-4 shrink-0 text-v-accent" aria-hidden="true" />}
                </button>
              </li>
            )
          })}
        </ul>
        <p className="border-t border-v-line px-4 py-3 text-[11.5px] leading-snug text-v-soft">
          Logo provisoire : la nouvelle charte RESTART remplacera ces thèmes.
        </p>
      </div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="v-theme-panel"
        className="inline-flex h-11 items-center gap-2 rounded-full border border-v-line bg-v-surface/90 pl-3 pr-4 text-[13px] font-semibold text-v-ink shadow-[0_12px_30px_-12px_rgba(0,0,0,0.45)] backdrop-blur"
      >
        <Palette className="size-4 text-v-accent" aria-hidden="true" />
        Thème · {active.name}
      </button>
    </div>
  )
}
