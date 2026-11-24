'use client'

import { useEffect } from 'react'
import { applyV2Theme, themeOfEspace } from '@/lib/v2/themes'
import { useEspace } from '@/lib/v2/useEspace'

/**
 * Impose le thème de l'univers actif (particulier, entreprise, bars & commerces) au chargement et à chaque
 * changement d'univers : c'est le « code couleur par univers » demandé par RESTART. Le site général prend le
 * thème Particulier. Un `?theme=` dans l'adresse (démo) reste prioritaire.
 */
export function ThemeByEspace() {
  const espace = useEspace()
  useEffect(() => {
    if (new URLSearchParams(location.search).get('theme')) return
    applyV2Theme(themeOfEspace(espace))
  }, [espace])
  return null
}
