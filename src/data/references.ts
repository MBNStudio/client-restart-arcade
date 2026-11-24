import raw from './references.generated.json'
import accords from './references-accords.json'
import { asset } from '@/lib/site'

/**
 * Médiathèque de références clients (V3, lot 6) : les photos fournies par RESTART, rangées dans les trois
 * dossiers de leurs commerciaux. L'index vient de `scripts/build-references.mjs` ; une photo n'est publiée
 * que si son identifiant figure dans `references-accords.json` (accord d'affichage du client confirmé) et
 * si elle a été convertie dans `public/img/references/`.
 */
export type Commercial = 'maxime' | 'thibaut' | 'guillaume'

export type Reference = {
  id: string
  fichier: string
  commercial: Commercial
  /** Secteur du commercial : Sud-Est (Maxime), Sud-Ouest (Thibaut), Auvergne-Rhône-Alpes (Guillaume). */
  secteur: string
  client: string
  produit: string
  /** Ville du client, à fournir par RESTART : sert aux futures landings par ville et par région. */
  ville: string | null
  utilisable: boolean
}

export const references = raw as Reference[]

/** Adresse de l'image convertie (WebP). */
export const referenceSrc = (r: Reference) => asset(`/img/references/${r.id}.webp`)

/** Photos dont l'affichage est autorisé. */
export const referencesPubliees = references.filter((r) => r.utilisable && (accords as string[]).includes(r.id))
