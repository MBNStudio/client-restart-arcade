import { Power } from 'lucide-react'

/** Logo provisoire (le nouveau logo de RESTART arrive) : pastille « marche » et nom, en couleur du texte. */
export function Brand({ className = '' }: { className?: string }) {
  return (
    <span className={`v-brand ${className}`}>
      <span className="v-brand__dot" aria-hidden="true">
        <Power strokeWidth={2.5} />
      </span>
      RESTART
    </span>
  )
}
