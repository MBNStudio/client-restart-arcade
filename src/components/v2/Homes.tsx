import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { univers } from '@/data/catalogue'
import { espacesV2, espaceV2, produitsHref, type Offer, type ValueBlock } from '@/data/v2/espaces'
import type { Audience } from '@/data/catalogue'
import { asset } from '@/lib/site'
import { Chapters } from './Chapters'
import { FaqShowroom } from './FaqShowroom'
import { HeroVideo } from './HeroVideo'
import { InteractiveRoom } from './InteractiveRoom'
import { ChooseEspaceButton } from './ChooseEspaceButton'
import { FaqJsonLd, GammeMosaic, Marquee, OfferCards, Projects, Reviews, SectionHead, delai } from './sections'

const scene = (id: string) => asset(`/img/v2/scenes/${id}.webp`)

/** Valeur ajoutée de RESTART, pour le site général (mail du 5 novembre : personnalisation, location/achat, livraison). */
const generalValues: ValueBlock[] = [
  {
    label: 'Personnalisation',
    short: 'À votre image',
    title: 'Chaque jeu raconte un peu de vous',
    text: 'Covering, couleur des boutons, T-Molding, logo ou charte graphique : vous validez un visuel avant toute fabrication. Pour une enseigne, une entreprise ou un salon.',
    points: ['Vos couleurs, votre logo, votre identité', 'Covering PVC sur bornes et fléchettes', 'Baby-foot en 6 à 8 couleurs'],
    image: asset('/img/hero/baby-foot.webp'),
    alt: 'Baby-foot de toutes les couleurs, en pleine partie',
    caption: 'Un visuel validé avant fabrication',
  },
  {
    label: 'Location ou achat',
    short: 'La formule qui vous va',
    title: "À l'achat ou en location longue durée",
    text: "Les particuliers achètent, en payant en 2, 3 ou 4 fois. Les professionnels choisissent : la location inclut livraison, installation et maintenance, sans immobiliser de trésorerie.",
    points: ['Location longue durée pour les professionnels', 'Paiement en 2x, 3x ou 4x pour les particuliers', 'Monnayeur en option pour les lieux publics'],
    image: scene('bar-commerce-2'),
    alt: 'Quatre amis penchés sur un baby-foot en bois pendant une partie animée, dans un bar-restaurant le soir',
    caption: 'Un baby-foot en location dans un bar-restaurant',
  },
  {
    label: 'Livraison',
    short: 'Partout en France',
    title: 'Livré monté, installé, prêt à jouer',
    text: "Assemblés et testés dans notre atelier de Villette-d'Anthon, en Isère, nos équipements sont livrés partout en France, Corse comprise, puis installés et pris en main sur place.",
    points: ['Livraison et installation partout en France', 'Devis sous 48 heures', "Jusqu'à 3 ans de garantie"],
    image: asset('/img/ambiance/2.webp'),
    alt: "Le showroom RESTART : borne d'arcade, cible de fléchettes, baby-foot, fauteuil massant et cocon de repos",
    caption: "Notre atelier et showroom, à Villette-d'Anthon (38)",
  },
]

/** Les trois cibles, en cartes à contour (version Plateau) : une phrase, puis l'essentiel en puces. */
const targetSummary: Record<Audience, { text: string; points: string[] }> = {
  'bar-commerce': {
    text: 'Pour les lieux qui reçoivent du public.',
    points: [
      'Bars, restaurants, campings, complexes sportifs',
      'Bornes, fléchettes, baby-foot, billards, flippers',
      'Achat ou location longue durée',
      'Monnayeur en option',
      'À votre enseigne : covering et logo',
      'Livraison et installation partout en France',
    ],
  },
  entreprise: {
    text: 'Pour vos salariés et vos visiteurs.',
    points: [
      "Salles de pause, CSE, espaces d'accueil",
      'Bornes, baby-foot, billards, fléchettes',
      'Fauteuils massants et cocons de repos',
      'Achat ou location, maintenance incluse',
      'À vos couleurs : logo et charte graphique',
      'Devis gratuit sous 48 heures',
    ],
  },
  particulier: {
    text: 'Pour jouer chez vous.',
    points: [
      'Salon, salle de jeux, garage, jardin',
      "Bornes d'arcade dès 899 €",
      'Baby-foot, fléchettes, fauteuils massants',
      'Prix affichés, paiement en 2x, 3x ou 4x',
      'Livré monté et installé',
      'Personnalisé à votre goût',
    ],
  },
}

