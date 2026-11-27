import contenus from '@/data/contenus.generated.json'
import type { Audience } from '@/data/catalogue'
import { delai } from './sections'

type Bloc = { titre: string | null; textes: string[] }
const pages = contenus as Record<string, Bloc[]>

/**
 * Texte de présentation repris, mot pour mot, du site actuel de RESTART (scripts/build-contenus.py), sur les
 * pages gamme (`<public>/<gamme>`). Pas sur les accueils : RESTART ne l'a pas demandé. Les premiers blocs sont lisibles
 * directement ; la suite se déplie, pour ne pas alourdir la page (le texte reste dans le HTML, donc indexé).
 */
export function Presentation({ id, univers }: { id: Audience; univers: string }) {
  const blocs = pages[`${id}/${univers}`]
  if (!blocs?.length) return null
  const visibles = blocs.slice(0, 2)
  const suite = blocs.slice(2)
  return (
    <section className="border-t border-v-line py-20 lg:py-24" aria-label="Présentation">
      <div className="v-wrap">
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-2">
          {visibles.map((b, i) => (
            <BlocTexte key={i} bloc={b} delay={i * 90} />
          ))}
        </div>
        {suite.length > 0 && (
          <details className="group mt-10">
            <summary className="v-btn v-btn--line list-none [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">Lire la suite</span>
              <span className="hidden group-open:inline">Refermer</span>
            </summary>
            <div className="mt-10 grid gap-x-14 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
              {suite.map((b, i) => (
                <BlocTexte key={i} bloc={b} small />
              ))}
            </div>
          </details>
        )}
      </div>
    </section>
  )
}

function BlocTexte({ bloc, small = false, delay }: { bloc: Bloc; small?: boolean; delay?: number }) {
  return (
    <div {...(delay !== undefined && { 'data-reveal': true, style: delai(delay) })}>
      {bloc.titre && (
        <h2 className={`v-display leading-tight ${small ? 'text-[1.15rem]' : 'text-[clamp(1.4rem,2.2vw,2rem)]'}`}>{bloc.titre}</h2>
      )}
      {bloc.textes.map((t) => (
        <p key={t} className="mt-3 text-[15px] leading-relaxed text-v-soft">
          {t}
        </p>
      ))}
    </div>
  )
}
