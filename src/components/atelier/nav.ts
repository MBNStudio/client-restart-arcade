import { univers } from '@/data/catalogue'
import { audiencePath } from '@/data/audiencePages'

export interface LienNavigation {
  libelle: string
  href: string
  sousMenu?: { libelle: string; href: string }[] // sous-pages (liste déroulante du menu)
}

/** Menu de la version Atelier, construit comme celui d'ab-agencement.com. */
export const navigation: LienNavigation[] = [
  { libelle: 'Réalisations', href: '/realisations/' },
  {
    libelle: 'Produits',
    href: '/produits/',
    sousMenu: univers.map((u) => ({ libelle: u.navLabel, href: `/produits/${u.slug}/` })),
  },
  {
    libelle: 'Pour qui',
    href: audiencePath('entreprise'),
    sousMenu: [
      { libelle: 'Entreprises', href: audiencePath('entreprise') },
      { libelle: 'Bars & commerces', href: audiencePath('bar-commerce') },
      { libelle: 'Particuliers', href: audiencePath('particulier') },
    ],
  },
  { libelle: 'Qui sommes-nous', href: '/qui-sommes-nous/' },
  { libelle: 'Contact', href: '/contact/' },
]

// Tous les boutons « Demander un devis » pointent ici : le panneau de formulaire s'ouvre
// (sans JavaScript, le lien mène au formulaire de la page Contact).
export const lienDevis = '/contact/#devis'

export const horairesCourts = 'Lun – Ven · 9h – 18h'