const targetCards: Offer[] = espacesV2.map((e) => ({
  tag: e.label,
  title: e.line,
  ...targetSummary[e.id],
  image: e.video.fallback,
  alt: e.video.alt,
  href: e.path,
  cta: e.kind === 'boutique' ? 'Voir la boutique' : `Entrer dans l'espace ${e.label.toLowerCase()}`,
}))

const generalFaq = [
  {
    q: 'RESTART vend ou loue ses équipements ?',
    a: "Les deux. La vente concerne surtout les particuliers et les entreprises qui préfèrent investir. La location, réservée aux professionnels, inclut la livraison, l'installation et la maintenance, sans immobiliser de trésorerie. C'est la formule la plus fréquente en bar et en commerce.",
  },
  {
    q: 'Où RESTART livre-t-il ?',
    a: "Partout en France métropolitaine, Corse comprise. Notre atelier est situé à Villette-d'Anthon (38280), dans l'est lyonnais, ce qui nous permet d'intervenir rapidement sur Lyon, Villeurbanne, Bourgoin-Jallieu, Grenoble et Saint-Étienne.",
  },
  {
    q: 'Peut-on personnaliser un équipement ?',
    a: 'Oui. Le covering PVC, la couleur des boutons et le T-Molding sont personnalisables sur les bornes R-TWIN, R-EVOLUTION, R-PRO et R-DART PRO. Les baby-foot sont disponibles en 6 à 8 couleurs. Un visuel vous est soumis pour validation avant fabrication.',
  },
  {
    q: "Quel est le délai entre la commande et l'installation ?",
    a: 'Le devis est établi sous 48 heures. Pour un modèle standard, comptez ensuite deux à trois semaines. Pour un équipement entièrement personnalisé, le délai dépend de la validation du visuel et de la fabrication du covering.',
  },
  {
    q: 'Le paiement en plusieurs fois est-il possible ?',
    a: 'Oui, le paiement en 2, 3 ou 4 fois est disponible sur les achats en ligne. Pour les professionnels, la facturation et la location suivent les conditions précisées au devis.',
  },
]

const generalProjects = [
  { src: asset('/img/carrousel/reel-lyon.webp'), tag: "Borne d'arcade", caption: 'Borne noir et or dans un café à Lyon (69)' },
  { src: asset('/img/carrousel/reel-bourg.webp'), tag: 'Borne & baby-foot', caption: 'Borne personnalisée et baby-foot chez un barbier à Bourg-lès-Valence (26)' },
  { src: asset('/img/carrousel/reel-marseille.webp'), tag: 'Billard', caption: "Partie de billard dans le salon d'un hôtel à Marseille (13)" },
  { src: asset('/img/carrousel/reel-castres.webp'), tag: 'Fléchettes', caption: 'Partie de fléchettes électroniques dans un café à Castres (81)' },
  { src: asset('/img/realisations/r140.webp'), tag: "Borne d'arcade", caption: 'Partie à deux dans un pub de nuit à Lyon (69)' },
  { src: asset('/img/realisations/r33.webp'), tag: 'Baby-foot', caption: "Baby-foot d'extérieur à Saint-Cirgue (81)" },
]

/**
 * Site général, en une seule page : les trois cibles réunies. C'est là qu'on arrive
 * quand on ferme la pop-up ; tout lien vers un produit la fait réapparaître.
 * Ordre : vidéo (Atelier + Halo), bandeau (Atelier), cibles (Plateau), valeur
 * ajoutée au défilement (Panorama), pièce interactive (Panorama), grille des gammes
 * (Showroom), projets (Atelier), avis (Plateau), FAQ (Showroom).
 */
