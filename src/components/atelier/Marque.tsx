import { Power } from 'lucide-react'

/**
 * Marque RESTART (celle des versions Halo et Showroom) : pastille « marche » et nom en
 * toutes lettres. Elle prend la couleur du texte autour d'elle : noire sur fond clair,
 * blanche sur fond sombre (en-tête sur la photo, menu plein écran, pied de page).
 */
export function Marque({ className = '' }: { className?: string }) {
  return (
    <span className={`marque ${className}`}>
      <span className="marque__pastille" aria-hidden="true">
        <Power strokeWidth={2.5} />
      </span>
      RESTART
    </span>
  )
}
