import { audiencePage, audiencePath } from '@/data/audiencePages'
import { findUnivers, type Audience } from '@/data/catalogue'
import { asset } from '@/lib/site'

/**
 * Les trois sites de la V2 (mail de RESTART du 5 novembre 2026) : un site par
 * public, chacun avec son menu, son contenu, ses photos et ses pages produits,
 * plus un site général en une page.
 *
 * Contenu : ne rien affirmer qui ne figure pas sur le site actuel, dans ses CGV ou dans un mail de RESTART.
 * En particulier (mail du 27 novembre 2026) : les jeux ne sont livrés ni montés ni installés, la livraison est
 * en supplément et aucune maintenance n'est annoncée comme incluse.
 */

export type NavItem = { label: string; href: string }
export type ValueBlock = { label: string; short: string; title: string; text: string; points: string[]; image: string; alt: string; caption: string }
export type Offer = {
  tag: string
  title: string
  text: string
  points: string[]
  image: string
  alt: string
  href: string
  cta: string
  /** Photo au format carré (photos verticales fournies par RESTART), avec son point de cadrage (`object-position`). */
  square?: boolean
  focus?: string
}
/** Une photo du défilé d'ouverture, avec son point de cadrage. */
export type Slide = { src: string; focus?: string }

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
  /** Ouverture : défilé de photos (`slides`) ou film (`src`). `poster` sert aussi aux pages produits. */
  video: { src?: string; slides?: Slide[]; poster: string; fallback: string; alt: string }
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
/** Défilé d'ouverture : les photos fournies par RESTART (scripts/build-photos-v4.mjs). */
const defile = (id: Audience, focus: string[]) => {
  const slides = focus.map((f, i) => ({ src: img(`v4/hero/${id}-${i + 1}`), focus: f }))
  return { slides, poster: slides[0].src }
}
const bloc = (id: Audience, n: 1 | 2 | 3) => img(`v4/blocs/${id}-${n}`)

/** Adresse d'une page d'un espace : `espaceHref('particulier', 'produits/baby-foot/')`. */
export const espaceHref = (id: Audience, rest = '') => `${audiencePath(id)}${rest}`
export const produitsHref = (id: Audience, univers?: string, modele?: string) =>
  espaceHref(id, `produits/${univers ? `${univers}/` : ''}${modele ? `${modele}/` : ''}`)

/** Blocs « valeur ajoutée » communs : personnalisation, location ou achat, livraison partout en France. */
const personnalisation = (text: string, points: string[], photo: { image: string; alt: string }): ValueBlock => ({
  label: 'Personnalisation',
  short: 'À votre image',
  title: 'Chaque jeu raconte un peu de vous',
  text,
  points,
  ...photo,
  caption: 'Covering, couleurs, logo : un visuel validé avant fabrication',
})

const livraison = (photo: { image: string; alt: string }): ValueBlock => ({
  label: 'Livraison',
  short: 'Partout en France',
  title: 'Livré chez vous, partout en France',
  text: "Testés et emballés dans notre atelier en Isère, nos produits sont conçus pour être simples et rapides à mettre en place.",
  points: ['Livraison en France métropolitaine, Corse sur devis', 'Frais de livraison en supplément', "Jusqu'à 3 ans de garantie selon le modèle"],
  ...photo,
  caption: 'Chez nos clients',
})

