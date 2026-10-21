import Link from 'next/link'
import { ArrowRight, Check, MapPin, Star } from 'lucide-react'
import { audiences, findUnivers, formatPrice, univers, type Audience } from '@/data/catalogue'
import { audiencePath } from '@/data/audiencePages'
import { ambiance, universImage } from '@/data/images'
import { googleRating } from '@/data/reviews'
import { Reveal } from '@/components/Reveal'
import { ReviewsCarousel } from './ReviewsCarousel'
import { asset, site } from '@/lib/site'

const priceFrom = (slug: string) => {
  const p = findUnivers(slug)?.models.flatMap((m) => (m.price != null ? [m.price] : [])) ?? []
  return p.length ? `dès ${formatPrice(Math.min(...p))}` : 'sur devis'
}

/** Un chapitre par public : la même offre, racontée pour un bar, une entreprise, une maison. */
const chapters: { id: Audience; title: string; photo: string; alt: string; caption: string; points: string[] }[] = [
  {
    id: 'bar-commerce',
    title: 'Des clients qui restent pour une partie de plus',
    photo: asset('/img/situations/bar.webp'),
    alt: "Bar équipé d'un flipper, de fléchettes, d'une borne, d'un baby-foot et d'un billard",
    caption: 'Un bar, un soir de semaine',
    points: ['Location sans immobiliser de trésorerie', 'Monnayeur en option', 'Maintenance assurée', 'Covering à vos couleurs'],
  },
  {
    id: 'entreprise',
    title: 'Une pause qui rassemble vraiment les équipes',
    photo: ambiance.equipe,
    alt: "Collègues autour d'une borne d'arcade dans l'espace de pause d'une entreprise",
    caption: "L'espace de pause d'un open space",
    points: ['Achat ou location', 'Maintenance incluse en location', 'Usage libre, sans monnayeur', "Garantie jusqu'à 3 ans"],
  },
  {
    id: 'particulier',
    title: 'La salle de jeux que toute la maison attendait',
    photo: ambiance.salleDePause,
    alt: "Salon lumineux équipé d'un baby-foot, d'un billard et d'une borne d'arcade",
    caption: 'Un salon, un dimanche après-midi',
    points: ['Paiement en 2x, 3x ou 4x', 'Livré monté et installé', 'Prise en main sur place', "Garantie jusqu'à 3 ans"],
  },
]

const steps = [
  {
    title: 'On regarde votre espace',
    text: "Vingt minutes, sur place ou en visio, pour cadrer l'usage, la place et le budget. Gratuit, sans engagement.",
  },
  {
    title: 'On dessine votre équipement',
    text: 'Modèle, covering, couleurs, options : un visuel vous est soumis avant toute fabrication.',
  },
  {
    title: 'On livre et on installe',
    text: 'Livré monté, mis en service et pris en main sur place, partout en France, en deux à trois semaines.',
  },
  {
    title: 'On reste joignable',
    text: "Jusqu'à 3 ans de garantie et une ligne directe. En location, la maintenance est comprise.",
  },
]

/** Installations clients, recadrées sans les pastilles incrustées (public/img/carrousel). */
const installs = [
  { image: asset('/img/carrousel/reel-lyon.webp'), place: 'Lyon (69)', alt: "Borne d'arcade noir et or dans un café à Lyon" },
  { image: asset('/img/carrousel/reel-marseille.webp'), place: 'Marseille (13)', alt: "Partie de billard dans le salon d'un hôtel à Marseille" },
  { image: asset('/img/carrousel/reel-bourg.webp'), place: 'Bourg-lès-Valence (26)', alt: "Borne d'arcade personnalisée et baby-foot dans un barbier" },
  { image: asset('/img/carrousel/reel-castres.webp'), place: 'Castres (81)', alt: 'Partie de fléchettes électroniques dans un café à Castres' },
]

/**
 * Accueil de la version Carrousel, sous le carrousel photo : construit comme la
 * version Panorama (un chapitre par public, les gammes, la méthode, un appel
 * final avec des installations clients), dans sa propre palette bleu nuit,
 * ivoire et corail, avec des avis clients en plus.
 */