export function GeneralHome() {
  return (
    <>
      <h1 className="sr-only">Transformez vos espaces avec RESTART</h1>
      <HeroVideo
        as="p"
        video={{
          src: asset('/video/v2/hero-general.mp4'),
          poster: asset('/video/v2/hero-general.jpg'),
          fallback: asset('/img/situations/bar.webp'),
          alt: "Montage : des clients, des collègues et une famille jouent au baby-foot, au billard, aux fléchettes et sur une borne d'arcade",
        }}
        eyebrow="Créateur de bien-être · Près de Lyon"
        lines={['Transformez', 'vos espaces', 'avec RESTART.']}
        accent="espaces"
        text="Bornes d'arcade, fléchettes électroniques, baby-foot, billards et flippers numériques, personnalisés à votre image pour les bars, les entreprises et les particuliers."
        marks={[
          ['Bars, entreprises & particuliers', 'Vente et location'],
          ['Conseil, personnalisation, installation', 'Un seul interlocuteur'],
          ['Partout en France', 'Atelier et showroom près de Lyon'],
        ]}
        actions={
          <>
            <ChooseEspaceButton className="v-btn v-btn--light">
              Choisir mon espace <ArrowRight aria-hidden="true" />
            </ChooseEspaceButton>
            <Link href="/contact/" className="v-btn v-btn--line hidden text-white sm:inline-flex">
              Demander un devis
            </Link>
          </>
        }
      />

      <Marquee
        words={["Bornes d'arcade", 'Fléchettes électroniques', 'Baby-foot', 'Billards', 'Flippers numériques', 'Fauteuils massants', 'Cocons de repos', 'Covering à vos couleurs', 'Vente & location']}
      />

      <section className="py-24 lg:py-32">
        <div className="v-wrap">
          <SectionHead
            eyebrow="Trois espaces"
            title={
              <>
                Un bar, une entreprise, une maison : <em>votre espace</em>
              </>
            }
            text="Chacun a son site : les équipements qui marchent chez vous, vos formules, vos questions."
          />
          <div className="mt-14">
            <OfferCards offers={targetCards} />
          </div>
        </div>
      </section>

      <Chapters blocks={generalValues} />

      <InteractiveRoom />

      <section className="py-24 lg:py-32">
        <div className="v-wrap">
          <SectionHead
            eyebrow="Notre gamme"
            title={
              <>
                Tout ce qui fait <em>jouer</em>
              </>
            }
            text="Sept familles d'équipements, livrés montés et installés. Choisissez une gamme : on vous montre les modèles de votre espace."
          />
          <div className="mt-14">
            <GammeMosaic univers={univers.map((u) => u.slug)} />
          </div>
        </div>
      </section>

      <Projects items={generalProjects} />

      <Reviews />

      <section className="py-24 lg:py-32">
        <div className="v-wrap">
          <FaqJsonLd items={generalFaq} />
          <FaqShowroom
            title={
              <>
                Vos <em>questions</em>
              </>
            }
            items={generalFaq}
            photos={[
              { src: scene('bar-commerce-1'), alt: '' },
              { src: scene('particulier-4'), alt: '' },
              { src: scene('entreprise-2'), alt: '' },
              { src: scene('entreprise-1'), alt: '' },
              { src: scene('particulier-2'), alt: '' },
            ]}
          />
        </div>
      </section>
    </>
  )
}

/** Photos générées de chaque espace (public/img/v2/scenes/), avec leur description. */
const espaceScenes: Record<Audience, { src: string; alt: string }[]> = {
  'bar-commerce': [
    { src: scene('bar-commerce-1'), alt: "Dans un pub aux murs de briques, un homme lève les bras de joie devant une borne d'arcade ; à côté, des amis rient près d'une borne de fléchettes et autour d'un baby-foot" },
    { src: scene('bar-commerce-2'), alt: 'Quatre amis penchés sur un baby-foot en bois clair pendant une partie animée, dans un bar-restaurant le soir' },
    { src: scene('bar-commerce-3'), alt: 'Une jeune femme lance une fléchette vers une borne de fléchettes électroniques, encouragée par deux amis' },
    { src: scene('bar-commerce-4'), alt: "Sur la terrasse couverte d'un camping au crépuscule, un vacancier joue au billard sous des guirlandes lumineuses" },
  ],
  entreprise: [
    { src: scene('entreprise-1'), alt: "Dans une salle de pause lumineuse, des collègues jouent au baby-foot pendant qu'un autre joue sur une borne d'arcade" },
    { src: scene('entreprise-2'), alt: "Deux collègues jouent côte à côte sur une borne d'arcade, deux autres les regardent, une tasse de café à la main" },
    { src: scene('entreprise-3'), alt: "Dans un espace détente aux grandes baies vitrées, une femme vise au billard sous les applaudissements de deux collègues" },
    { src: scene('entreprise-4'), alt: 'Dans un coin bien-être, une salariée se détend dans un fauteuil massant ; une collègue se repose dans un cocon de repos' },
  ],
  particulier: [
    { src: scene('particulier-1'), alt: "Dans un garage aménagé en salle de jeux, une famille encourage un adolescent qui joue sur une borne d'arcade" },
    { src: scene('particulier-2'), alt: 'Dans un salon le soir, une petite fille lève le poing après un but au baby-foot face à son père' },
    { src: scene('particulier-3'), alt: "Deux enfants jouent sur une borne d'arcade dans un salon, le visage éclairé par l'écran" },
    { src: scene('particulier-4'), alt: 'Le soir dans un salon ouvert, des amis rient autour d’un billard en bois' },
  ],
}

