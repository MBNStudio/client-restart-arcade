'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ArrowRight, X } from 'lucide-react'
import type { Audience } from '@/data/catalogue'
import { ESPACE_OPEN_EVENT, storedEspace, storeEspace } from '@/lib/espace'
import { espaceHref, espacesV2 } from '@/data/v2/espaces'
import { selectAudience } from '@/lib/analytics'

/**
 * Pop-up de choix de l'espace (bar & commerce, entreprise, particulier).
 * S'ouvre à la première visite sur le site général, puis chaque fois qu'un lien du
 * site général mène vers une page d'espace (produits, concept…) : elle conduit alors
 * à cette page dans l'espace choisi. Fermer laisse sur le site général.
 */
export function EspaceChooser() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [rest, setRest] = useState('')
  const panelRef = useRef<HTMLDivElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (pathname === '/' && storedEspace() === null) {
      setRest('')
      setOpen(true)
    }
  }, [pathname])

  useEffect(() => {
    const onOpen = (e: Event) => {
      returnFocus.current = document.activeElement as HTMLElement | null
      setRest((e as CustomEvent<{ rest?: string }>).detail?.rest ?? '')
      setOpen(true)
    }
    window.addEventListener(ESPACE_OPEN_EVENT, onOpen)
    return () => window.removeEventListener(ESPACE_OPEN_EVENT, onOpen)
  }, [])

  const close = useCallback(() => {
    if (storedEspace() === null) {
      storeEspace('general')
      selectAudience('general', 'espace_popup')
    }
    setOpen(false)
    returnFocus.current?.focus()
  }, [])

  const choose = (id: Audience) => {
    storeEspace(id)
    selectAudience(id, 'espace_popup')
    setOpen(false)
    router.push(espaceHref(id, rest))
  }

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector<HTMLElement>('button[data-espace]')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
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

  const goingSomewhere = rest !== ''

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-3 sm:items-center sm:p-6">
      <div aria-hidden="true" className="v-pop-backdrop absolute inset-0 bg-black/65 backdrop-blur-md" onClick={close} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="espace-title"
        className="v-pop relative flex max-h-[calc(100dvh-1.5rem)] w-full max-w-5xl flex-col overflow-y-auto border border-v-line bg-v-surface text-v-ink shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)]"
        style={{ borderRadius: 'calc(var(--v-radius) + 0.75rem)' }}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Fermer et rester sur le site général"
          className="absolute right-4 top-4 z-10 inline-flex size-10 items-center justify-center rounded-full border border-v-line bg-v-bg/70 text-v-ink/80 transition hover:text-v-ink"
        >
          <X className="size-4" aria-hidden="true" />
        </button>

        <div className="v-pop-head px-14 pb-2 pt-9 text-center sm:px-16 sm:pt-12">
          <p className="v-eyebrow justify-center">Bienvenue chez RESTART</p>
          <h2 id="espace-title" className="v-pop-title v-display v-h2 mt-5">
            {goingSomewhere ? (
              <>
                Pour quel <em>espace</em> ?
              </>
            ) : (
              <>
                Quel est votre <em>espace</em> ?
              </>
            )}
          </h2>
          <p className="v-pop-lead v-lead mx-auto mt-4 max-w-md text-[15px]">
            {goingSomewhere
              ? 'Les produits, les prix et les formules changent selon votre lieu : choisissez le vôtre, on vous y emmène.'
              : 'Choisissez votre espace : on vous montre les équipements, les formules et les conseils qui vous concernent.'}
          </p>
        </div>

        <ul className="v-pop-list grid gap-3 p-4 sm:grid-cols-3 sm:gap-4 sm:p-8">
          {espacesV2.map((e) => (
            <li key={e.id}>
              <button
                type="button"
                data-espace={e.id}
                onClick={() => choose(e.id)}
                className="group relative flex h-full w-full items-center gap-4 overflow-hidden border border-v-line p-2 text-left transition hover:border-v-accent focus-visible:border-v-accent focus-visible:outline-none sm:flex-col sm:items-stretch sm:p-0"
                style={{ borderRadius: 'var(--v-radius)' }}
              >
                <span className="v-pop-photo relative block aspect-square w-24 shrink-0 overflow-hidden sm:aspect-auto sm:w-full" style={{ borderRadius: 'calc(var(--v-radius) - 0.25rem)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={e.video.fallback}
                    alt=""
                    className="size-full object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <span aria-hidden="true" className="absolute inset-0 hidden bg-gradient-to-t from-black/85 via-black/15 to-transparent sm:block" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-1 sm:absolute sm:inset-x-0 sm:bottom-0 sm:p-6 sm:text-white">
                  <span className="v-display text-xl sm:text-2xl">{e.label}</span>
                  <span className="text-[13px] leading-snug text-v-soft sm:text-[14px] sm:text-white/80">{e.line}</span>
                  <span className="mt-2 hidden items-center gap-1.5 text-[13px] font-semibold sm:inline-flex">
                    {e.kind === 'boutique' ? 'Voir la boutique' : 'Entrer'}
                    <ArrowRight className="size-3.5 transition group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </span>
                <ArrowRight className="mr-2 size-4 shrink-0 text-v-accent sm:hidden" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>

        <div className="v-pop-foot flex flex-col items-center gap-3 border-t border-v-line px-6 py-5 text-center sm:flex-row sm:justify-between sm:px-8 sm:text-left">
          <p className="text-[13px] text-v-soft">
            Votre choix est gardé pour vos prochaines visites. Vous pourrez changer d&apos;espace dans le menu.
          </p>
          <button
            type="button"
            onClick={close}
            className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-semibold text-v-ink/80 transition hover:text-v-ink"
          >
            {pathname === '/' ? 'Rester sur le site général' : 'Fermer'}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
