import { audiencePage, audiencePath } from '@/data/audiencePages'
import { findUnivers, type Audience } from '@/data/catalogue'
import { asset } from '@/lib/site'

/**
 * Les trois sites de la V2 (mail de RESTART du 5 novembre 2026) : un site par
 * public, chacun avec son menu, son contenu, ses photos et ses pages produits,
 * plus un site général en une page. Les textes viennent des pages du site actuel
 * (knowledge/content/pages/) et du catalogue : rien n'est inventé.
 */

export type NavItem = { label: string; href: string }
export type ValueBlock = { label: string; short: string; title: string; text: string; points: string[]; image: string; alt: string; caption: string }
export type Offer = { tag: string; title: string; text: string; points: string[]; image: string; alt: string; href: string; cta: string }

export type Espace = {
  id: Audience
  /** Chemin de l'accueil de l'espace, avec barres : /bars-commerces/. */
  path: string
  label: string
  /** Libellé court du sélecteur d'espace. */
  short: string
  /** Pour la pop-up et les cartes : une phrase. */
  line: string
  /** Type de site : vitrine ou e-commerce. */
  kind: 'vitrine' | 'boutique'
  video: { src: string; poster: string; fallback: string; alt: string }
  hero: { eyebrow: string; lines: [string, string, string]; accent: string; text: string; marks: [string, string][] }
  marquee: string[]
  /** Univers vendus à ce public, dans l'ordre du menu du site actuel. */
  univers: string[]
  nav: NavItem[]
  values: ValueBlock[]
  offersTitle: string
  offersText: string
  offers: Offer[]
  projects: { src: string; tag: string; caption: string }[]
  faq: { q: string; a: string }[]
  faqPhotos: { src: string; alt: string }[]
  concept: { title: string; accent: string; intro: string[]; blocks: ValueBlock[] }
}

const img = (p: string) => asset(`/img/${p}.webp`)
const video = (id: string) => ({
  src: asset(`/video/v2/hero-${id}.mp4`),
  poster: asset(`/video/v2/hero-${id}.jpg`),
})

/** Adresse d'une page d'un espace : `espaceHref('particulier', 'produits/baby-foot/')`. */
export const espaceHref = (id: Audience, rest = '') => `${audiencePath(id)}${rest}`
export const produitsHref = (id: Audience, univers?: string, modele?: string) =>
  espaceHref(id, `produits/${univers ? `${univers}/` : ''}${modele ? `${modele}/` : ''}`)

/** Blocs « valeur ajoutée » communs : personnalisation, location ou achat, livraison partout en France. */
const personnalisation = (text: string, points: string[]): ValueBlock => ({
  label: 'Personnalisation',
  short: 'À votre image',
  title: 'Chaque jeu raconte un peu de vous',
  text,
  points,
  image: img('hero/baby-foot'),
  alt: 'Baby-foot de toutes les couleurs, en pleine partie',
  caption: 'Covering, couleurs, logo : un visuel validé avant fabrication',
})

const livraison: ValueBlock = {
  label: 'Livraison',
  short: 'Partout en France',
  title: 'Livré monté, installé, prêt à jouer',
  text: "Nos équipements sont assemblés et testés dans notre atelier de Villette-d'Anthon, en Isère. Nous les livrons partout en France, Corse comprise, et les installons sur place.",
  points: ['Livraison et installation partout en France', 'Mise en service et prise en main sur place', "Jusqu'à 3 ans de garantie, une ligne directe"],
  image: img('ambiance/2'),
  alt: "Le showroom RESTART : borne d'arcade, cible de fléchettes, baby-foot, fauteuil massant et cocon de repos",
  caption: "Notre atelier et showroom, à Villette-d'Anthon (38)",
}