/**
 * Accueil d'un espace : même construction que le site général, avec le contenu,
 * les photos, la vidéo et les produits de ce public. Pour les particuliers (site
 * e-commerce), les cartes à contour deviennent des offres, prix et achat en avant.
 */
export function EspaceHome({ id }: { id: Audience }) {
  const e = espaceV2(id)
  const scenes = espaceScenes[id]
  // La valeur ajoutée prend les photos générées de l'espace quand elles collent au propos.
  const values = e.values.map((v, i) => ({
    ...v,
    ...(i === 1 && { image: scenes[1].src, alt: scenes[1].alt }),
    cta: i === 0 ? { href: e.nav[0].href, label: e.nav[0].label } : i === 1 ? { href: produitsHref(id), label: 'Voir les produits' } : null,
  }))

  return (
    <>
      <HeroVideo
        video={e.video}
        eyebrow={e.hero.eyebrow}
        lines={e.hero.lines}
        accent={e.hero.accent}
        text={e.hero.text}
        marks={e.hero.marks}
        actions={
          <>
            <Link href={produitsHref(id)} className="v-btn v-btn--light">
              {e.kind === 'boutique' ? 'Voir les produits et les prix' : 'Voir les produits'} <ArrowRight aria-hidden="true" />
            </Link>
            <Link href="/contact/" className="v-btn v-btn--line hidden text-white sm:inline-flex">
              {e.kind === 'boutique' ? 'Nous contacter' : 'Demander un devis'}
            </Link>
          </>
        }
      />

      <Marquee words={e.marquee} label={`RESTART pour les ${e.label.toLowerCase()}`} />

      <section className="py-24 lg:py-32">
        <div className="v-wrap">
          <SectionHead
            eyebrow={e.kind === 'boutique' ? 'Nos offres' : 'Nos formules'}
            title={e.offersTitle}
            text={e.offersText}
          />
          <div className="mt-14">
            <OfferCards offers={e.offers} />
          </div>
        </div>
      </section>

      <Chapters blocks={values} />

      <section className="py-24 lg:py-32">
        <div className="v-wrap">
          <SectionHead
            eyebrow={`${e.univers.length} gammes`}
            title={
              e.id === 'particulier' ? (
                <>
                  Pour jouer <em>à la maison</em>
                </>
              ) : (
                <>
                  Tout ce qui fait <em>jouer</em>
                </>
              )
            }
            action={
              <Link href={produitsHref(id)} className="v-btn v-btn--line">
                Tout le catalogue <ArrowRight aria-hidden="true" />
              </Link>
            }
          />
          <div className="mt-14">
            <GammeMosaic univers={e.univers} espace={id} />
          </div>
        </div>
      </section>

      <InteractiveRoom espace={id} univers={e.univers} />

      <Projects items={e.projects} />

      <Reviews />

      <section className="py-24 lg:py-32">
        <div className="v-wrap">
          <FaqJsonLd items={e.faq} />
          <FaqShowroom
            title={
              <>
                Vos <em>questions</em>
              </>
            }
            items={e.faq}
            photos={[...scenes, ...e.faqPhotos].map((p) => ({ src: p.src, alt: '' }))}
            aside={
              <p className="mt-8 text-[15px] text-v-soft" data-reveal style={delai(100)}>
                Une autre question ?{' '}
                <Link href="/contact/" className="v-link font-semibold text-v-ink">
                  Écrivez-nous
                </Link>{' '}
                : réponse sous 48 heures.
              </p>
            }
          />
        </div>
      </section>
    </>
  )
}
