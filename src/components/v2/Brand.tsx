import { asset } from '@/lib/site'

/**
 * Logo RESTART (charte de novembre 2026), en deux morceaux comme le logo de mabellenote.com : le « R » à
 * triangle bleu, qui ne bouge pas, et le reste du mot, qui se replie et se déplie à côté. Deux versions du
 * fichier fourni : blanche (fonds sombres) et noire (fonds clairs) ; laquelle s'affiche est décidée en CSS.
 * Les proportions (R = 176 px sur 1200) sont dans `.v-brand` (v2.css).
 */
function Layer({ className, alt }: { className: string; alt: string }) {
  return (
    <span className={className} aria-hidden={alt ? undefined : true}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="v-brand__img v-brand__img--blanc" src={asset('/img/logo/restart-blanc.webp')} alt={alt} width={1200} height={169} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="v-brand__img v-brand__img--noir" src={asset('/img/logo/restart-noir.webp')} alt="" width={1200} height={169} aria-hidden="true" />
    </span>
  )
}

export function Brand({ className = '' }: { className?: string }) {
  return (
    <span className={`v-brand ${className}`}>
      <Layer className="v-brand__r" alt="RESTART" />
      <Layer className="v-brand__rest" alt="" />
    </span>
  )
}
