import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { allModels, audiences, findUnivers, formatPrice, univers } from '@/data/catalogue'
import { audiencePath } from '@/data/audiencePages'
import { asset } from '@/lib/site'
import { HeroFilm, type FilmShot } from './HeroFilm'
import { CategoryMosaic, type Category } from './CategoryMosaic'
import { HoverList, type HoverItem } from './HoverList'

/*
 * Accueil de la version Showroom. Reprend, section par section, la disposition de
 * poltronesofa.com/fr-FR (relevée le 7 octobre 2026) :
 *   1. film plein écran ;
 *   2. titre centré, gammes en ligne, puis une ligne de chiffres ;
 *   3. mosaïque des gammes, toutes visibles sans défilement, légendes en capitales ;
 *   4. les trois publics (bar et commerce, entreprise, chez moi) en liste, une seule photo qui suit le survol ;
 *   5. « Pourquoi nous choisir » : même liste, côtés inversés (photo à gauche).
 * Le contenu vient du catalogue et des pages existantes : rien n'est inventé.
 */

const img = (p: string) => asset(`/img/${p}.webp`)

const shots: FilmShot[] = [
  { src: img('situations/bar'), alt: "Bar équipé d'un flipper, d'une cible de fléchettes, d'une borne d'arcade, d'un baby-foot et d'un billard" },
  { src: img('situations/entreprise'), alt: '' },
  { src: img('hero/borne-arcade'), alt: '' },
  { src: img('situations/maison'), alt: '' },
]

/** Nombre de modèles et prix d'entrée d'une gamme, tirés du catalogue. */
const meta = (slug: string) => {
  const models = findUnivers(slug)?.models ?? []
  const prices = models.flatMap((m) => (m.price != null ? [m.price] : []))
  if (!models.length) return 'Sur devis'
  const count = `${models.length} modèle${models.length > 1 ? 's' : ''}`
  return `${count} · ${prices.length ? `dès ${formatPrice(Math.min(...prices))}` : 'sur devis'}`
}

/** Légendes au pluriel, comme « Canapés relax », « Canapés d'angle ». La première prend le grand carré, la quatrième la bande large. */
const categories: Category[] = [
  { href: '/produits/borne-arcade/', label: "Bornes d'arcade", meta: meta('borne-arcade'), image: img('situations/borne-arcade'), alt: "Borne d'arcade dans un bar, des amis autour" },
  { href: '/produits/baby-foot/', label: 'Baby-foot', meta: meta('baby-foot'), image: img('situations/baby-foot'), alt: 'Baby-foot en bois dans un salon' },
  { href: '/produits/flechettes/', label: 'Fléchettes', meta: meta('flechettes'), image: img('situations/flechettes'), alt: 'Partie de fléchettes électroniques dans un bar' },
  { href: '/produits/billard/', label: 'Billards', meta: meta('billard'), image: img('situations/billard'), alt: "Partie de billard entre collègues" },
  { href: '/produits/flipper-numerique/', label: 'Flippers numériques', meta: meta('flipper-numerique'), image: img('situations/flipper-numerique'), alt: 'Flipper numérique dans un espace de pause' },
  { href: '/produits/fauteuil-massant/', label: 'Fauteuils massants', meta: meta('fauteuil-massant'), image: img('situations/fauteuil-massant'), alt: "Fauteuil massant dans l'espace détente d'un bureau" },
  { href: '/produits/cocon-de-repos/', label: 'Cocons de repos', meta: meta('cocon-de-repos'), image: img('situations/cocon-de-repos'), alt: 'Cocon de repos dans une salle de récupération' },
  { href: '/contact/', label: 'Sur mesure', meta: 'Devis sous 48 h', image: img('situations/borne-personnalisee'), alt: "Borne d'arcade habillée aux couleurs d'un bar client" },
]

/** Les trois publics, dans l'ordre du menu, chacun avec une photo de son lieu. */
const publicPhotos = {
  'bar-commerce': { src: img('situations/bar'), alt: "Bar équipé d'un flipper, de fléchettes, d'une borne, d'un baby-foot et d'un billard" },
  entreprise: { src: img('situations/flipper-numerique'), alt: "Flipper numérique installé dans la cuisine d'un bureau" },
  particulier: { src: img('situations/maison'), alt: "Salon équipé d'une borne d'arcade" },
}
const publics: HoverItem[] = (['bar-commerce', 'entreprise', 'particulier'] as const).map((id) => ({
  ...audiences.find((a) => a.id === id)!,
  href: audiencePath(id),
  photo: publicPhotos[id],
}))

/** Chiffres sous le titre : ce qui était noyé dans le paragraphe en capitales. */
const figures = [
  { value: String(univers.length), label: "familles d'équipements" },
  { value: String(allModels.length), label: 'modèles au catalogue' },
  { value: '5 000', label: 'jeux sur les bornes pro' },
  { value: '3 ans', label: 'de garantie, au plus' },
]

