import Link from 'next/link'
import { Check } from 'lucide-react'
import { audiences, formatPrice, modelsFor, univers, type Audience } from '@/data/catalogue'
import type { AudiencePage } from '@/data/audiencePages'
import { productImage } from '@/data/images'
import { espaces } from '@/lib/espace'
import { asset } from '@/lib/site'
import { PhotoWall, PlateauHero, type PlateauShot } from './PlateauHero'
import { PlateauTint } from './PlateauTint'
import { CatalogueGrid } from './PlateauHome'
import { FaqCta, priceFrom, ReviewsBand, SectionTitle, situation, situationAlt, StatsBand } from './sections'

/**
 * Mur de photos de chaque espace : installations clients (public/img/realisations/),
 * photos en situation et ambiances, choisies pour ce public.
 */
const wall: Record<Audience, [file: string, name: string, href: string, alt: string][]> = {
  'bar-commerce': [
    ['situations/bar', 'Bar & commerce', '/produits/', 'Pub équipé de jeux, un soir de semaine'],
    ['realisations/r140', "Borne d'arcade", '/produits/borne-arcade/', "Deux clients sur la borne d'un pub de nuit à Lyon"],
    ['realisations/r126', 'Billard', '/produits/billard/', 'Partie de billard dans un bar à Marseille'],
    ['realisations/r149', 'Fléchettes', '/produits/flechettes/', 'Partie de fléchettes électroniques dans un bar'],
    ['situations/flechettes', 'Fléchettes', '/produits/flechettes/', 'Clients autour d’une borne de fléchettes'],
    ['realisations/r157', "Borne d'arcade", '/produits/borne-arcade/', "Borne d'arcade aux couleurs d'un café lyonnais"],
    ['realisations/r36', 'Baby-foot', '/produits/baby-foot/', 'Baby-foot et borne dans un bar aux murs de briques'],
    ['ambiance/1', "Borne d'arcade", '/produits/borne-arcade/', "Borne d'arcade à l'enseigne d'un pub"],
    ['realisations/r125', 'Billard', '/produits/billard/', "Billard à monnayeur dans un bar"],
    ['realisations/r40', "Borne d'arcade", '/produits/borne-arcade/', "Borne d'arcade aux couleurs d'un camping"],
    ['hero/flipper-numerique', 'Flipper numérique', '/produits/flipper-numerique/', 'Plateau de flipper illuminé'],
    ['realisations/r67', 'Fléchettes', '/produits/flechettes/', 'Borne de fléchettes personnalisée pour un complexe de loisirs'],
  ],
  entreprise: [
    ['situations/entreprise', 'Billard', '/produits/billard/', "Collègues autour d'un billard au bureau"],
    ['ambiance/5', "Borne d'arcade", '/produits/borne-arcade/', "Collègues autour d'une borne d'arcade à la pause"],
    ['situations/fauteuil-massant', 'Fauteuil massant', '/produits/fauteuil-massant/', "Fauteuil massant dans l'espace détente d'une entreprise"],
    ['realisations/r129', 'Billard', '/produits/billard/', "Billard dans l'espace de pause d'une entreprise"],
    ['ambiance/0', 'Salle de pause', '/contact/', 'Salle de pause avec baby-foot, billard, fléchettes et fauteuil massant'],
    ['situations/cocon-de-repos', 'Cocon de repos', '/produits/cocon-de-repos/', 'Cocon de repos dans une salle de récupération'],
    ['realisations/r131', 'Fléchettes', '/produits/flechettes/', "Fléchettes et borne d'arcade dans les bureaux d'une entreprise"],
    ['situations/flipper-numerique', 'Flipper numérique', '/produits/flipper-numerique/', "Flipper numérique dans la cuisine d'un bureau"],
    ['ambiance/6', 'Billard', '/produits/billard/', "Billard dans la salle de pause d'une entreprise"],
    ['situations/billard', 'Billard', '/produits/billard/', 'Partie de billard entre collègues'],
    ['hero/cocon-de-repos', 'Cocon de repos', '/produits/cocon-de-repos/', 'Cocons de repos dans une salle de récupération'],
    ['ambiance/2', 'Espace détente', '/contact/', 'Borne, fléchettes, baby-foot, fauteuil massant et chaise cocon'],
  ],
  particulier: [
    ['situations/maison', "Borne d'arcade", '/produits/borne-arcade/', "Amis réunis dans un salon autour d'une borne d'arcade"],
    ['situations/baby-foot', 'Baby-foot', '/produits/baby-foot/', 'Baby-foot en bois dans une pièce lumineuse'],
    ['realisations/r33', 'Baby-foot', '/produits/baby-foot/', 'Partie de baby-foot en famille sous un préau'],
    ['hero/billard', 'Billard', '/produits/billard/', 'Billard dans une grande pièce lumineuse'],
    ['situations/sur-mesure', 'Salle de jeux', '/contact/', "Salle de jeux complète : baby-foot, borne d'arcade, fléchettes et néons"],
    ['realisations/r58', 'Baby-foot', '/produits/baby-foot/', "Baby-foot d'extérieur sous les arbres"],
    ['situations/borne-arcade', "Borne d'arcade", '/produits/borne-arcade/', "Amis autour d'une borne d'arcade"],
    ['hero/flechettes', 'Fléchettes', '/produits/flechettes/', 'Fléchettes plantées au centre de la cible'],
    ['hero/baby-foot', 'Baby-foot', '/produits/baby-foot/', 'Partie de baby-foot entre amis'],
    ['realisations/r27', "Borne d'arcade", '/produits/borne-arcade/', "Bornes d'arcade R-PRO et R-TWIN"],
    ['hero/flipper-numerique', 'Flipper numérique', '/produits/flipper-numerique/', 'Plateau de flipper illuminé'],
    ['situations/fauteuil-massant', 'Fauteuil massant', '/produits/fauteuil-massant/', 'Fauteuil massant dans un salon'],
  ],
}

