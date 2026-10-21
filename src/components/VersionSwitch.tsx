'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, Gamepad2 } from 'lucide-react'
import { CURRENT_VERSION, versionUrl, versions } from '@/lib/versions'
import { track } from '@/lib/analytics'

/**
 * Onglet « Version » sur le bord gauche : liste les autres propositions de refonte,
 * publiées chacune à son adresse sur le même site Pages.
 */
export function VersionSwitch() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

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

  const active = versions.find((v) => v.id === CURRENT_VERSION)!

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="version-panel"
        aria-label={`Version ${active.name} affichée. Changer de version`}
        className="fixed left-0 top-1/2 z-[60] flex -translate-y-1/2 flex-col items-center gap-2 border border-l-0 border-[#24170e]/15 bg-[#f6f1ea] px-2 py-3 text-[#24170e] shadow-[0_10px_30px_-12px_rgba(36,23,14,0.45)] transition hover:pl-3"
      >
        <Gamepad2 className="size-5 text-[#9c7445]" aria-hidden="true" />
        <span className="rotate-180 text-[11px] font-semibold uppercase tracking-wider [writing-mode:vertical-rl]">
          Version <span className="opacity-60">{active.name}</span>
        </span>
      </button>

      {open && (
        <div
          ref={panelRef}
          id="version-panel"
          role="dialog"
          aria-label="Choisir une version du site"
          className="fixed left-14 top-1/2 z-[60] w-[min(19rem,calc(100vw-4.5rem))] -translate-y-1/2 overflow-hidden border border-[#24170e]/15 bg-[#f6f1ea] text-[#24170e] shadow-[0_24px_60px_-20px_rgba(36,23,14,0.5)]"
        >
          <p className="border-b border-[#24170e]/10 px-4 py-3 text-xs font-bold uppercase tracking-wider">
            Versions du site
          </p>
          <ul className="p-1.5">
            {versions.map((v) => {
              const selected = v.id === CURRENT_VERSION
              return (
                <li key={v.id}>
                  <a
                    href={versionUrl(v)}
                    aria-current={selected ? 'page' : undefined}
                    onClick={() => track('version_change', { version: v.id })}
                    className={`flex items-start gap-3 px-3 py-2.5 transition ${selected ? 'bg-[#24170e]/[0.06]' : 'hover:bg-[#24170e]/[0.06]'}`}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold">{v.name}</span>
                      <span className="block text-xs opacity-70">{v.desc}</span>
                    </span>
                    {selected ? (
                      <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    ) : (
                      <ArrowUpRight className="mt-0.5 size-4 shrink-0 opacity-50" aria-hidden="true" />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </>
  )
}
