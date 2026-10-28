'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ArrowUpRight, Check, Disc3, Hammer, Images, Lightbulb, Signpost, Sofa, Store, Sun } from 'lucide-react'
import {
  applyVersion,
  currentVersion,
  externalVersions,
  externalVersionUrl,
  versions,
  type ExternalVersionId,
  type VersionId,
} from '@/lib/version'
import { track } from '@/lib/analytics'

const icons: Record<VersionId | ExternalVersionId, typeof Images> = {
  panorama: Sofa,
  showroom: Store,
  atelier: Hammer,
  'plateau-v2': Signpost,
  plateau: Disc3,
  'plateau-clair': Sun,
  halo: Lightbulb,
  studio: Images,
}

/**
 * Bascule de version : un onglet sur le bord gauche, pendant de l'onglet
 * Thèmes, qui ouvre la liste des versions. Choisir une version depuis une
 * autre page ramène à l'accueil, où les versions diffèrent le plus. Panorama
 * et Showroom sont des sites à part (sous-dossiers du même site Pages) : on y
 * va par lien.
 */
export function VersionSwitch() {
  const [current, setCurrent] = useState<VersionId>('studio')
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => setCurrent(currentVersion()), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node
      if (panelRef.current?.contains(target) || buttonRef.current?.contains(target)) return
      setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  const active = versions.find((v) => v.id === current) ?? versions[0]
  const Icon = icons[active.id]

  const choose = (id: VersionId) => {
    setOpen(false)
    if (id === current) return
    applyVersion(id)
    setCurrent(id)
    track('version_change', { version: id })
    if (pathname !== '/') router.push('/')
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="version-panel"
        aria-label={`Version ${active.name} affichée. Changer de version`}
        className="fixed left-0 top-1/2 z-[60] flex -translate-y-1/2 flex-col items-center gap-2 rounded-r-xl border border-l-0 border-border bg-card px-2 py-3 text-foreground shadow-[var(--shadow-paper-lg)] transition hover:pl-3"
      >
        <Icon className="size-5 text-accent" aria-hidden="true" />
        <span className="rotate-180 font-sans text-[11px] font-semibold uppercase tracking-wider [writing-mode:vertical-rl]">
          Version <span className="text-muted-foreground">{active.name}</span>
        </span>
      </button>

      {open && (
        <div
          ref={panelRef}
          id="version-panel"
          role="dialog"
          aria-label="Choisir une version du site"
          className="fixed left-14 top-1/2 z-[60] w-[min(18rem,calc(100vw-4.5rem))] -translate-y-1/2 overflow-hidden rounded-2xl border border-border bg-card font-sans text-foreground shadow-[var(--shadow-paper-lg)]"
        >
          <p className="border-b border-border px-4 py-3 text-sm font-semibold">Versions du site</p>
          <ul aria-label="Autres sites de la refonte" className="px-1.5 pt-1.5">
            {externalVersions.map((v) => {
              const VIcon = icons[v.id]
              return (
                <li key={v.id}>
                  <a
                    href={externalVersionUrl(v)}
                    onClick={() => track('version_change', { version: v.id })}
                    className="flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-muted"
                  >
                    <VIcon className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold">{v.name}</span>
                      <span className="block text-xs text-muted-foreground">{v.desc}</span>
                    </span>
                    <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  </a>
                </li>
              )
            })}
          </ul>
          <ul role="radiogroup" aria-label="Version" className="px-1.5 pb-1.5">
            {versions.map((v) => {
              const VIcon = icons[v.id]
              const selected = v.id === current
              return (
                <li key={v.id}>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => choose(v.id)}
                    className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition ${selected ? 'bg-muted' : 'hover:bg-muted'}`}
                  >
                    <VIcon className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold">{v.name}</span>
                      <span className="block text-xs text-muted-foreground">{v.desc}</span>
                    </span>
                    {selected && <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" />}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </>
  )
}
