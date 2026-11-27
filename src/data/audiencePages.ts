import type { Audience } from '@/data/catalogue'
import { asset } from '@/lib/site'

/**
 * Une page par public, comme les trois accueils de l'ancien restart-arcade.fr
 * (/accueil/, /accueil-bars-commerces/, /accueil-particulier/). Les textes
 * reprennent ces pages (knowledge/content/pages/accueil*.md) ; les faits
 * (prix, garanties) viennent du catalogue et du site actuel.
 */
export type AudiencePage = {
  id: Audience
  slug: string
  /** Ancienne URL redirigée vers cette page (docs/redirections.md). */
  oldPath: string
  crumb: string
  metaTitle: string
  metaDescription: string
  h1: string
  photo: string
  photoAlt: string
  brief: string[]
  intro: { title: string; paragraphs: string[] }
  uses: { title: string; text: string }[]
  faq: { q: string; a: string }[]
  cta: { title: string; subtitle: string }
}

export const audiencePages: AudiencePage[] = [
  {
    id: 'entreprise',
    slug: 'entreprises',
    oldPath: '/accueil/',
    crumb: 'Entreprises',
    metaTitle: "Bornes d'arcade, baby-foot et détente pour vos salles de pause d'entreprise",
    metaDescription:
      "RESTART équipe les salles de pause et les espaces d'accueil des entreprises : bornes d'arcade, fléchettes, baby-foot, billards, fauteuils massants et cocons de repos, à l'achat ou en location longue durée.",
    h1: 'Des salles de pause où vos équipes ont envie de revenir',
    photo: asset('/img/situations/entreprise.webp'),
    photoAlt: "Collègues autour d'un billard dans l'espace détente de leur entreprise",
    brief: [
      'Achat ou location longue durée',
      'Usage libre, sans monnayeur, pour vos salariés et vos visiteurs',
      'À vos couleurs : logo, charte graphique, covering sur mesure',
      "Jusqu'à 3 ans de garantie, devis gratuit",
    ],
    intro: {
      title: 'Créateur de bien-être en entreprise',
      paragraphs: [
        'Nous repensons les salles de pause et les espaces professionnels pour y insuffler bien-être, convivialité et plaisir, au service de la performance durable.',
        "Nous améliorons aussi votre expérience visiteur : les moments d'attente, souvent vécus comme une frustration, deviennent une expérience positive et engageante. Ajoutez votre logo et votre charte graphique, et chaque équipement raconte un peu votre marque.",
      ],
    },
    uses: [
      {
        title: 'Salle de pause',
        text: "Un point de rassemblement qui fait sortir les équipes de leur bureau, et qui compte dans votre démarche QVCT.",
      },
      {
        title: 'Accueil et attente',
        text: "Vos visiteurs patientent autour d'une borne ou d'une cible plutôt que devant un mur.",
      },
      {
        title: 'Récupération',
        text: 'Fauteuils massants et cocons de repos pour une vraie pause, isolée du bruit et de la lumière.',
      },
      {
        title: 'Événements internes',
        text: 'Séminaires, afterworks, journées portes ouvertes : un équipement qui anime sans organisation.',
      },
    ],
    faq: [
      {
        q: 'Vaut-il mieux acheter ou louer pour une entreprise ?',
        a: "Les deux sont possibles. La location longue durée, réservée aux professionnels, évite d'immobiliser de la trésorerie. L'achat convient aux entreprises qui préfèrent investir.",
      },
      {
        q: 'Peut-on mettre notre logo sur les équipements ?',
        a: 'Oui. Le covering PVC, la couleur des boutons et le T-Molding sont personnalisables sur les bornes R-TWIN, R-EVOLUTION, R-PRO et R-DART PRO. Un visuel vous est soumis pour validation avant fabrication.',
      },
      {
        q: 'Quel est le délai de livraison ?',
        a: 'Le délai de fabrication et de livraison vous est communiqué avant la validation de la commande. Pour un équipement personnalisé, il dépend aussi de la validation du visuel.',
      },
    ],
    cta: {
      title: 'Une salle de pause à repenser ?',
      subtitle: 'Décrivez votre espace en deux minutes : proposition chiffrée gratuite.',
    },
  },
  {
    id: 'bar-commerce',
    slug: 'bars-commerces',
    oldPath: '/accueil-bars-commerces/',
    crumb: 'Bars & commerces',
    metaTitle: 'Fléchettes, bornes d’arcade, billards et flippers pour bars, restaurants et commerces',
    metaDescription:
      "RESTART anime bars, restaurants, campings, hôtels et complexes sportifs : fléchettes professionnelles, bornes d'arcade avec monnayeur, baby-foot, billards et flippers, à vos couleurs, à l'achat ou en location.",
    h1: 'Animez votre établissement, fidélisez vos clients',
    photo: asset('/img/situations/bar.webp'),
    photoAlt: "Pub équipé d'un flipper, d'une cible de fléchettes et d'une borne d'arcade à son enseigne, d'un baby-foot et d'un billard",
    brief: [
      'Location sans immobiliser de trésorerie, ou achat',
      'Monnayeur en option : une source de revenus complémentaire',
      'Habillage à votre enseigne',
      'Bars, restaurants, campings, hôtels, complexes sportifs, centres de loisirs',
    ],
    intro: {
      title: "Valorisez votre établissement par l'expérience",
      paragraphs: [
        "Aujourd'hui, l'expérience client ne se limite plus à la qualité d'un service ou d'un produit. Les établissements qui se démarquent sont ceux qui créent de véritables moments de convivialité et de partage.",
        "Qu'il s'agisse d'un client qui attend son plat, d'une famille en séjour dans un camping, d'un groupe d'amis dans un bar ou d'un sportif après son activité, nos équipements transforment les temps d'attente et les espaces communs en lieux d'animation.",
      ],
    },
    uses: [
      {
        title: 'Bar et restaurant',
        text: 'Prolonger le temps passé sur place et faire revenir les habitués, avec un jeu à votre enseigne.',
      },
      {
        title: 'Camping et gîte',
        text: 'Une salle commune qui occupe les familles et les groupes pendant leur séjour.',
      },
      {
        title: 'Complexe sportif',
        text: 'Valoriser le club-house et retenir les joueurs après leur match.',
      },
      {
        title: 'Centre de loisirs et commerces',
        text: "Animer un espace d'attente ou créer un revenu complémentaire grâce au monnayeur.",
      },
    ],
    faq: [
      {
        q: 'Peut-on louer plutôt qu’acheter ?',
        a: "Oui, c'est la formule la plus fréquente en bar et en commerce. La location évite d'immobiliser de la trésorerie.",
      },
      {
        q: 'Les bornes et les fléchettes peuvent-elles être payantes ?',
        a: "Oui. Le monnayeur est proposé en option sur les bornes d'arcade professionnelles et sur la cible R-DART PRO : l'équipement devient une source de revenus et plus seulement une animation.",
      },
      {
        q: 'Peut-on habiller les équipements aux couleurs de notre établissement ?',
        a: 'Oui. Covering, couleurs et logo sont personnalisables, et un visuel vous est soumis pour validation avant fabrication.',
      },
    ],
    cta: {
      title: 'Un établissement à animer ?',
      subtitle: 'Dites-nous votre lieu et votre clientèle : proposition chiffrée gratuite.',
    },
  },
  {
    id: 'particulier',
    slug: 'particuliers',
    oldPath: '/accueil-particulier/',
    crumb: 'Particuliers',
    metaTitle: "Borne d'arcade, baby-foot et fléchettes pour la maison",
    metaDescription:
      "L'ambiance des salles d'arcade à la maison : bornes d'arcade, baby-foot intérieur et extérieur, fléchettes électroniques et fauteuils massants, fabriqués en Isère, livrés partout en France, paiement en 2x, 3x ou 4x.",
    h1: "L'ambiance des salles d'arcade, directement à la maison",
    photo: asset('/img/situations/maison.webp'),
    photoAlt: "Amis réunis dans un salon autour d'une borne d'arcade",
    brief: [
      'Paiement en 2x, 3x ou 4x',
      'Livraison partout en France métropolitaine, en supplément',
      'Conçu et fabriqué dans notre atelier en Isère (38)',
      "Jusqu'à 3 ans de garantie",
    ],
    intro: {
      title: 'Des instants uniques, seul, en famille ou entre amis',
      paragraphs: [
        "Une borne d'arcade ne se résume pas à un simple équipement de jeu : elle devient un élément de décoration, de partage et de convivialité dans votre intérieur. Pac-Man, jeux de combat, jeux de course, classiques rétro : des centaines de jeux cultes réunissent petits et grands.",
        "Transformez votre salon, votre salle de jeux ou votre coin détente en véritable espace d'évasion. Nous sélectionnons pour vous le meilleur du divertissement à domicile.",
      ],
    },
    uses: [
      { title: 'Salon', text: 'Une borne qui se remarque, aussi belle éteinte qu’allumée.' },
      { title: 'Salle de jeux', text: "Borne, fléchettes et baby-foot : la salle d'arcade complète, chez vous." },
      { title: 'Garage ou sous-sol', text: 'Un espace oublié qui devient le lieu préféré de la maison.' },
      { title: 'Jardin et terrasse', text: "Des baby-foot conçus pour rester dehors toute l'année." },
    ],
    faq: [
      {
        q: 'Le paiement en plusieurs fois est-il possible ?',
        a: 'Oui, le paiement en 2, 3 ou 4 fois est disponible sur les achats en ligne.',
      },
      {
        q: 'La livraison comprend-elle le montage ?',
        a: "Non, sauf mention contraire sur la fiche, le devis ou la commande. Nos produits sont testés et emballés dans notre atelier, puis conçus pour être simples et rapides à mettre en place, sans compétences techniques particulières.",
      },
      {
        q: 'Peut-on personnaliser une borne pour la maison ?',
        a: 'Oui. Le covering, la couleur des boutons et le T-Molding sont personnalisables sur les bornes R-TWIN et R-EVOLUTION. Les baby-foot existent en 6 à 8 couleurs.',
      },
    ],
    cta: {
      title: 'Votre salle de jeux commence ici',
      subtitle: 'Parlez-nous de votre pièce et de vos envies : proposition chiffrée gratuite.',
    },
  },
]

export const audiencePage = (id: Audience) => audiencePages.find((p) => p.id === id)!
export const audiencePath = (id: Audience) => `/${audiencePage(id).slug}/`
