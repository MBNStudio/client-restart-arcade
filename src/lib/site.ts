export const site = {
  name: 'RESTART',
  legalName: 'RESTART',
  tagline: 'Créateur de bien-être en entreprise',
  description:
    "Vente et location de bornes d'arcade, fléchettes électroniques, baby-foot, billards et flippers numériques personnalisés. Livraison partout en France.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://restart-arcade.fr',
  locale: 'fr_FR',
  phone: '06 67 44 36 02',
  phoneE164: '+33667443602',
  email: 'contact@restart-arcade.fr',
  whatsapp: 'https://wa.me/33667443602',
  address: {
    street: '67 B rue des Aubépines',
    postalCode: '38280',
    city: "Villette-d'Anthon",
    region: 'Auvergne-Rhône-Alpes',
    country: 'FR',
    lat: 45.7683,
    lng: 5.1489,
  },
  areaServed: ['Lyon', 'Villeurbanne', 'Bourgoin-Jallieu', 'Grenoble', 'Saint-Étienne', 'France'],
  socials: {
    facebook: 'https://www.facebook.com/restartarcade',
    instagram: 'https://www.instagram.com/restart_arcade',
    linkedin: 'https://www.linkedin.com/company/restart-arcade',
  },
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID ?? '',
  // Identité juridique de l'exploitant, reprise des CGV RESTART en vigueur au 1er août 2026.
  company: {
    name: 'MG2T',
    form: 'Société par actions simplifiée (SAS)',
    capital: '10 000 €',
    siren: '941 508 442',
    rcs: '941 508 442 RCS Vienne',
    vat: 'FR89941508442',
    representative: 'M. Guillaume Blacha',
    representativeRole: 'Président',
  },
} as const

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
export const asset = (p: string) => `${basePath}${p}`