const espacesData: Espace[] = [
  {
    id: 'bar-commerce',
    path: audiencePath('bar-commerce'),
    label: 'Bar & commerce',
    short: 'Commerce',
    line: 'Animer votre établissement et fidéliser vos clients',
    kind: 'vitrine',
    video: { ...defile('bar-commerce', ['60% 50%', '60% 50%', '50% 60%', '50% 60%']), fallback: img('situations/bar'), alt: "Bars et restaurants équipés de jeux : flippers, fléchettes, bornes d'arcade, baby-foot et billards" },
    hero: {
      eyebrow: 'Bars, restaurants, campings, complexes sportifs',
      lines: ['Animez', 'votre établissement,', 'fidélisez vos clients.'],
      accent: 'établissement',
      text: "Bornes d'arcade, fléchettes électroniques, baby-foot, billards et flippers, à l'achat ou en location longue durée, à vos couleurs et avec monnayeur en option.",
      marks: [
        ['Achat ou location longue durée', 'Monnayeur en option'],
        ['À votre enseigne', 'Covering, couleurs, logo'],
        ['Partout en France', 'Livraison de vos équipements'],
      ],
    },
    marquee: ['Bars & restaurants', 'Campings & gîtes', 'Complexes sportifs', 'Centres de loisirs', 'Monnayeur en option', 'À votre enseigne', 'Vente & location'],
    univers: ['borne-arcade', 'flechettes', 'baby-foot', 'billard', 'flipper-numerique'],
    nav: [
      { label: 'Notre concept', href: espaceHref('bar-commerce', 'concept/') },
      { label: 'Nos réalisations', href: '/realisations/' },
      { label: 'Qui sommes-nous', href: '/qui-sommes-nous/' },
      { label: 'Contact', href: '/contact/' },
    ],
    values: [
      personnalisation(
        "Ajoutez votre logo et votre charte graphique : chaque borne devient un outil de communication, et votre établissement se différencie avec son propre univers.",
        ['Vos couleurs, votre logo, votre identité', 'Covering PVC, boutons et T-Molding au choix', 'Un visuel soumis avant toute fabrication'],
        { image: bloc('bar-commerce', 1), alt: "Borne d'arcade à l'enseigne d'une brasserie, à côté d'un baby-foot" },
      ),
      {
        label: 'Location ou achat',
        short: 'Sans immobiliser de trésorerie',
        title: 'Une source de revenus, pas une charge',
        text: "La location longue durée évite d'immobiliser de la trésorerie. Avec le monnayeur en option, bornes et fléchettes deviennent un revenu complémentaire.",
        points: ['Location longue durée ou achat', 'Monnayeur en option sur bornes et fléchettes', 'Devis gratuit'],
        image: bloc('bar-commerce', 2),
        alt: 'Baby-foot et deux bornes de fléchettes électroniques dans un établissement',
        caption: 'Chez nos clients',
      },
      livraison({ image: bloc('bar-commerce', 3), alt: "Borne d'arcade personnalisée dans la salle d'un bar" }),
    ],
    offersTitle: 'Trois façons de vous équiper',
    offersText: 'Achat, location longue durée ou projet complet : la formule suit votre établissement.',
    offers: [
      {
        tag: 'Location',
        title: 'Location longue durée',
        text: 'Vous équipez votre établissement sans immobiliser de trésorerie.',
        points: ['Sans immobiliser de trésorerie', 'Monnayeur en option', 'Devis gratuit'],
        image: img('v4/encarts/bar-location'),
        alt: 'Billard et borne de fléchettes dans la salle d’une brasserie aux murs de briques',
        square: true,
        focus: '50% 60%',
        href: '/contact/',
        cta: 'Demander un devis',
      },
      {
        tag: 'Achat',
        title: "À l'achat, à votre enseigne",
        text: "Vous investissez une fois : l'équipement est à vous, habillé à vos couleurs.",
        points: ['Covering et logo personnalisés', "Jusqu'à 3 ans de garantie", 'Paiement en plusieurs fois'],
        image: img('v4/encarts/bar-achat'),
        alt: "Borne d'arcade à l'enseigne d'un restaurant",
        square: true,
        focus: '50% 85%',
        href: produitsHref('bar-commerce'),
        cta: 'Voir les produits',
      },
      {
        tag: 'Sur mesure',
        title: 'Un espace entier à animer',
        text: 'Club-house, salle commune de camping, espace d’attente : on compose l’ensemble avec vous.',
        points: ['Audit de votre lieu, gratuit', 'Plusieurs jeux, un seul interlocuteur', 'Proposition chiffrée gratuite'],
        image: img('v4/encarts/bar-sur-mesure'),
        alt: "Borne d'arcade et borne de fléchettes personnalisées dans le club-house d'un centre de padel",
        square: true,
        focus: '75% 50%',
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
          { image: bloc('bar-commerce', 1), alt: "Borne d'arcade à l'enseigne d'une brasserie, à côté d'un baby-foot" },
        ),
        {
          label: 'Engagement',
          short: 'Pour votre enseigne',
          title: "Engagés pour l'expérience client de votre enseigne",
          text: 'Proposez une expérience conviviale et originale qui donne envie à vos clients de rester plus longtemps et de revenir.',
          points: ['Achat ou location longue durée', 'Monnayeur en option', 'Un seul interlocuteur'],
          image: img('situations/borne-arcade'),
          alt: "Amis autour d'une borne d'arcade",
          caption: 'Une borne au cœur de la salle',
        },
        livraison({ image: bloc('bar-commerce', 3), alt: "Borne d'arcade personnalisée dans la salle d'un bar" }),
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
    video: { ...defile('entreprise', ['50% 50%', '55% 60%', '50% 55%', '50% 65%']), fallback: img('situations/entreprise'), alt: 'Salles de pause en entreprise : collègues autour d’un billard, d’un baby-foot et de fléchettes' },
    hero: {
      eyebrow: 'Salles de pause, CSE, espaces d’accueil',
      lines: ['Des salles de pause', 'où vos équipes', 'aiment se retrouver.'],
      accent: 'équipes',
      text: "Bornes d'arcade, baby-foot, billards, fauteuils massants et cocons de repos pour le bien-être de vos collaborateurs, à l'achat ou en location longue durée.",
      marks: [
        ['Bien-être et cohésion', 'Une démarche QVCT concrète'],
        ['Achat ou location', 'Location longue durée pour les professionnels'],
        ['À vos couleurs', 'Logo et charte graphique'],
      ],
    },
    marquee: ['Salles de pause', 'Comités d’entreprise', 'Espaces d’accueil', 'Séminaires & afterworks', 'Fauteuils massants', 'Cocons de repos', 'Vente & location'],
    univers: ['borne-arcade', 'baby-foot', 'billard', 'flechettes', 'flipper-numerique', 'fauteuil-massant', 'cocon-de-repos'],
    nav: [
      { label: 'Le concept', href: espaceHref('entreprise', 'concept/') },
      { label: 'Nos réalisations', href: '/realisations/' },
      { label: 'Qui sommes-nous', href: '/qui-sommes-nous/' },
      { label: 'Contact', href: '/contact/' },
    ],
    values: [
      personnalisation(
        "Ajoutez votre logo et votre charte graphique : chaque équipement raconte un peu votre marque, pour vos salariés comme pour vos visiteurs.",
        ['Logo et charte graphique de l’entreprise', 'Covering PVC, boutons et T-Molding au choix', 'Un visuel soumis avant toute fabrication'],
        { image: bloc('entreprise', 1), alt: "Borne de fléchettes aux couleurs d'une entreprise, dans son hall d'accueil" },
      ),
      {
        label: 'Location ou achat',
        short: 'Selon votre traitement comptable',
        title: "Location longue durée ou achat, l'offre qu'il vous faut",
        text: "La location longue durée, réservée aux professionnels, évite d'immobiliser de la trésorerie. L'achat convient aux entreprises qui préfèrent investir.",
        points: ['Location longue durée ou achat', 'Usage libre, sans monnayeur', "Jusqu'à 3 ans de garantie à l'achat"],
        image: bloc('entreprise', 2),
        alt: 'Borne de fléchettes personnalisée dans l’espace détente d’un centre sportif',
        caption: 'Chez nos clients',
      },
      livraison({ image: bloc('entreprise', 3), alt: 'Borne de fléchettes, borne d’arcade et billard dans un espace de jeux' }),
    ],
    offersTitle: 'Pour vos équipes, vos visiteurs, votre récupération',
    offersText: 'Trois usages, une même idée : faire de vos espaces des lieux de vie.',
    offers: [
      {
        tag: 'Salle de pause',
        title: 'Pour vos équipes',
        text: 'Un point de rassemblement qui fait sortir les équipes de leur bureau, et qui compte dans votre démarche QVCT.',
        points: ['Baby-foot, borne, billard, fléchettes', 'Usage libre, sans monnayeur', 'Achat ou location longue durée'],
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
        points: ['Fauteuil massant M-SERENITY', 'Cocon de repos', 'Achat ou location longue durée'],
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
          { image: bloc('entreprise', 1), alt: "Borne de fléchettes aux couleurs d'une entreprise, dans son hall d'accueil" },
        ),
        {
          label: 'Engagement',
          short: 'Pour votre bien-être',
          title: 'Créer du lien, chaque jour',
          text: "Plus qu'une vision, une action : des solutions originales, ludiques et utiles, qui évoluent avec les besoins des entreprises. En location longue durée ou à l'achat, nous avons l'offre qu'il vous faut.",
          points: ['Location longue durée ou achat', 'Équipements personnalisables', 'Devis gratuit'],
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
    video: { ...defile('particulier', ['50% 60%', '50% 60%', '50% 60%', '40% 55%', '50% 55%']), fallback: img('situations/maison'), alt: 'Salles de jeux à la maison : baby-foot, bornes d’arcade, fléchettes et billard' },
    hero: {
      eyebrow: 'Salon, salle de jeux, garage, jardin',
      lines: ["L'ambiance", "des salles d'arcade,", 'à la maison.'],
      accent: "salles d'arcade",
      text: "Bornes d'arcade, fléchettes électroniques, baby-foot et fauteuils massants, personnalisés à votre goût et livrés chez vous. Paiement en 2x, 3x ou 4x.",
      marks: [
        // Textes exacts du mail du 27 novembre (« brise » corrigé en « prise »).
        ['Paiement en 2x, 3x ou 4x', 'Sans frais, livraison chez vous'],
        ["Simple d'utilisation", 'Se branche sur une prise standard'],
        ['Sur-mesure', "Personnalisable à l'infini"],
      ],
    },
    marquee: ["Bornes d'arcade", 'Fléchettes électroniques', 'Baby-foot', 'Fauteuils massants', 'Covering à vos couleurs', 'Paiement en 4x', 'Livraison chez vous'],
    univers: ['borne-arcade', 'flechettes', 'baby-foot', 'fauteuil-massant'],
    nav: [
      { label: 'Notre concept', href: espaceHref('particulier', 'concept/') },
      { label: 'Qui sommes-nous', href: '/qui-sommes-nous/' },
      { label: 'Contact', href: '/contact/' },
    ],
    values: [
      personnalisation(
        "Covering, bouton lumineux LED, bouton doré « Gold », sticker enfant, porte-gobelet : créez un jeu qui vous ressemble et qui s'intègre à votre intérieur.",
        ['Couleurs, finitions et motifs au choix', 'Boutons LED ou dorés « Gold »', 'Un visuel validé avant fabrication'],
        { image: bloc('particulier', 1), alt: "Borne d'arcade au covering coloré dans la pièce à vivre d'un gîte" },
      ),
      {
        label: 'Paiement',
        short: 'En plusieurs fois',
        title: 'Les prix affichés, le paiement en 2x, 3x ou 4x',
        text: "Chaque modèle affiche son prix TTC. Vous commandez en ligne et réglez en plusieurs fois ; les frais de livraison s'ajoutent à la commande.",
        points: ['Prix TTC affiché sur chaque modèle', 'Paiement en 2x, 3x ou 4x', "Jusqu'à 3 ans de garantie selon le modèle"],
        image: bloc('particulier', 2),
        alt: 'Baby-foot d’extérieur dans un jardin',
        caption: 'Chez nos clients',
      },
      livraison({ image: bloc('particulier', 3), alt: 'Borne de fléchettes électroniques dans une pièce lumineuse' }),
    ],
    offersTitle: 'Nos offres pour la maison',
    offersText: 'Une borne d’arcade, une cible de fléchettes, ou la salle de jeux complète.',
    offers: [
      {
        tag: 'Borne d’arcade',
        title: 'La borne R-EVOLUTION',
        text: '5 000 jeux et un écran 22 pouces, dans une borne entièrement à votre image : 61 cm de large pour 1,72 m de haut.',
        points: ['5 000 jeux, son stéréo', 'Covering PVC et couleur des boutons au choix', '1 590 € TTC, en 2x, 3x ou 4x'],
        image: img('v4/encarts/particulier-r-evolution'),
        alt: "Borne d'arcade R-EVOLUTION au décor coucher de soleil",
        square: true,
        focus: '50% 75%',
        href: produitsHref('particulier', 'borne-arcade', 'r-evolution'),
        cta: 'Voir la R-EVOLUTION',
      },
      {
        tag: 'Fléchettes',
        title: 'La borne R-DART PRO',
        text: 'La borne de fléchettes complète, sur pied, à votre image : écran 21/10e, son stéréo et rétroéclairage LED.',
        points: ['68 cm de large, 2,20 m de haut', 'Covering PVC, boutons et T-Molding au choix', '2 638,80 € TTC, en 2x, 3x ou 4x'],
        image: img('v4/encarts/particulier-r-dart-pro'),
        alt: 'Borne de fléchettes R-DART PRO personnalisée, dans un chalet face à un paysage enneigé',
        square: true,
        focus: '100% 50%',
        href: produitsHref('particulier', 'flechettes', 'r-dart-pro'),
        cta: 'Voir la R-DART PRO',
      },
      {
        tag: 'Salle de jeux',
        title: 'La salle de jeux complète',
        text: "Borne, fléchettes et baby-foot : la salle d'arcade complète chez vous, composée avec vous et personnalisée.",
        points: ['Conseil sur votre pièce', 'Covering coordonné', 'Une seule livraison'],
        image: img('v4/encarts/particulier-salle-de-jeux'),
        alt: "Salle de jeux à la maison : baby-foot, borne d'arcade, fléchettes et table cocktail",
        square: true,
        focus: '45% 50%',
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
          points: ['Comptage automatique des points', 'Habillage personnalisé', 'Livrée chez vous'],
          image: img('situations/flechettes'),
          alt: 'Partie de fléchettes électroniques',
          caption: 'Des parties sans calcul mental',
        },
        { ...livraison({ image: bloc('particulier', 3), alt: 'Borne de fléchettes électroniques dans une pièce lumineuse' }), label: 'Livraison' },
      ],
    },
  },
]

/** Ordre donné par RESTART : commerce, entreprise, particulier. */
export const espacesV2 = espacesData
export const espaceV2 = (id: Audience) => espacesData.find((e) => e.id === id)!
export const espaceUnivers = (id: Audience) => espaceV2(id).univers.map((s) => findUnivers(s)!).filter(Boolean)
