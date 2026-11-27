import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Audience } from '@/data/catalogue'
import { blogPosts, postsFor, readingTime } from '@/data/blog'
import { blogImage } from '@/data/images'
import { espaceHref, espaceV2 } from '@/data/v2/espaces'
import { Breadcrumbs, JsonLd } from '@/components/ui'
import { site } from '@/lib/site'
import { delai } from './sections'

const titles: Record<Audience, { title: string; description: string; h1: string; accent: string; intro: string }> = {
  'bar-commerce': {
    title: 'Actualité : animer votre bar, restaurant ou commerce',
    description:
      "Nos articles pour les bars, restaurants, campings, hôtels et commerces : fidéliser les clients, prolonger leur passage, animer les soirées avec des jeux d'arcade, des fléchettes ou un baby-foot.",
    h1: 'Animer votre établissement,',
    accent: 'nos conseils',
    intro: 'Fidélisation, soirées, hôtellerie de plein air : ce que les jeux changent dans un lieu ouvert au public.',
  },
  entreprise: {
    title: 'Actualité : salles de pause, bien-être et cohésion d’équipe',
    description:
      "Nos articles pour les entreprises : qualité de vie et conditions de travail, cohésion d'équipe, événements internes et aménagement des salles de pause avec des jeux d'arcade et des babyfoots.",
    h1: 'Des équipes qui se retrouvent,',
    accent: 'nos conseils',
    intro: "QVCT, fidélisation des talents, événements internes : le rôle du jeu dans la vie d'une entreprise.",
  },
  particulier: {
    title: 'Actualité : borne d’arcade, baby-foot et jeux à la maison',
    description:
      "Les articles RESTART pour les particuliers : choisir sa borne d'arcade, son baby-foot ou ses fléchettes, aménager sa salle de jeux et personnaliser son jeu.",
    h1: "L'arcade à la maison,",
    accent: 'nos conseils',
    intro: 'Choisir et personnaliser son jeu : nos premiers articles pour les particuliers arrivent.',
  },
}

const fmt = (d: string) => new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

export const actualiteMetadata = (id: Audience): Metadata => ({
  title: titles[id].title,
  description: titles[id].description,
  alternates: { canonical: espaceHref(id, 'actualite/') },
})

/**
 * Rubrique « Actualité » d'un univers : les articles qui s'adressent à cette cible (champ `audiences` de
 * data/blog.ts). Chaque article garde une seule adresse, `/blog/<slug>/`, pour ne pas créer de doublon.
 */
export function ActualiteView({ id }: { id: Audience }) {
  const e = espaceV2(id)
  const t = titles[id]
  const posts = postsFor(id)
  const url = `${site.url}${espaceHref(id, 'actualite/')}`

  return (
    <>
      <section className="pb-12 pt-6 lg:pb-16">
        <div className="v-wrap">
          <Breadcrumbs
            items={[
              { href: e.path, label: e.label },
              { href: espaceHref(id, 'actualite/'), label: 'Actualité' },
            ]}
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="v-eyebrow v-appear">Actualité</p>
              <h1 className="v-display v-h1 mt-6">
                <span className="v-line">
                  <span style={delai(150)}>{t.h1}</span>
                </span>
                <span className="v-line">
                  <span style={delai(260)}>
                    <em>{t.accent}</em>.
                  </span>
                </span>
              </h1>
            </div>
            <p className="v-lead v-appear flex flex-col justify-end lg:col-span-4" style={delai(400)}>
              {t.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="v-wrap">
          {posts.length > 0 ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p, i) => (
                <li key={p.slug} data-reveal="image" style={delai((i % 3) * 80)}>
                  <Link
                    href={`/blog/${p.slug}/`}
                    className="group flex h-full flex-col overflow-hidden border border-v-line bg-v-surface"
                    style={{ borderRadius: 'var(--v-radius)' }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={blogImage(p.slug)} alt="" loading="lazy" className="aspect-[3/2] w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                    <span className="flex flex-1 flex-col p-5">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-v-accent">{p.category}</span>
                      <span className="mt-2 text-lg font-semibold leading-snug">{p.title}</span>
                      <span className="mt-2 flex-1 text-[14px] leading-snug text-v-soft">{p.description}</span>
                      <span className="mt-4 text-xs text-v-soft">
                        <time dateTime={p.date}>{fmt(p.date)}</time> · {readingTime(p.words)} min
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="max-w-xl text-v-soft">
              Les premiers articles de cette rubrique arrivent bientôt. En attendant, retrouvez tous nos articles.
            </p>
          )}
          <div className="mt-12">
            <Link href="/blog/" className="v-btn v-btn--line">
              Tous les articles ({blogPosts.length}) <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          '@id': `${url}#page`,
          name: t.title,
          url,
          inLanguage: 'fr-FR',
          isPartOf: { '@id': `${site.url}/#website` },
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: posts.map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: `${site.url}/blog/${p.slug}/`,
              name: p.title,
            })),
          },
        }}
      />
    </>
  )
}
