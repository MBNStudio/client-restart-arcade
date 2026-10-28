'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ArrowRight, X } from 'lucide-react'
import type { Audience } from '@/data/catalogue'
import { ESPACE_OPEN_EVENT, espacePaths, espaces, storedEspace, storeEspace } from '@/lib/espace'
import { selectAudience } from '@/lib/analytics'

/**
 * Pop-up de choix de l'espace : s'ouvre à la première visite sur l'accueil
 * générale, ou à la demande (« Changer d'espace », événement ESPACE_OPEN_EVENT).
 * Choisir un espace l'enregistre et mène à son accueil ; fermer laisse sur
 * l'accueil général, qui reste celui des visites suivantes.
 */
export function EspaceChooser() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (pathname === '/' && storedEspace() === null) setOpen(true)
  }, [pathname])

  useEffect(() => {
    const onOpen = () => {
      returnFocus.current = document.activeElement as HTMLElement | null
      setOpen(true)
    }
    window.addEventListener(ESPACE_OPEN_EVENT, onOpen)
    return () => window.removeEventListener(ESPACE_OPEN_EVENT, onOpen)
  }, [])

  const close = useCallback(() => {
    if (storedEspace() === null) {
      storeEspace('general')
      selectAudience('general', 'espace_popup')
      if (pathname !== '/') router.push('/')
    }
    setOpen(false)
    returnFocus.current?.focus()
  }, [pathname, router])

  const choose = (id: Audience) => {
    storeEspace(id)
    selectAudience(id, 'espace_popup')
    setOpen(false)
    router.push(espacePaths[id])
  }

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector<HTMLElement>('button[data-espace]')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      // Garder le focus dans la fenêtre.
      if (e.key === 'Tab' && panelRef.current) {
        const items = panelRef.current.querySelectorAll<HTMLElement>('button')
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [open, close])

  if (!open) return null

  return (
    <div className="espace-overlay fixed inset-0 z-[70] flex items-end justify-center p-3 sm:items-center sm:p-6">
      <div aria-hidden="true" className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={close} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="espace-title"
        className="espace-panel relative max-h-[calc(100dvh-1.5rem)] w-full max-w-5xl overflow-y-auto rounded-[28px] border border-white/10 bg-[#0b0b0c] text-white shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Fermer et voir l'accueil général"
          className="absolute right-4 top-4 z-10 inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          <X className="size-4" aria-hidden="true" />
        </button>

        <div className="px-6 pb-2 pt-8 text-center sm:px-10 sm:pt-12">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#f6e3be]">Bienvenue chez RESTART</p>
          <h2 id="espace-title" className="pl-display mt-4 text-[2.2rem] leading-[1.02] sm:text-[3.2rem]">
            Pour quel espace ?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/55">
            Choisissez votre espace : on vous montre les équipements, les formules et les conseils qui vous concernent.
          </p>
        </div>

        <ul className="grid gap-3 p-4 sm:grid-cols-3 sm:gap-4 sm:p-8">
          {espaces.map((e) => (
            <li key={e.id}>
              <button
                type="button"
                data-espace={e.id}
                onClick={() => choose(e.id)}
                className="group relative flex h-full w-full items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-2 text-left transition hover:border-[#f6e3be]/50 focus-visible:border-[#f6e3be] focus-visible:outline-none sm:flex-col sm:items-stretch sm:p-0"
              >
                <span className="relative block aspect-square w-24 shrink-0 overflow-hidden rounded-xl sm:aspect-[4/5] sm:w-full sm:rounded-none">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={e.photo}
                    alt=""
                    className="size-full object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 hidden bg-gradient-to-t from-black/90 via-black/20 to-transparent sm:block"
                  />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-1 sm:absolute sm:inset-x-0 sm:bottom-0 sm:p-6">
                  <span className="text-lg font-semibold sm:text-2xl">{e.label}</span>
                  <span className="text-[13px] leading-snug text-white/60 sm:text-[14px] sm:text-white/75">{e.line}</span>
                  <span className="mt-2 hidden items-center gap-1.5 text-[13px] font-semibold text-[#f6e3be] sm:inline-flex">
                    Entrer
                    <ArrowRight className="size-3.5 transition group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </span>
                <ArrowRight className="mr-2 size-4 shrink-0 text-[#f6e3be] sm:hidden" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-center gap-3 border-t border-white/[0.07] px-6 py-5 text-center sm:flex-row sm:justify-between sm:px-8 sm:text-left">
          <p className="text-[13px] text-white/45">
            Votre choix est gardé pour vos prochaines visites. Vous pourrez changer d&apos;espace en haut de chaque page.
          </p>
          <button
            type="button"
            onClick={close}
            className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-semibold text-white/75 transition hover:text-white"
          >
            Voir tout le site
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