const espacesData: Espace[] = [
  {
    id: 'bar-commerce',
    path: audiencePath('bar-commerce'),
    label: 'Bar & commerce',
    short: 'Commerce',
    line: 'Animer votre établissement et fidéliser vos clients',
    kind: 'vitrine',
    video: { ...video('bar-commerce'), fallback: img('situations/bar'), alt: "Bar équipé d'un flipper, de fléchettes, d'une borne d'arcade, d'un baby-foot et d'un billard" },
    hero: {
      eyebrow: 'Bars, restaurants, campings, complexes sportifs',
      lines: ['Animez', 'votre établissement,', 'fidélisez vos clients.'],
      accent: 'établissement',
      text: "Bornes d'arcade, fléchettes électroniques, baby-foot, billards et flippers, à l'achat ou en location longue durée, à vos couleurs et avec monnayeur en option.",
      marks: [
        ['Achat ou location longue durée', 'Monnayeur en option'],
        ['À votre enseigne', 'Covering, couleurs, logo'],
        ['Partout en France', 'Livraison et installation'],
      ],
    },
    marquee: ['Bars & restaurants', 'Campings & gîtes', 'Complexes sportifs', 'Centres de loisirs', 'Monnayeur en option', 'À votre enseigne', 'Vente & location'],
    univers: ['borne-arcade', 'flechettes', 'baby-foot', 'billard', 'flipper-numerique'],
    nav: [
      { label: 'Notre concept', href: espaceHref('bar-commerce', 'concept/') },
      { label: 'Nos réalisations', href: '/realisations/' },
      { label: 'Qui sommes-nous', href: '/qui-sommes-nous/' },
      { label: 'Blog', href: '/blog/' },
      { label: 'Contact', href: '/contact/' },
    ],
    values: [
      personnalisation(
        "Ajoutez votre logo et votre charte graphique : chaque borne devient un outil de communication, et votre établissement se différencie avec son propre univers.",
        ['Vos couleurs, votre logo, votre identité', 'Covering PVC, boutons et T-Molding au choix', 'Un visuel soumis avant toute fabrication'],
      ),
      {
        label: 'Location ou achat',
        short: 'Sans immobiliser de trésorerie',
        title: 'Une source de revenus, pas une charge',
        text: "La location longue durée inclut la livraison, l'installation et la maintenance. Avec le monnayeur en option, bornes et fléchettes deviennent un revenu complémentaire.",
        points: ['Location longue durée, maintenance assurée', 'Monnayeur en option sur bornes et fléchettes', 'Achat possible, devis sous 48 heures'],
        image: img('situations/flechettes'),
        alt: 'Partie de fléchettes électroniques dans un bar',
        caption: 'Des fléchettes électroniques qui remplissent un créneau creux',
      },
      livraison,
    ],
    offersTitle: 'Trois façons de vous équiper',
    offersText: 'Achat, location longue durée ou projet complet : la formule suit votre établissement.',
    offers: [
      {
        tag: 'Location',
        title: 'Location longue durée',
        text: "La formule la plus fréquente en bar : l'équipement s'installe sans immobiliser de trésorerie.",
        points: ['Livraison et installation incluses', 'Maintenance assurée', 'Monnayeur en option'],
        image: img('situations/borne-arcade'),
        alt: "Amis autour d'une borne d'arcade",
        href: '/contact/',
        cta: 'Demander un devis',
      },
      {
        tag: 'Achat',
        title: "À l'achat, à votre enseigne",
        text: "Vous investissez une fois : l'équipement est à vous, habillé à vos couleurs.",
        points: ['Covering et logo personnalisés', "Jusqu'à 3 ans de garantie", 'Paiement en plusieurs fois'],
        image: img('carrousel/reel-lyon'),
        alt: 'Borne noir et or dans un café à Lyon',
        href: produitsHref('bar-commerce'),
        cta: 'Voir les produits',
      },
      {
        tag: 'Sur mesure',
        title: 'Un espace entier à animer',
        text: 'Club-house, salle commune de camping, espace d’attente : on compose l’ensemble avec vous.',
        points: ['Audit de votre lieu, gratuit', 'Plusieurs jeux, un seul interlocuteur', 'Proposition chiffrée sous 48 heures'],
        image: img('situations/sur-mesure'),
        alt: "Salle de jeux complète : baby-foot, borne d'arcade, fléchettes et néons",
        href: '/contact/',
        cta: 'Décrire mon projet',
      },
    ],
    projects: [
      { src: img('carrousel/reel-lyon'), tag: "Borne d'arcade", caption: 'Borne noir et or dans un café à Lyon (69)' },
      { src: img('carrousel/reel-castres'), tag: 'Fléchettes', caption: 'Partie de fléchettes électroniques dans un café à Castres (81)' },
      { src: img('carrousel/reel-marseille'), tag: 'Billard', caption: "Partie de billard dans le salon d'un hôtel à Marseille (13)" },
      { src: img('carrousel/reel-bourg'), tag: 'Borne & baby-foot', caption: 'Borne personnalisée et baby-foot chez un barbier à Bourg-lès-Valence (26)' },
      { src: img('realisations/r140'), tag: "Borne d'arcade", caption: 'Partie à deux dans un pub de nuit à Lyon (69)' },
      { src: img('realisations/r33'), tag: 'Baby-foot', caption: "Baby-foot d'extérieur à Saint-Cirgue (81)" },
    ],
    faq: audiencePage('bar-commerce').faq,
    faqPhotos: [
      { src: img('situations/bar'), alt: 'Bar équipé de jeux' },
      { src: img('situations/flechettes'), alt: 'Partie de fléchettes dans un bar' },
      { src: img('carrousel/reel-lyon'), alt: 'Borne personnalisée dans un café' },
      { src: img('situations/billard'), alt: 'Partie de billard' },
      { src: img('carrousel/reel-castres'), alt: 'Fléchettes dans un café' },
    ],
    concept: {
      title: 'Votre établissement, un vrai',
      accent: 'lieu de vie',
      intro: [
        "RESTART transforme votre établissement en un véritable lieu de vie. Nous créons des espaces de divertissement qui attirent, fidélisent et prolongent le temps passé sur place.",
        "Aujourd'hui, 80 % des consommateurs considèrent que l'expérience proposée est aussi importante que les produits ou les services eux-mêmes. Chaque minute passée chez vous est une occasion de créer un moment dont on se souvient.",
      ],
      blocks: [
        {
          label: 'Pourquoi RESTART',
          short: "L'expérience client",
          title: 'Faire de chaque visite un moment mémorable',
          text: "Bar, restaurant, commerce, complexe sportif ou lieu de loisirs : nos équipements apportent une vraie valeur ajoutée et renforcent l'attractivité de votre établissement.",
          points: ['Des clients qui restent plus longtemps', 'Des clients qui reviennent et recommandent', 'Un temps d’attente qui devient un bon moment'],
          image: img('panorama/bar'),
          alt: 'Une pièce devenue un bar au crépuscule, avec des clients qui jouent au baby-foot, au billard et aux fléchettes',
          caption: 'Un bar, à la tombée de la nuit',
        },
        personnalisation(
          "Ajoutez votre logo, votre charte graphique et renforcez l'identité de votre enseigne. C'est un outil de communication virale : différenciez-vous avec votre propre univers.",
          ['Vos couleurs', 'Votre logo', 'Votre identité'],
        ),
        {
          label: 'Engagement',
          short: 'Pour votre enseigne',
          title: "Engagés pour l'expérience client de votre enseigne",
          text: 'Proposez une expérience conviviale et originale qui donne envie à vos clients de rester plus longtemps et de revenir.',
          points: ['Achat ou location longue durée', 'Monnayeur en option', 'Un seul interlocuteur, du devis à la maintenance'],
          image: img('situations/borne-arcade'),
          alt: "Amis autour d'une borne d'arcade",
          caption: 'Une borne au cœur de la salle',
        },
        livraison,
      ],
    },
  },
  {
    id: 'entreprise',
    path: audiencePath('entreprise'),
    label: 'Entreprise',
    short: 'Entreprise',
    line: 'Des salles de pause où vos équipes aiment se retrouver',
    kind: 'vitrine',
    video: { ...video('entreprise'), fallback: img('situations/entreprise'), alt: "Collègues autour d'un billard dans l'espace détente de leur entreprise" },
    hero: {
      eyebrow: 'Salles de pause, CSE, espaces d’accueil',
      lines: ['Des salles de pause', 'où vos équipes', 'aiment se retrouver.'],
      accent: 'équipes',
      text: "Bornes d'arcade, baby-foot, billards, fauteuils massants et cocons de repos pour le bien-être de vos collaborateurs, à l'achat ou en location avec maintenance incluse.",
      marks: [
        ['Bien-être et cohésion', 'Une démarche QVCT concrète'],
        ['Achat ou location', 'Maintenance incluse en location'],
        ['À vos couleurs', 'Logo et charte graphique'],
      ],
    },
    marquee: ['Salles de pause', 'Comités d’entreprise', 'Espaces d’accueil', 'Séminaires & afterworks', 'Fauteuils massants', 'Cocons de repos', 'Vente & location'],
    univers: ['borne-arcade', 'baby-foot', 'billard', 'flechettes', 'flipper-numerique', 'fauteuil-massant', 'cocon-de-repos'],
    nav: [
      { label: 'Le concept', href: espaceHref('entreprise', 'concept/') },
      { label: 'Nos réalisations', href: '/realisations/' },
      { label: 'Qui sommes-nous', href: '/qui-sommes-nous/' },
      { label: 'Blog', href: '/blog/' },
      { label: 'Contact', href: '/contact/' },
    ],
    values: [
      personnalisation(
        "Ajoutez votre logo et votre charte graphique : chaque équipement raconte un peu votre marque, pour vos salariés comme pour vos visiteurs.",
        ['Logo et charte graphique de l’entreprise', 'Covering PVC, boutons et T-Molding au choix', 'Un visuel soumis avant toute fabrication'],
      ),
      {
        label: 'Location ou achat',
        short: 'Selon votre traitement comptable',
        title: "Location longue durée ou achat, l'offre qu'il vous faut",
        text: "La location longue durée, réservée aux professionnels, inclut la livraison, l'installation et la maintenance, sans immobiliser de trésorerie. L'achat convient aux entreprises qui préfèrent investir.",
        points: ['Maintenance incluse en location', 'Usage libre, sans monnayeur', "Jusqu'à 3 ans de garantie à l'achat"],
        image: img('ambiance/5'),
        alt: "Collègues autour d'une borne d'arcade dans un espace de pause",
        caption: 'Une pause qui fait sortir les équipes de leur bureau',
      },
      livraison,
    ],
    offersTitle: 'Pour vos équipes, vos visiteurs, votre récupération',
    offersText: 'Trois usages, une même idée : faire de vos espaces des lieux de vie.',
    offers: [
      {
        tag: 'Salle de pause',
        title: 'Pour vos équipes',
        text: 'Un point de rassemblement qui fait sortir les équipes de leur bureau, et qui compte dans votre démarche QVCT.',
        points: ['Baby-foot, borne, billard, fléchettes', 'Usage libre, sans monnayeur', 'Maintenance incluse en location'],
        image: img('situations/entreprise'),
        alt: "Collègues autour d'un billard au bureau",
        href: produitsHref('entreprise', 'baby-foot'),
        cta: 'Découvrir',
      },
      {
        tag: 'Accueil',
        title: 'Pour vos visiteurs',
        text: "Vos visiteurs patientent autour d'une borne ou d'une cible plutôt que devant un mur : l'attente devient une expérience positive.",
        points: ['Borne d’arcade à votre logo', 'Flipper numérique', 'Covering à votre charte'],
        image: img('situations/flipper-numerique'),
        alt: "Flipper numérique installé dans la cuisine d'un bureau",
        href: produitsHref('entreprise', 'borne-arcade'),
        cta: 'Découvrir',
      },
      {
        tag: 'Récupération',
        title: 'Pour souffler vraiment',
        text: 'Fauteuils massants et cocons de repos pour une vraie pause, isolée du bruit et de la lumière.',
        points: ['Fauteuil massant M-SERENITY', 'Cocon de repos', 'Installation et prise en main'],
        image: img('situations/cocon-de-repos'),
        alt: 'Cocon de repos dans une salle de récupération',
        href: produitsHref('entreprise', 'fauteuil-massant'),
        cta: 'Découvrir',
      },
    ],
    projects: [
      { src: img('ambiance/5'), tag: "Borne d'arcade", caption: "Collègues autour d'une borne dans un espace de pause" },
      { src: img('situations/entreprise'), tag: 'Billard', caption: "Partie de billard dans l'espace détente d'une entreprise" },
      { src: img('realisations/r117'), tag: "Borne d'arcade", caption: 'Borne Metal Slug personnalisée, avant livraison' },
      { src: img('ambiance/6'), tag: 'Espace de pause', caption: 'Un bureau équipé pour la pause' },
      { src: img('situations/fauteuil-massant'), tag: 'Fauteuil massant', caption: "Fauteuil massant dans l'espace détente d'une entreprise" },
      { src: img('situations/cocon-de-repos'), tag: 'Cocon de repos', caption: 'Cocon de repos dans une salle de récupération' },
    ],
    faq: audiencePage('entreprise').faq,
    faqPhotos: [
      { src: img('situations/entreprise'), alt: "Collègues autour d'un billard" },
      { src: img('ambiance/5'), alt: "Collègues autour d'une borne d'arcade" },
      { src: img('realisations/r117'), alt: 'Borne personnalisée' },
      { src: img('situations/fauteuil-massant'), alt: 'Fauteuil massant' },
      { src: img('ambiance/6'), alt: 'Espace de pause' },
    ],
    concept: {
      title: 'Des lieux de passage devenus',
      accent: 'lieux de vie',
      intro: [
        'RESTART transforme les lieux de passage en lieux de vie, où détente, bien-être et interaction favorisent le lien social et la cohésion.',
        "Notre mission : améliorer l'expérience de vos collaborateurs et de vos visiteurs. 64 % des consommateurs affirment que l'expérience compte plus que le prix ; une bonne expérience, c'est aussi des clients onze fois plus enclins à recommander une marque.",
      ],
      blocks: [
        {
          label: 'Pourquoi RESTART',
          short: "L'expérience collaborateur",
          title: 'Le bien-être au service de la performance durable',
          text: "En interne avec vos collaborateurs comme en externe avec vos clients et visiteurs, nous dynamisons le temps passé chez vous et renforçons la fidélité à votre marque.",
          points: ['Des pauses qui rassemblent', 'Une démarche QVCT concrète', 'Des visiteurs mieux accueillis'],
          image: img('panorama/entreprise'),
          alt: "Une pièce devenue l'espace de pause d'une entreprise : des collègues jouent au baby-foot et se détendent dans le fauteuil massant",
          caption: "Un espace de pause d'entreprise",
        },
        {
          label: "L'attente",
          short: 'Repensée',
          title: "Une attente qui n'est plus subie, mais vécue",
          text: "Créer un moment d'attente vécu positivement : un vrai atout pour fidéliser les clients et améliorer l'image de l'entreprise.",
          points: ['Espaces d’accueil animés', 'Équipements à votre logo', 'Sans organisation de votre part'],
          image: img('situations/flipper-numerique'),
          alt: "Flipper numérique dans la cuisine d'un bureau",
          caption: 'Un flipper numérique près de la machine à café',
        },
        personnalisation(
          "Ajoutez votre logo, votre charte graphique et renforcez l'identité de votre entreprise : chaque équipement raconte un peu de vous.",
          ['Vos couleurs', 'Votre logo', 'Votre identité'],
        ),
        {
          label: 'Engagement',
          short: 'Pour votre bien-être',
          title: 'Créer du lien, chaque jour',
          text: "Plus qu'une vision, une action : des solutions originales, ludiques et utiles, qui évoluent avec les besoins des entreprises. En location longue durée ou à l'achat, nous avons l'offre qu'il vous faut.",
          points: ['Location longue durée ou achat', 'Maintenance incluse en location', 'Devis gratuit sous 48 heures'],
          image: img('situations/cocon-de-repos'),
          alt: 'Cocon de repos dans une salle de récupération',
          caption: 'Un cocon de repos, pour souffler vraiment',
        },
      ],
    },
  },
  {
    id: 'particulier',
    path: audiencePath('particulier'),
    label: 'Particulier',
    short: 'Particulier',
    line: "L'ambiance des salles d'arcade, à la maison",
    kind: 'boutique',
    video: { ...video('particulier'), fallback: img('situations/maison'), alt: "Amis réunis dans un salon autour d'une borne d'arcade" },
    hero: {
      eyebrow: 'Salon, salle de jeux, garage, jardin',
      lines: ["L'ambiance", "des salles d'arcade,", 'à la maison.'],
      accent: "salles d'arcade",
      text: "Bornes d'arcade, fléchettes électroniques, baby-foot et fauteuils massants, livrés montés chez vous et personnalisés à votre goût. Paiement en 2x, 3x ou 4x.",
      marks: [
        ['Paiement en 2x, 3x ou 4x', 'Prix affichés, livraison comprise'],
        ['Livré monté et installé', 'Vous branchez, vous jouez'],
        ['À votre goût', 'Covering, boutons LED, stickers'],
      ],
    },
    marquee: ["Bornes d'arcade", 'Fléchettes électroniques', 'Baby-foot', 'Fauteuils massants', 'Covering à vos couleurs', 'Paiement en 4x', 'Livré monté'],
    univers: ['borne-arcade', 'flechettes', 'baby-foot', 'fauteuil-massant'],
    nav: [
      { label: 'Je crée', href: espaceHref('particulier', 'concept/') },
      { label: 'Livraison & installation', href: espaceHref('particulier', 'concept/#livraison') },
      { label: 'Qui sommes-nous', href: '/qui-sommes-nous/' },
      { label: 'Blog', href: '/blog/' },
      { label: 'Contact', href: '/contact/' },
    ],
    values: [
      personnalisation(
        "Covering, bouton lumineux LED, bouton doré « Gold », sticker enfant, porte-gobelet : créez un jeu qui vous ressemble et qui s'intègre à votre intérieur.",
        ['Couleurs, finitions et motifs au choix', 'Boutons LED ou dorés « Gold »', 'Un visuel validé avant fabrication'],
      ),
      {
        label: 'Paiement',
        short: 'En plusieurs fois',
        title: 'Les prix affichés, le paiement en 2x, 3x ou 4x',
        text: "Chaque modèle affiche son prix, livraison et installation comprises. Vous commandez en ligne et réglez en plusieurs fois, sans frais cachés.",
        points: ['Prix TTC affiché sur chaque modèle', 'Paiement en 2x, 3x ou 4x', "Jusqu'à 3 ans de garantie"],
        image: img('situations/maison'),
        alt: "Adolescents autour d'une borne d'arcade dans un salon",
        caption: 'Une borne qui se remarque, aussi belle éteinte qu’allumée',
      },
      livraison,
    ],
    offersTitle: 'Nos offres pour la maison',
    offersText: 'Un jeu pour commencer, ou la salle de jeux complète : chaque offre est livrée montée et installée.',
    offers: [
      {
        tag: 'Pour commencer',
        title: "La borne d'arcade du salon",
        text: '1 000 jeux dans 61 cm de large : le format qui passe partout, des classiques des années 80 aux titres 32 bits.',
        points: ['R-LEVEL, 1 000 jeux', 'Livrée montée, vous branchez', 'Paiement en 4x'],
        image: img('situations/maison'),
        alt: "Amis réunis dans un salon autour d'une borne d'arcade",
        href: produitsHref('particulier', 'borne-arcade', 'r-level'),
        cta: 'Voir la R-LEVEL',
      },
      {
        tag: 'En famille',
        title: 'Le baby-foot de la maison',
        text: 'Du BF START au BF PREMIUM en bois, jusqu’au BF 4 SAISONS qui reste dehors toute l’année.',
        points: ['6 à 8 couleurs au choix', 'Intérieur ou extérieur', 'Livré monté et réglé'],
        image: img('hero/baby-foot'),
        alt: 'Baby-foot de toutes les couleurs dans une salle lumineuse',
        href: produitsHref('particulier', 'baby-foot'),
        cta: 'Voir les baby-foot',
      },
      {
        tag: 'Salle de jeux',
        title: 'La salle de jeux complète',
        text: "Borne, fléchettes et baby-foot : la salle d'arcade complète chez vous, composée avec vous et personnalisée.",
        points: ['Conseil sur votre pièce', 'Covering coordonné', 'Une seule livraison'],
        image: img('situations/sur-mesure'),
        alt: "Salle de jeux complète : baby-foot, borne d'arcade, fléchettes et néons",
        href: '/contact/',
        cta: 'Composer ma salle',
      },
    ],
    projects: [
      { src: img('situations/maison'), tag: "Borne d'arcade", caption: "Une borne d'arcade dans un salon de famille" },
      { src: img('realisations/r33'), tag: 'Baby-foot', caption: "Baby-foot d'extérieur à Saint-Cirgue (81)" },
      { src: img('realisations/r117'), tag: "Borne d'arcade", caption: 'Borne Metal Slug personnalisée, avant livraison' },
      { src: img('situations/borne-arcade'), tag: "Borne d'arcade", caption: "Une partie entre amis sur la borne" },
      { src: img('situations/flechettes'), tag: 'Fléchettes', caption: 'Partie de fléchettes électroniques' },
      { src: img('situations/baby-foot'), tag: 'Baby-foot', caption: 'Baby-foot en bois dans une pièce lumineuse' },
    ],
    faq: audiencePage('particulier').faq,
    faqPhotos: [
      { src: img('situations/maison'), alt: "Borne d'arcade dans un salon" },
      { src: img('situations/baby-foot'), alt: 'Baby-foot en bois' },
      { src: img('realisations/r117'), alt: 'Borne personnalisée' },
      { src: img('situations/flechettes'), alt: 'Fléchettes électroniques' },
      { src: img('realisations/r33'), alt: "Baby-foot d'extérieur" },
    ],
    concept: {
      title: 'Pensés pour vous,',
      accent: 'créés par vous',
      intro: [
        "Créer un produit à votre image, ce n'est pas un bonus : c'est une évidence. Couleurs, finitions, motifs : vous choisissez, on crée.",
        'Parce que votre intérieur est unique, nos produits s’adaptent à votre style, à vos envies et à votre univers. Un design qui vous ressemble, pour un plaisir 100 % personnel.',
      ],
      blocks: [
        {
          label: 'Ma borne d’arcade',
          short: 'Je personnalise',
          title: 'Créez votre propre jeu',
          text: "Ajoutez une touche unique à votre borne d'arcade : covering, bouton lumineux LED, bouton doré « Gold », sticker enfant et porte-gobelet.",
          points: ['Covering à vos couleurs', 'Boutons LED ou « Gold »', 'Sticker enfant, porte-gobelet'],
          image: img('realisations/r117'),
          alt: 'Borne d’arcade Metal Slug personnalisée',
          caption: 'Une borne personnalisée, avant livraison',
        },
        {
          label: 'R-TWIN sur mesure',
          short: 'La borne table',
          title: 'La borne cocktail, à votre image',
          text: 'Le format table, à deux face à face : covering PVC personnalisable, rétroéclairage LED, verre sécurit.',
          points: ['Format cocktail 86 × 76 cm', 'Covering PVC personnalisable', 'Bouton lumineux en option'],
          image: img('situations/borne-arcade'),
          alt: "Amis autour d'une borne d'arcade",
          caption: 'Une partie à deux',
        },
        {
          label: 'Mes fléchettes',
          short: 'Sur mesure',
          title: 'Des fléchettes qui s’intègrent à votre intérieur',
          text: 'Une cible électronique habillée à votre goût, pour des parties en famille ou entre amis.',
          points: ['Comptage automatique des points', 'Habillage personnalisé', 'Livrée et installée'],
          image: img('situations/flechettes'),
          alt: 'Partie de fléchettes électroniques',
          caption: 'Des parties sans calcul mental',
        },
        { ...livraison, label: 'Livraison & installation', text: 'Nous vous livrons partout en France, et même en Corse. Nos produits sont assemblés dans notre atelier en Isère (38), puis installés chez vous.' },
      ],
    },
  },
]

/** Ordre donné par RESTART : commerce, entreprise, particulier. */
export const espacesV2 = espacesData
export const espaceV2 = (id: Audience) => espacesData.find((e) => e.id === id)!
export const espaceUnivers = (id: Audience) => espaceV2(id).univers.map((s) => findUnivers(s)!).filter(Boolean)