export function CarrouselHome() {
  return (
    <div className="crs">
      {/* --- Un chapitre par public ----------------------------------------- */}
      <section className="crs-intro">
        <p className="crs-kicker">Trois lieux, une même exigence</p>
        <h2 className="crs-h2">Le jeu qui fait vivre un espace, pensé pour le vôtre</h2>
      </section>
      {chapters.map((c, i) => {
        const a = audiences.find((x) => x.id === c.id)!
        return (
          <section key={c.id} className={`crs-chapter ${i % 2 ? 'crs-chapter--flip' : ''}`} data-tone={i}>
            <Reveal className="crs-chapter__media">
              <figure>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.photo} alt={c.alt} loading="lazy" />
                <figcaption>{c.caption}</figcaption>
              </figure>
            </Reveal>
            <div className="crs-chapter__body">
              <p className="crs-kicker">
                <span className="crs-chapter__n">{String(i + 1).padStart(2, '0')}</span>
                {a.label}
              </p>
              <h3 className="crs-h3">{c.title}</h3>
              <p className="crs-text">{a.blurb}</p>
              <ul className="crs-points">
                {c.points.map((p) => (
                  <li key={p}>
                    <Check className="size-4 shrink-0" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
              <Link href={audiencePath(c.id)} className="crs-btn">
                {a.short}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </section>
        )
      })}

      {/* --- Les gammes ---------------------------------------------------- */}
      <section className="crs-section">
        <div className="crs-head">
          <div>
            <p className="crs-kicker">Le catalogue</p>
            <h2 className="crs-h2">Sept familles de jeux, livrées montées</h2>
          </div>
          <Link href="/produits/" className="crs-link">
            Tout le catalogue
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="crs-ranges">
          {univers.map((u, i) => (
            <li key={u.slug}>
              <Reveal delayMs={(i % 4) * 80} className="h-full">
                <Link href={`/produits/${u.slug}/`} className="crs-range">
                  <span className="crs-range__shot">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={universImage(u.slug)} alt="" loading="lazy" />
                  </span>
                  <span className="crs-range__name">{u.name}</span>
                  <span className="crs-range__meta">
                    {u.models.length > 0 ? `${u.models.length} modèle${u.models.length > 1 ? 's' : ''} · ` : ''}
                    {priceFrom(u.slug)}
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* --- La méthode ---------------------------------------------------- */}
      <section className="crs-method">
        <div className="crs-method__media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ambiance.showroom} alt="Borne d'arcade, fléchettes, baby-foot et fauteuil massant dans le showroom RESTART" loading="lazy" />
        </div>
        <div className="crs-method__body">
          <p className="crs-kicker">Notre méthode</p>
          <h2 className="crs-h2">De l&apos;idée à la première partie</h2>
          <ol className="crs-steps">
            {steps.map((s, i) => (
              <li key={s.title}>
                <span className="crs-steps__n">{i + 1}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* --- Avis ---------------------------------------------------------- */}
      <section className="crs-section crs-section--last">
        <div className="crs-head">
          <div>
            <p className="crs-kicker">
              <Star className="size-3.5 fill-current" aria-hidden="true" /> {googleRating.value} sur Google
            </p>
            <h2 className="crs-h2">Ils ont joué, ils en parlent</h2>
          </div>
        </div>
        <Reveal>
          <ReviewsCarousel />
        </Reveal>
      </section>

      {/* --- Appel final --------------------------------------------------- */}
      <section className="crs-final">
        <div className="crs-final__body">
          <p className="crs-kicker crs-kicker--light">Devis gratuit sous 48 heures</p>
          <h2 className="crs-final__title">Un coin à animer, une idée à chiffrer ?</h2>
          <p className="crs-final__text">
            Décrivez votre espace en deux minutes : nous revenons vers vous sous 48 heures avec une proposition chiffrée.
          </p>
          <div className="crs-actions">
            <Link href="/contact/" className="crs-btn crs-btn--coral">
              Décrire mon projet
            </Link>
            <a href={`tel:${site.phoneE164}`} className="crs-btn crs-btn--ghost">
              {site.phone}
            </a>
          </div>
        </div>
        <div className="crs-final__proof">
          <ul className="crs-final__grid">
            {installs.map((r) => (
              <li key={r.image}>
                <figure>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.image} alt={r.alt} loading="lazy" />
                  <figcaption>
                    <MapPin className="size-3.5" aria-hidden="true" />
                    {r.place}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <Link href="/realisations/" className="crs-link crs-link--light">
            Toutes nos réalisations
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  )
}
