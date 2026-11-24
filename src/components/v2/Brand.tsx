import { asset } from '@/lib/site'

/**
 * Logo RESTART (charte de novembre 2026). Deux versions du fichier fourni : blanche (fonds sombres) et noire
 * (fonds clairs), le triangle bleu est commun. Dans l'en-tête resserré, `.v-brand__clip` ne laisse voir que le « R ». Laquelle s'affiche est décidée en CSS (voir `.v-brand` dans v2.css).
 */
export function Brand({ className = '' }: { className?: string }) {
  return (
    <span className={`v-brand ${className}`}>
      <span className="v-brand__clip">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="v-brand__img v-brand__img--blanc" src={asset('/img/logo/restart-blanc.webp')} alt="RESTART" width={1200} height={169} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="v-brand__img v-brand__img--noir" src={asset('/img/logo/restart-noir.webp')} alt="" width={1200} height={169} aria-hidden="true" />
      </span>
    </span>
  )
}
