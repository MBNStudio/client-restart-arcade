import Link from 'next/link'
import { ArrowRight, Check, ChevronRight } from 'lucide-react'
import { univers } from '@/data/catalogue'
import { audiencePath } from '@/data/audiencePages'
import { espaces, espacePaths } from '@/lib/espace'
import { asset } from '@/lib/site'
import { PhotoWall, PlateauHero, type PlateauShot } from './PlateauHero'
import { PlateauTint } from './PlateauTint'
import { EspaceLink } from './EspaceLink'
import { FaqCta, formulas, priceFrom, ReviewsBand, SectionTitle, situation, situationAlt, StatsBand } from './sections'

/** Accueil général : le mur de photos, les trois espaces, tout le catalogue. */
export function PlateauHome({ faq }: { faq: { q: string; a: string }[] }) {
  // Mur de photos du héros : gammes (public/img/hero/) et lieux (public/img/situations/), réparties
  // une sur quatre dans chaque colonne.
  const shot = (dir: string, file: string, name: string, href: string, alt: string): PlateauShot => ({
    name,
    image: asset(`/img/${dir}/${file}.webp`),
    alt,
    href,
  })
  const heroShots: PlateauShot[] = [
    shot('hero', 'borne-arcade', "Bornes d'arcade", '/produits/borne-arcade/', "Rangée de bornes d'arcade éclairées en bleu"),
    shot('hero', 'billard', 'Billard', '/produits/billard/', 'Billard dans une grande pièce lumineuse'),
    shot('hero', 'flipper-numerique', 'Flipper numérique', '/produits/flipper-numerique/', 'Plateau de flipper illuminé'),
    shot('situations', 'bar', 'Bar & commerce', audiencePath('bar-commerce'), 'Bar équipé de jeux, un soir de semaine'),
    shot('hero', 'baby-foot', 'Baby-foot', '/produits/baby-foot/', 'Baby-foot colorés dans une salle lumineuse'),
    shot('situations', 'maison', 'Particulier', audiencePath('particulier'), "Salon avec une borne d'arcade"),
    shot('hero', 'flechettes', 'Fléchettes', '/produits/flechettes/', 'Fléchettes plantées au centre de la cible'),
    shot('hero', 'fauteuil-massant', 'Fauteuil massant', '/produits/fauteuil-massant/', 'Fauteuil massant dans un salon de détente'),
    shot('situations', 'entreprise', 'Entreprise', audiencePath('entreprise'), "Collègues autour d'un billard au bureau"),
    shot('situations', 'borne-arcade', "Bornes d'arcade", '/produits/borne-arcade/', "Amis autour d'une borne d'arcade"),
    shot('situations', 'cocon-de-repos', 'Cocon de repos', '/produits/cocon-de-repos/', 'Cocon de repos dans une salle de détente'),
    shot('situations', 'billard', 'Billard', '/produits/billard/', "Partie de billard entre collègues"),
  ]

  const grid = univers.map((u) => ({
    href: `/produits/${u.slug}/`,
    image: situation(u.slug),
    alt: situationAlt[u.slug] ?? u.name,
    title: u.name,
    text: u.intro.split('. ')[0].replace(/\.$/, '') + '.',
    price: priceFrom(u.slug),
  }))

  return (
    <div className="pl-root bg-pl-bg text-pl-ink">
      <div className="pl-dark-zone">
        <PlateauHero>
          <PhotoWall shots={heroShots} />
        </PlateauHero>
        <StatsBand intro="Entreprises, bars et particuliers nous confient leurs espaces." />
      </div>

      <div className="pl-light">
        <PlateauTint />
        {/* Les trois espaces, chacun avec son accueil. */}
        <section className="mx-auto max-w-6xl px-5 py-24 sm:px-6 lg:py-32">
          <SectionTitle
            title="Choisissez votre espace"
            text="Un bar, une entreprise ou une maison n'ont pas les mêmes besoins. Chaque espace a son accueil : les équipements qui marchent chez vous, vos formules, vos questions."
          />
          <ul className="mt-14 grid gap-5 lg:grid-cols-3">
            {espaces.map((e) => (
              <li key={e.id} className="pl-card pl-lift group relative flex flex-col overflow-hidden rounded-2xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={e.photo}
                    alt={e.alt}
                    loading="lazy"
                    className="size-full object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-[12px] font-semibold text-white backdrop-blur">
                    {e.label}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-pl-ink">
                    {/* Lien étiré : toute la carte mène à l'accueil de l'espace. */}
                    <EspaceLink
                      espace={e.id}
                      from="home_espaces"
                      href={espacePaths[e.id]}
                      className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                    >
                      {e.line}
                    </EspaceLink>
                  </h3>
                  <ul className="mt-5 flex flex-col gap-2 text-[13px] text-pl-ink/65">
                    {formulas[e.id].map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <Check className="mt-0.5 size-3.5 shrink-0 text-pl-gold" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <span
                    aria-hidden="true"
                    className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-pl-ink"
                  >
                    Entrer dans l&apos;espace {e.label}
                    <ArrowRight className="size-3.5 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact/"
              className="pl-btn-secondary inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold"
            >
              Décrire mon espace
            </Link>
            <Link
              href="/realisations/"
              className="inline-flex h-10 items-center gap-1.5 px-2 text-sm font-semibold text-pl-ink/70 transition hover:text-pl-ink"
            >
              Voir des réalisations
              <ChevronRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* Catalogue : la grille « Reach humans, not spam folders » de Resend. */}
        <section>
          <div className="mx-auto max-w-6xl px-5 pb-24 pt-8 sm:px-6 lg:pb-32">
            <SectionTitle
              title="Tout ce qui fait jouer"
              text="Sept familles d'équipements, livrés montés et installés. Chaque univers a sa page : modèles, prix, avantages selon votre situation."
            />
            <CatalogueGrid items={grid} />
          </div>
        </section>
      </div>

      <div className="pl-dark-after">
        <ReviewsBand />
        <FaqCta faq={faq} />
      </div>
    </div>
  )
}

/** Grille des sept familles, plus une carte « Projet sur mesure ». */
export function CatalogueGrid({
  items,
}: {
  items: { href: string; image: string; alt: string; title: string; text: string; price: string }[]
}) {
  return (
    <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ href, image, alt, title, text, price }) => (
        <li key={title}>
          <Link href={href} className="pl-card pl-lift group flex h-full flex-col overflow-hidden rounded-2xl">
            <span className="relative block aspect-[4/3] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={alt}
                loading="lazy"
                className="size-full object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
              />
            </span>
            <span className="flex flex-1 flex-col gap-1.5 p-5">
              <span className="text-[15px] font-semibold">{title}</span>
              <span className="text-[13px] leading-relaxed text-pl-ink/50">{text}</span>
              <span className="mt-auto inline-flex items-center gap-1 pt-2 text-[13px] text-pl-gold">
                {price}
                <ArrowRight
                  className="size-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </span>
            </span>
          </Link>
        </li>
      ))}
      <li>
        <Link
          href="/contact/"
          className="pl-lift group relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-2xl"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={situation('sur-mesure')}
            alt="Salle de jeux complète : baby-foot, borne d'arcade, fléchettes et néons"
            loading="lazy"
            className="absolute inset-0 size-full object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <span className="relative flex flex-col gap-1.5 p-5 text-white">
            <span className="text-[15px] font-semibold">Projet sur mesure</span>
            <span className="text-[13px] leading-relaxed text-white/70">
              Un espace entier à équiper ? On compose l&apos;ensemble avec vous.
            </span>
            <span className="mt-1 inline-flex items-center gap-1 text-[13px] text-[#f6e3be]">
              devis sous 48 h
              <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </span>
        </Link>
      </li>
    </ul>
  )
}