const statsIntro: Record<Audience, string> = {
  'bar-commerce': 'Bars, campings, salles de loisirs et restaurants nous confient leurs espaces.',
  entreprise: 'Des entreprises de toutes tailles nous confient leurs salles de pause.',
  particulier: 'Des familles partout en France jouent chez elles sur nos équipements.',
}

/**
 * Accueil d'un espace (bar & commerce, entreprise, particulier) : même gabarit
 * que l'accueil général, avec le titre, les photos, les usages, les modèles et
 * la FAQ de ce public.
 */
export function PlateauEspaceHome({ page }: { page: AudiencePage }) {
  const espace = espaces.find((e) => e.id === page.id)!
  const blurb = audiences.find((a) => a.id === page.id)!.blurb
  const models = modelsFor(page.id)
  const shots: PlateauShot[] = wall[page.id].map(([file, name, href, alt]) => ({
    name,
    href,
    alt,
    image: asset(`/img/${file}.webp`),
  }))
  const families = univers.map((u) => ({
    href: `/produits/${u.slug}/`,
    image: situation(u.slug),
    alt: situationAlt[u.slug] ?? u.name,
    title: u.name,
    text: u.benefits[page.id][0],
    price: priceFrom(u.slug),
  }))

  return (
    <div className="pl-root bg-pl-bg text-pl-ink">
      <div className="pl-dark-zone">
        <PlateauHero eyebrow={`Espace ${espace.label}`} title={page.h1} text={blurb}>
          <PhotoWall shots={shots} />
        </PlateauHero>
        <StatsBand intro={statsIntro[page.id]} />
      </div>

      <div className="pl-light">
        <PlateauTint />
        {/* Ce que RESTART apporte à ce public, et ses formules. */}
        <section className="mx-auto max-w-6xl px-5 py-24 sm:px-6 lg:py-32">
          <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <SectionTitle
              center={false}
              title={page.intro.title}
              text={
                <div className="flex flex-col gap-4">
                  {page.intro.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              }
            />
            <div className="pl-card rounded-2xl p-7">
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-pl-gold">Vos formules</p>
              <ul className="mt-5 flex flex-col gap-3 text-[15px] text-pl-ink/80">
                {page.brief.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <Check className="mt-1 size-4 shrink-0 text-pl-gold" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {page.uses.map((u, i) => (
              <li key={u.title} className="pl-card rounded-2xl p-6">
                <span className="text-[12px] font-semibold tabular-nums text-pl-gold">0{i + 1}</span>
                <h3 className="mt-3 text-[16px] font-semibold">{u.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-pl-ink/55">{u.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Les modèles conseillés pour ce public. */}
        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-6 lg:pb-32">
          <SectionTitle
            title="Notre sélection pour vous"
            text={`${models.length} modèles au prix affiché, livrés montés et installés partout en France.`}
          />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {models.map((m) => {
              const image = productImage(m.slug)
              return (
                <li key={m.sku}>
                  <Link
                    href={`/produits/${m.universSlug}/${m.slug}/`}
                    className="pl-card pl-lift group flex h-full flex-col overflow-hidden rounded-2xl p-2"
                  >
                    <span className="relative flex h-56 items-center justify-center overflow-hidden rounded-xl bg-white">
                      {image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={image}
                          alt={`${m.name}, ${m.universName}`}
                          loading="lazy"
                          className="h-full w-full object-contain p-3 transition duration-500 group-hover:scale-[1.04]"
                        />
                      )}
                      {m.highlight && (
                        <span className="absolute left-3 top-3 rounded-full bg-black px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                          {m.highlight}
                        </span>
                      )}
                    </span>
                    <span className="flex flex-1 flex-col gap-1.5 px-3 pb-3 pt-4">
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="text-[16px] font-semibold">{m.name}</span>
                        <span className="shrink-0 text-[15px] font-semibold text-pl-gold">
                          {m.price != null ? formatPrice(m.price) : 'Sur devis'}
                        </span>
                      </span>
                      <span className="text-[12px] text-pl-ink/40">{m.universName}</span>
                      <span className="text-[13px] leading-relaxed text-pl-ink/55">{m.headline}</span>
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>

        {/* Chaque famille, vue pour ce public. */}
        <section>
          <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-6 lg:pb-32">
            <SectionTitle
              title="Chaque famille, pensée pour vous"
              text="Ce que chaque équipement apporte dans votre contexte. Chaque univers a sa page : modèles, prix et questions fréquentes."
            />
            <CatalogueGrid items={families} />
          </div>
        </section>
      </div>

      <div className="pl-dark-after">
        <ReviewsBand />
        <FaqCta faq={page.faq} title={page.cta.title} text={page.cta.subtitle} />
      </div>
    </div>
  )
}
