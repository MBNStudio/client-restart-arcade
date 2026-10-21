import Link from 'next/link'
import { Power } from 'lucide-react'
import { audiencePath } from '@/data/audiencePages'
import { ambiance, realisationPhotos } from '@/data/images'
import { asset, site } from '@/lib/site'
import { lienDevis } from './nav'

/*
 * Accueil de la version Atelier. Reprend, section par section, la mise en page
 * d'ab-agencement.com (relevée le 21 octobre 2026) :
 *   1. ouverture plein écran : photo, surtitre, titre en trois lignes, deux boutons, trois repères ;
 *   2. « L'atelier » : grande phrase, deux paragraphes, deux photos décalées ;
 *   3. « Savoir-faire » : quatre cartes numérotées ;
 *   4. bandeau de mots qui défile ;
 *   5. « Méthode » : quatre étapes en grille ;
 *   6. « Réalisations » : mosaïque de six photos sur trois colonnes ;
 *   7. engagement en citation.
 * Le contenu vient des pages existantes du site RESTART : rien n'est inventé.
 */

const img = (p: string) => asset(`/img/${p}.webp`)

function Fleche({ className = 'fleche' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

const delai = (ms: number) => ({ '--delai': `${ms}ms` }) as React.CSSProperties

const atelier = [
  { src: ambiance.showroom, legende: "Le showroom RESTART : borne d'arcade, cible de fléchettes, baby-foot, fauteuil massant et cocon de repos" },
  { src: img('realisations/r117'), legende: "Borne d'arcade Metal Slug dans notre showroom, avant livraison" },
]

const savoirFaire = [
  {
    num: '01',
    titre: 'Pour les entreprises',
    texte: 'Des salles de pause qui font revenir vos équipes, des espaces d’accueil où l’attente devient un bon moment.',
    href: audiencePath('entreprise'),
    photo: { src: img('situations/entreprise'), legende: "Collègues autour d'un billard dans l'espace détente de leur entreprise" },
  },
  {
    num: '02',
    titre: 'Pour les bars & commerces',
    texte: 'Un équipement qui allonge le temps passé sur place et le panier moyen, à votre image, monnayeur en option.',
    href: audiencePath('bar-commerce'),
    photo: { src: img('situations/flechettes'), legende: 'Partie de fléchettes électroniques dans un bar' },
  },
  {
    num: '03',
    titre: 'Pour les particuliers',
    texte: "La salle d'arcade dans votre salon ou votre garage, livrée montée et prête à jouer.",
    href: audiencePath('particulier'),
    photo: { src: img('situations/maison'), legende: "Adolescents autour d'une borne d'arcade dans un salon" },
  },
  {
    num: '04',
    titre: 'Personnalisation',
    texte: 'Covering, couleur des boutons, T-Molding, logo : vous validez un visuel avant toute fabrication.',
    href: '/produits/',
    photo: { src: img('hero/baby-foot'), legende: 'Baby-foot en bois gravé au nom du client' },
  },
]

const motsDefilants = [
  "Bornes d'arcade",
  'Fléchettes électroniques',
  'Baby-foot',
  'Billards',
  'Flippers numériques',
  'Fauteuils massants',
  'Cocons de repos',
  'Covering à vos couleurs',
  'Vente & location',
]

const etapes = [
  { num: '01', titre: 'Conseil', texte: "Vingt minutes, sur place ou en visio, pour cadrer l'usage, la place et le budget. Gratuit, sans engagement." },
  { num: '02', titre: 'Personnalisation', texte: 'Modèle, covering, couleurs, options : un visuel vous est soumis avant toute fabrication.' },
  { num: '03', titre: 'Installation', texte: 'Livré monté, mis en service et pris en main sur place, partout en France, en deux à trois semaines.' },
  { num: '04', titre: 'Suivi', texte: "Jusqu'à 3 ans de garantie et une ligne directe. En location, la maintenance est comprise." },
]

/** Installations clients, recadrées sans les pastilles incrustées quand c'est possible. */
const selection = [
  [
    { src: img('carrousel/reel-lyon'), categorie: "Borne d'arcade", legende: 'Borne noir et or dans un café à Lyon (69)' },
    { src: img('carrousel/reel-bourg'), categorie: 'Borne & baby-foot', legende: 'Borne personnalisée et baby-foot chez un barbier à Bourg-lès-Valence (26)' },
  ],
  [
    { src: img('carrousel/reel-marseille'), categorie: 'Billard', legende: "Partie de billard dans le salon d'un hôtel à Marseille (13)" },
    { src: img('carrousel/reel-castres'), categorie: 'Fléchettes', legende: 'Partie de fléchettes électroniques dans un café à Castres (81)' },
  ],
  [
    { src: img('realisations/r140'), categorie: "Borne d'arcade", legende: 'Partie à deux dans un pub de nuit à Lyon (69)' },
    { src: img('realisations/r33'), categorie: 'Baby-foot', legende: "Baby-foot d'extérieur à Saint-Cirgue (81)" },
  ],
]

export function AtelierHome() {
  return (
    <>
      {/* Ouverture */}
      <section className="sur-sombre relative -mt-[4.5rem] flex min-h-[100svh] items-end overflow-hidden bg-encre text-lin lg:-mt-20">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img('situations/bar')}
            alt="Bar équipé d'un flipper, d'une cible de fléchettes, d'une borne d'arcade, d'un baby-foot et d'un billard"
            fetchPriority="high"
            className="zoom-lent h-full w-full object-cover object-[50%_40%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-encre via-encre/45 to-encre/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-encre/70 via-encre/10 to-transparent" />
        </div>

        <div className="conteneur relative pt-40 pb-12 lg:pb-16">
          <p className="surtitre apparait !text-chene" style={delai(200)}>
            {site.tagline} · Près de Lyon
          </p>
          <h1 className="titre-xl mt-6 max-w-5xl">
            <span className="ligne">
              <span style={delai(300)}>Transformez</span>
            </span>
            <span className="ligne">
              <span style={delai(410)}>
                vos <em>espaces</em>
              </span>
            </span>
            <span className="ligne">
              <span style={delai(520)}>avec RESTART.</span>
            </span>
          </h1>
          <p className="apparait mt-7 max-w-xl text-lg leading-relaxed text-lin/80" style={delai(800)}>
            Bornes d&apos;arcade, fléchettes électroniques, baby-foot, billards et flippers numériques, personnalisés à
            votre image pour les entreprises, les bars et les particuliers.
          </p>
          <div className="apparait mt-9 flex flex-wrap gap-3" style={delai(950)}>
            <Link href="/realisations/" className="btn btn-clair">
              Voir nos réalisations <Fleche />
            </Link>
            <Link href={lienDevis} className="btn btn-contour-clair hidden sm:inline-flex">
              Demander un devis
            </Link>
          </div>

          <div className="apparait mt-16 hidden grid-cols-3 border-t border-lin/15 pt-6 text-sm text-lin/70 md:grid" style={delai(1150)}>
            <p>
              <span className="text-lin">Entreprises, bars & particuliers</span>
              <br />
              Vente et location
            </p>
            <p>
              <span className="text-lin">Conseil, personnalisation, installation</span>
              <br />
              Un seul interlocuteur
            </p>
            <p>
              <span className="text-lin">Partout en France</span>
              <br />
              Atelier et showroom près de Lyon
            </p>
          </div>
        </div>
      </section>

      {/* L'atelier */}
      <section className="conteneur py-24 lg:py-36">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="surtitre" data-reveal>
              L&apos;atelier
            </p>
            <p
              className="font-display mt-7 text-[1.75rem] leading-[1.25] font-light tracking-[-0.015em] sm:text-4xl lg:text-[2.75rem]"
              data-reveal
              style={delai(80)}
            >
              À {site.address.city}, près de Lyon, nous assemblons, personnalisons et testons des jeux qui rassemblent{' '}
              <em className="text-chene-fonce">vos équipes</em>, <em className="text-chene-fonce">vos clients</em> et{' '}
              <em className="text-chene-fonce">vos proches</em>.
            </p>
            <div className="mt-10 grid gap-8 sm:grid-cols-2" data-reveal style={delai(160)}>
              <p className="texte-courant">
                Un baby-foot, une borne d&apos;arcade ou une cible de fléchettes se passe de mode d&apos;emploi : la partie
                dure cinq minutes, tout le monde sait jouer, et deux personnes qui ne se seraient pas parlé se retrouvent
                du même côté de la table.
              </p>
              <p className="texte-courant">
                C&apos;est pour ça que nous commençons chaque projet par l&apos;espace et par les gens qui vont
                l&apos;occuper, avant de parler modèle et budget.
              </p>
            </div>
            <Link
              href="/qui-sommes-nous/"
              className="lien-souligne mt-10 inline-flex items-center gap-2 font-semibold"
              data-reveal
              style={delai(220)}
            >
              Découvrir RESTART <Fleche className="size-4" />
            </Link>
          </div>
          <div className="relative grid grid-cols-2 gap-4 lg:col-span-5">
            <div className="cadre-image aspect-[3/4]" data-reveal="image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={atelier[0].src} alt={atelier[0].legende} loading="lazy" className="object-[38%_50%]" />
            </div>
            <div className="cadre-image mt-16 aspect-[3/4]" data-reveal="image" style={delai(150)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={atelier[1].src} alt={atelier[1].legende} loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Savoir-faire */}
      <section className="bg-sable py-24 lg:py-32">
        <div className="conteneur">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="surtitre" data-reveal>
                Savoir-faire
              </p>
              <h2 className="titre-l mt-6" data-reveal style={delai(80)}>
                Ce que nous <em>installons</em>
              </h2>
            </div>
            <Link href="/produits/" className="btn btn-contour self-start md:self-auto" data-reveal style={delai(120)}>
              Tous nos produits <Fleche />
            </Link>
          </div>

          <div className="mt-14 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {savoirFaire.map((s, i) => (
              <Link key={s.num} href={s.href} className="group block" data-reveal style={delai(i * 90)}>
                <div className="cadre-image aspect-[4/5]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.photo.src} alt={s.photo.legende} loading="lazy" />
                  <span className="absolute top-4 left-4 rounded-full bg-lin/90 px-3 py-1 text-xs font-semibold tabular-nums backdrop-blur">
                    {s.num}
                  </span>
                </div>
                <h3 className="font-display mt-6 flex items-center justify-between gap-3 text-[1.45rem] leading-tight">
                  {s.titre}
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-noyer/15 transition-all duration-500 group-hover:border-noyer group-hover:bg-noyer group-hover:text-lin">
                    <Fleche className="size-4" />
                  </span>
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ecorce">{s.texte}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bandeau défilant */}
      <section className="defilant-parent overflow-hidden border-y border-trait py-7 lg:py-9" aria-label="Nos équipements">
        <div className="defilant flex w-max items-center">
          {[0, 1].map((copie) => (
            <div key={copie} className="flex items-center" aria-hidden={copie === 1 ? true : undefined}>
              {motsDefilants.map((m) => (
                <span key={m} className="flex items-center">
                  <span className="font-display px-6 text-3xl font-light whitespace-nowrap lg:px-10 lg:text-5xl">{m}</span>
                  <Power className="size-5 text-chene lg:size-6" strokeWidth={2.5} aria-hidden="true" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Méthode */}
      <section className="conteneur py-24 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="surtitre" data-reveal>
              Méthode
            </p>
            <h2 className="titre-l mt-6" data-reveal style={delai(80)}>
              De l&apos;idée <em>à la première partie</em>
            </h2>
            <p className="texte-courant mt-6 max-w-sm" data-reveal style={delai(140)}>
              Un seul interlocuteur du début à la fin. Nous ne vendons pas un carton à monter : nous regardons votre
              espace, dessinons l&apos;équipement avec vous et l&apos;installons.
            </p>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-2xl bg-trait sm:grid-cols-2 lg:col-span-8">
            {etapes.map((e, i) => (
              <li key={e.num} className="bg-lin p-7 lg:p-10" data-reveal style={delai(i * 90)}>
                <span className="font-display text-5xl font-light text-chene lg:text-6xl">{e.num}</span>
                <h3 className="font-display mt-8 text-2xl">{e.titre}</h3>
                <p className="mt-3 leading-relaxed text-ecorce">{e.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Sélection de réalisations */}
      <section className="bg-sable py-24 lg:py-32">
        <div className="conteneur">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="surtitre" data-reveal>
                Réalisations
              </p>
              <h2 className="titre-l mt-6" data-reveal style={delai(80)}>
                Chaque projet est <em>unique</em>
              </h2>
            </div>
            <Link href="/realisations/" className="btn btn-plein self-start md:self-auto" data-reveal style={delai(120)}>
              Voir les {realisationPhotos.length} photos <Fleche />
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {selection.map((colonne, c) => (
              <div key={c} className={`flex flex-col gap-3 sm:gap-5 ${c === 1 ? 'lg:mt-24' : ''} ${c === 2 ? 'hidden lg:flex' : ''}`}>
                {colonne.map((p, i) => (
                  <Link key={p.src} href="/realisations/" className="group block" data-reveal="image" style={delai((c + i) * 100)}>
                    <div className={`cadre-image ${i === 0 ? 'aspect-[4/5]' : 'aspect-square'}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.src} alt={p.legende} loading="lazy" />
                    </div>
                    <p className="mt-3 text-xs font-semibold tracking-[0.18em] text-chene-fonce uppercase">{p.categorie}</p>
                    <p className="mt-1 text-[0.95rem] text-ecorce">{p.legende}</p>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement */}
      <section className="conteneur py-24 text-center lg:py-36">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full border border-chene/50 text-chene-fonce">
          <Power className="size-5" strokeWidth={2.5} aria-hidden="true" />
        </span>
        <blockquote
          className="font-display mx-auto mt-10 max-w-4xl text-[1.9rem] leading-[1.2] font-light tracking-[-0.02em] sm:text-5xl"
          data-reveal
        >
          On ne vend pas des machines. On crée des endroits où <em className="text-chene-fonce">les gens se croisent</em>.
        </blockquote>
        <p className="mt-8 text-sm font-semibold tracking-[0.2em] text-ecorce uppercase" data-reveal style={delai(120)}>
          {site.name}, {site.tagline.toLowerCase()}
        </p>
      </section>
    </>
  )
}
