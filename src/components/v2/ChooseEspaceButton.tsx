'use client'

import type { ReactNode } from 'react'
import { openEspaceChooser } from '@/lib/espace'

/** Bouton qui ouvre la pop-up de choix d'espace. */
export function ChooseEspaceButton({ className, children, rest = '' }: { className?: string; children: ReactNode; rest?: string }) {
  return (
    <button type="button" className={className} onClick={() => openEspaceChooser(rest)}>
      {children}
    </button>
  )
}
