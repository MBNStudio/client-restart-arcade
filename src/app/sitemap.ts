import type { MetadataRoute } from 'next'
import { allModels, findUnivers } from '@/data/catalogue'
import { espacesV2, espaceHref, produitsHref } from '@/data/v2/espaces'
import { audiencePages } from '@/data/audiencePages'
import { blogPosts } from '@/data/blog'
import { site } from '@/lib/site'

export const dynamic = 'force-static'

/**
 * Sitemap généré depuis les données du site : impossible d'oublier une page
 * ou d'y laisser une URL supprimée. Les pages légales et le panier n'y figurent
 * pas, c'était l'un des signaux contradictoires relevés sur l'ancien site.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (p: string) => `${site.url}${p}`
  const now = new Date()

  const statiques: MetadataRoute.Sitemap = [
    { url: url('/'), changeFrequency: 'monthly', priority: 1, lastModified: now },
    { url: url('/contact/'), changeFrequency: 'yearly', priority: 0.9, lastModified: now },
    { url: url('/qui-sommes-nous/'), changeFrequency: 'yearly', priority: 0.6, lastModified: now },
    { url: url('/realisations/'), changeFrequency: 'monthly', priority: 0.7, lastModified: now },
    { url: url('/blog/'), changeFrequency: 'weekly', priority: 0.7, lastModified: now },
  ]

  const publics: MetadataRoute.Sitemap = audiencePages.map((p) => ({
    url: url(`/${p.slug}/`),
    changeFrequency: 'monthly',
    priority: 0.9,
    lastModified: now,
  }))

  // V2 : chaque espace a ses pages produits et son concept.
  const parEspace: MetadataRoute.Sitemap = espacesV2.flatMap((e) => [
    { url: url(produitsHref(e.id)), changeFrequency: 'monthly' as const, priority: 0.9, lastModified: now },
    { url: url(espaceHref(e.id, 'concept/')), changeFrequency: 'yearly' as const, priority: 0.6, lastModified: now },
    ...e.univers.flatMap((slug) => [
      { url: url(produitsHref(e.id, slug)), changeFrequency: 'monthly' as const, priority: 0.8, lastModified: now },
      ...allModels
        .filter((m) => m.universSlug === slug && m.audiences.includes(e.id) && findUnivers(slug))
        .map((m) => ({ url: url(produitsHref(e.id, slug, m.slug)), changeFrequency: 'monthly' as const, priority: 0.8, lastModified: now })),
    ]),
  ])

  const articles: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: url(`/blog/${p.slug}/`),
    changeFrequency: 'yearly',
    priority: 0.5,
    lastModified: new Date(p.date),
  }))

  return [...statiques, ...publics, ...parEspace, ...articles]
}
