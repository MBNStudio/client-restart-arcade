'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { espaceOfPath, espacePaths, espaces, storeEspace } from '@/lib/espace'
import { selectAudience } from '@/lib/analytics'

/**
 * Bandeau des trois espaces, en haut de chaque page : on passe de l'un à
 * l'autre en un clic, et le dernier espace choisi devient celui des
 * prochaines visites.
 */
export function EspaceBar() {
  const pathname = usePathname()
  const current = espaceOfPath(pathname)

  return (
    <div className="espace-bar border-b border-white/[0.07] bg-black text-white">
      <nav
        aria-label="Espaces"
        className="mx-auto flex h-11 max-w-7xl items-stretch justify-center gap-1 px-3 sm:justify-start sm:gap-2 sm:px-6"
      >
        <span className="mr-2 hidden items-center text-[12px] text-white/40 sm:inline-flex">Vous êtes</span>
        {espaces.map((e) => {
          const active = e.id === current
          return (
            <Link
              key={e.id}
              href={espacePaths[e.id]}
              aria-current={active ? 'page' : undefined}
              onClick={() => {
                storeEspace(e.id)
                selectAudience(e.id, 'espace_bar')
              }}
              className={`relative inline-flex flex-1 items-center justify-center px-2 text-[13px] font-medium transition sm:flex-none sm:px-3 ${
                active ? 'text-white' : 'text-white/55 hover:text-white'
              }`}
            >
              <span className="sm:hidden">{e.short}</span>
              <span className="hidden sm:inline">{e.label}</span>
              {active && (
                <span aria-hidden="true" className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-[#f6e3be] sm:inset-x-3" />
              )}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
