'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import type { Audience } from '@/data/catalogue'
import { ESPACE_STORAGE_KEY, espaceOfPath, storedEspace } from '@/lib/espace'

/**
 * Espace du visiteur : celui de la page affichée (/particuliers/…), sinon celui
 * qu'il a choisi dans la pop-up. `null` sur le site général tant qu'il n'a pas choisi.
 * Au premier rendu (HTML statique), seul l'espace de l'adresse est connu.
 */
export function useEspace(): Audience | null {
  const pathname = usePathname()
  const fromPath = espaceOfPath(pathname) ?? null
  const [stored, setStored] = useState<Audience | null>(null)

  useEffect(() => {
    const read = () => {
      const s = storedEspace()
      setStored(s && s !== 'general' ? s : null)
    }
    read()
    const onStorage = (e: StorageEvent) => e.key === ESPACE_STORAGE_KEY && read()
    window.addEventListener('storage', onStorage)
    window.addEventListener('restart:espace-stored', read)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('restart:espace-stored', read)
    }
  }, [pathname])

  // Sur l'accueil général, on reste sur le site général même si un espace a été choisi avant.
  if (fromPath) return fromPath
  return pathname === '/' ? null : stored
}
