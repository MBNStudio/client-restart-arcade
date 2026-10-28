'use client'

import type { ComponentProps } from 'react'
import Link from 'next/link'
import type { Audience } from '@/data/catalogue'
import { storeEspace } from '@/lib/espace'
import { selectAudience } from '@/lib/analytics'

/** Lien vers l'accueil d'un espace, qui en fait l'espace des prochaines visites. */
export function EspaceLink({
  espace,
  from,
  ...props
}: ComponentProps<typeof Link> & { espace: Audience; from: string }) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        storeEspace(espace)
        selectAudience(espace, from)
        props.onClick?.(e)
      }}
    />
  )
}