/** « Pourquoi nous choisir » : les trois temps de la méthode RESTART, chacun avec sa photo. */
const reasons: HoverItem[] = [
  {
    id: 'conseil',
    href: '/qui-sommes-nous/',
    label: 'Conseil',
    short: 'Gratuit et sans engagement',
    blurb: "Un échange de 20 minutes, sur place ou en visio, pour cadrer l'usage, la place et le budget.",
    photo: { src: img('situations/entreprise'), alt: "Collègues autour d'un billard installé par RESTART" },
  },
  {
    id: 'personnalisation',
    href: '/qui-sommes-nous/',
    label: 'Personnalisation',
    short: 'À votre image',
    blurb: 'Covering, couleur des boutons, logo : vous validez un visuel avant toute fabrication.',
    photo: { src: img('hero/baby-foot'), alt: 'Baby-foot en bois gravé au nom du client' },
  },
  {
    id: 'installation',
    href: '/qui-sommes-nous/',
    label: 'Installation',
    short: 'Partout en France',
    blurb: 'Livré monté, mis en service et pris en main sur place. Ni carton à ouvrir ni notice à lire.',
    photo: { src: img('situations/sur-mesure'), alt: 'Salle de jeux équipée et éclairée : baby-foot, cible de fléchettes et borne' },
  },
]

export function ShowroomHome() {
  return (
    <div className="sr-home bg-[#fffdfc] text-[#283444]">
      {/* 1. Film -------------------------------------------------------- */}
      <HeroFilm shots={shots} />

      {/* 2. Titre et engagement ---------------------------------------- */}
      <section className="mx-auto max-w-[1440px] px-4 pb-14 pt-16 sm:px-8 md:pb-20 md:pt-24 lg:px-16 lg:pt-28">
        <div className="flex flex-col items-center text-center">
          <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#283444]/50">
            Créateur de bien-être en entreprise
          </p>
          <h1 className="sr-display mt-7 text-[40px] leading-[1.05] sm:text-[62px] lg:text-[84px]">
            Transformez vos espaces
            <br />
            avec RESTART<span className="text-[#c4262e]">.</span>
          </h1>
          {/* Les gammes en ligne, séparées d'un trait ; chacune mène à sa page. Sous 1280 px la
              liste revient à la ligne : les traits disparaissent pour ne pas ouvrir une ligne. */}
          <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] font-semibold uppercase tracking-[0.07em] text-[#283444]/75 md:text-[13px] xl:flex-nowrap xl:gap-x-0">
            {categories.slice(0, -1).map((c, i) => (
              <li key={c.href} className="flex items-center whitespace-nowrap">
                {i > 0 && <span aria-hidden="true" className="mx-4 hidden h-4 w-px bg-[#283444]/25 xl:block" />}
                <Link href={c.href} className="transition hover:text-[#c4262e]">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-9">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              <Link
                href="/contact/"
                className="inline-flex h-12 items-center justify-center bg-[#283444] px-7 text-[12px] font-bold uppercase tracking-[0.02em] text-white transition hover:brightness-125"
              >
                Demander un devis
              </Link>
              <Link
                href="/produits/"
                className="group inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.06em] text-[#283444]"
              >
                Voir le catalogue
                <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        <ul className="mt-14 grid grid-cols-2 border-t border-[#283444]/15 md:mt-20 lg:grid-cols-4">
          {figures.map((f, i) => (
            <li
              key={f.label}
              className={`pt-6 md:pt-8 ${i % 2 ? 'pl-5 md:pl-8' : 'pr-5'} ${i > 1 ? 'mt-6 lg:mt-0' : ''} ${
                i > 0 ? 'lg:border-l lg:border-[#283444]/15 lg:pl-8' : ''
              } ${i % 2 ? 'border-l border-[#283444]/15' : ''}`}
            >
              <span className="sr-display block text-[36px] leading-none md:text-[48px]">{f.value}</span>
              <span className="mt-2 block text-[12px] font-semibold uppercase tracking-[0.08em] text-[#283444]/60 md:text-[13px]">
                {f.label}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Gammes ------------------------------------------------------ */}
      <section aria-labelledby="sr-gammes" className="mx-auto max-w-[1440px] px-4 pb-12 sm:px-8 md:pb-14 lg:px-16">
        <div className="mb-8 flex items-end justify-between gap-6 md:mb-10">
          <h2 id="sr-gammes" className="sr-display text-[36px] leading-none md:text-[48px]">
            Nos gammes
          </h2>
          <Link
            href="/produits/"
            className="group hidden items-center gap-2 text-[12px] font-bold uppercase tracking-[0.06em] text-[#283444] sm:inline-flex"
          >
            Tout le catalogue
            <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
        <CategoryMosaic items={categories} />
      </section>

      {/* 4. Publics : bar et commerce, entreprise, chez moi -------------- */}
      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-8 md:py-24 lg:px-16">
        <HoverList
          items={publics}
          header={
            <>
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#283444]/50">Pour chaque lieu</p>
              <h2 className="sr-display mt-5 text-[36px] leading-none md:text-[48px]">Où allez-vous jouer ?</h2>
            </>
          }
        />
      </section>

      {/* 5. Pourquoi nous choisir --------------------------------------- */}
      {/* Miroir de « Où allez-vous jouer ? » : photo à gauche, titre et liste à droite. */}
      <section className="mx-auto max-w-[1440px] px-4 pb-20 pt-8 sm:px-8 md:pb-28 md:pt-12 lg:px-16">
        <HoverList
          items={reasons}
          reverse
          header={
            <>
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#283444]/50">Notre méthode</p>
              <h2 className="sr-display mt-5 text-[36px] leading-none md:text-[48px]">Pourquoi nous choisir ?</h2>
              <p className="mt-5 max-w-[480px] text-[16px] leading-relaxed text-[#283444]/70">
                Nous ne vendons pas un carton à monter : nous regardons votre espace, dessinons l&apos;équipement avec
                vous et l&apos;installons.
              </p>
            </>
          }
        />
      </section>
    </div>
  )
}
