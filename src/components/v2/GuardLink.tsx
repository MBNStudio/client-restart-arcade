'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Audience } from '@/data/catalogue'
import { espaceHref, espaceV2 } from '@/data/v2/espaces'
import { openEspaceChooser, storedEspace } from '@/lib/espace'
import { useEspace } from '@/lib/v2/useEspace'

/**
 * Lien vers une page d'espace (`rest` = « produits/baby-foot/ »). Dans un espace,
 * il y mène directement. Sur le site général, il mène à l'espace déjà choisi, sinon
 * il rouvre la pop-up, qui conduira à la même page dans l'espace choisi.
 * Sans JavaScript (et pour les moteurs), le lien pointe vers l'espace bar & commerce
 * (95 % du chiffre d'affaires), ou entreprise pour les gammes que les bars n'ont pas.
 */
function fallback(rest: string): Audience {
  const slug = /^produits\/([^/]+)\//.exec(rest)?.[1]
  return !slug || espaceV2('bar-commerce').univers.includes(slug) ? 'bar-commerce' : 'entreprise'
}

export function GuardLink({
  rest,
  className,
  children,
  ariaLabel,
  style,
}: {
  rest: string
  className?: string
  children: ReactNode
  ariaLabel?: string
  style?: React.CSSProperties
}) {
  const router = useRouter()
  const espace = useEspace()
  const href = espaceHref(espace ?? fallback(rest), rest)
  return (
    <Link
      href={href}
      className={className}
      aria-label={ariaLabel}
      style={style}
      onClick={(e) => {
        if (espace) return
        e.preventDefault()
        const s = storedEspace()
        if (s && s !== 'general') router.push(espaceHref(s as Audience, rest))
        else openEspaceChooser(rest)
      }}
    >
      {children}
    </Link>
  )
}
