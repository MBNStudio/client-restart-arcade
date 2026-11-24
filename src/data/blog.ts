import raw from './blog.json'
import type { Audience } from './catalogue'

export type BlogBlock =
  | { type: 'p' | 'h2' | 'h3'; text: string }
  | { type: 'list'; items: string[] }

export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string
  words: number
  blocks: BlogBlock[]
  category: string
  /** Univers (cibles) auxquels l'article s'adresse : alimente la rubrique Actualité de chaque univers. */
  audiences: Audience[]
}

/**
 * Titres réécrits. Les titres d'origine étaient des empilements de mots-clés
 * (« Montiver son équipe : … », « Experience client réussie : levier marketing »),
 * parfois fautifs. On garde les mots-clés dans la description et le corps,
 * pas dans un titre que personne n'a envie de cliquer.
 */
const overrides: Record<string, { title: string; category: string }> = {
  'comment-occuper-vos-vacanciers-meme-quand-la-meteo-nest-pas-au-rendez-vous': {
    title: "Occuper vos vacanciers quand la météo ne suit pas",
    category: 'Hôtellerie & tourisme',
  },
  'club-house-buvette-comment-generer-plus-de-convivialite-et-de-consommation': {
    title: 'Club-house et buvette : générer plus de convivialité, et de consommation',
    category: 'Bars & commerces',
  },
  'le-role-des-jeux-baby-foot-arcade-flechettes-dans-la-cohesion-dequipe': {
    title: "Baby-foot, arcade, fléchettes : leur rôle réel dans la cohésion d'équipe",
    category: 'QVCT',
  },
  'lattente-comme-levier-marketing-transformer-un-moment-perdu-en-experience-positive': {
    title: "L'attente comme levier marketing : transformer un moment perdu",
    category: 'Expérience client',
  },
  'le-role-du-divertissement-et-du-bien-etre-dans-la-fidelisation-des-talents-en-2026': {
    title: 'Divertissement et bien-être : deux leviers de fidélisation des talents',
    category: 'QVCT',
  },
  'comment-preparer-vos-espaces-pour-un-debut-dannee-motivant-et-differenciant': {
    title: 'Préparer vos espaces pour un début d’année motivant',
    category: 'QVCT',
  },
  'noel-au-bureau-5-installations-originales-pour-surprendre-vos-collaborateurs': {
    title: 'Noël au bureau : 5 installations pour surprendre vos équipes',
    category: 'QVCT',
  },
  'bars-restaurants-comment-booster-vos-soirees-de-fin-dannee-grace-au-divertissement': {
    title: 'Bars et restaurants : booster vos soirées de fin d’année',
    category: 'Bars & commerces',
  },
  'comment-creer-des-evenements-internes-dynamiques-et-federateurs': {
    title: 'Créer des événements internes vraiment fédérateurs',
    category: 'QVCT',
  },
  'comment-surprendre-vos-clients-avec-des-espaces-conviviaux-dans-vos-gites-et-hotels': {
    title: 'Gîtes et hôtels : surprendre vos clients avec des espaces conviviaux',
    category: 'Hôtellerie & tourisme',
  },
  'comment-le-divertissement-prolonge-l-experience-client-dans-un-bar-ou-restaurant': {
    title: "Comment le divertissement prolonge l'expérience client au restaurant",
    category: 'Bars & commerces',
  },
  '5-bonnes-raisons-dintegrer-le-bien-etre-et-le-divertissement-en-entreprise': {
    title: "5 bonnes raisons d'intégrer le bien-être et le jeu en entreprise",
    category: 'QVCT',
  },
}

/** Cible de chaque rubrique : un article d'une rubrique n'apparaît que dans l'actualité des univers listés. */
const audiencesOfCategory: Record<string, Audience[]> = {
  QVCT: ['entreprise'],
  'Bars & commerces': ['bar-commerce'],
  'Hôtellerie & tourisme': ['bar-commerce'],
  'Expérience client': ['bar-commerce', 'entreprise'],
}

export const blogPosts: BlogPost[] = (raw as Omit<BlogPost, 'category' | 'audiences'>[])
  .map((p) => ({
    ...p,
    blocks: p.blocks as BlogBlock[],
    title: overrides[p.slug]?.title ?? p.title,
    category: overrides[p.slug]?.category ?? 'Actualités',
    audiences: audiencesOfCategory[overrides[p.slug]?.category ?? ''] ?? [],
  }))
  .sort((a, b) => b.date.localeCompare(a.date))

/** Articles d'un univers, du plus récent au plus ancien. */
export const postsFor = (audience: Audience) => blogPosts.filter((p) => p.audiences.includes(audience))

export const findPost = (slug: string) => blogPosts.find((p) => p.slug === slug)

export const blogCategories = [...new Set(blogPosts.map((p) => p.category))]

/** Temps de lecture approximatif, à 220 mots/minute. */
export const readingTime = (words: number) => Math.max(1, Math.round(words / 220))
