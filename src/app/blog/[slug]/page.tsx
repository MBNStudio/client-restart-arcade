import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { blogPosts, findPost, readingTime } from '@/data/blog'
import { blogImage } from '@/data/images'
import { Check } from 'lucide-react'
import { FinalCta, JsonLd, Section } from '@/components/ui'
import { ArticleRows, Block, Frame, PageHero, SectionHeading, BriefPoints } from '@/components/kit'
import { site } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const p = findPost(slug)
  if (!p) return {}
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/blog/${p.slug}/` },
    openGraph: {
      type: 'article',
      title: p.title,
      description: p.description,
      publishedTime: p.date,
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const post = findPost(slug)
  if (!post) notFound()

  const related = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3)
  const fallback = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3)
  const suggestions = related.length ? related : fallback

  // Le sommaire est construit à partir des h2 réellement présents,
  // pas d'une liste maintenue à la main qui finirait par diverger.
  const toc = post.blocks
    .filter((b): b is { type: 'h2'; text: string } => b.type === 'h2')
    .map((b) => ({ text: b.text, id: slugify(b.text) }))

  return (
    <>
      <PageHero
        crumbs={[
          { href: '/blog/', label: 'Blog' },
          { href: `/blog/${post.slug}/`, label: post.title },
        ]}
        title={post.title}
        visual={
          <Frame>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={blogImage(post.slug)}
              alt=""
              fetchPriority="high"
              className="aspect-[16/9] w-full object-cover"
            />
          </Frame>
        }
        briefLabel={post.category}
        brief={
          <BriefPoints
            items={[
              post.description,
              `Thème : ${post.category}`,
              <>
                Publié le{' '}
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
                , {readingTime(post.words)} min de lecture
              </>,
            ]}
          />
        }
        primary={{ href: '/contact/', label: 'Un projet ? Demander un devis' }}
        secondary={null}
      />


      <Section className="pt-6 md:pt-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_16rem]">
          <article className="max-w-3xl">
            {post.blocks.map((b, i) => {
              if (b.type === 'h2')
                return (
                  <h2
                    key={i}
                    id={slugify(b.text)}
                    className="mt-12 scroll-mt-28 font-serif text-2xl font-medium tracking-tight first:mt-0 sm:text-3xl"
                  >
                    {b.text}
                  </h2>
                )
              if (b.type === 'h3')
                return (
                  <h3 key={i} className="mt-8 font-serif text-xl">
                    {b.text}
                  </h3>
                )
              if (b.type === 'list')
                return (
                  <ul key={i} className="mt-5 space-y-2.5">
                    {b.items.map((it) => (
                      <li key={it} className="flex gap-3 text-ink-soft">
                        <Check className="mt-1 size-4 shrink-0 text-accent" strokeWidth={2.5} aria-hidden="true" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                )
              return (
                <p key={i} className="mt-5 leading-relaxed text-ink-soft">
                  {b.text}
                </p>
              )
            })}

            <div className="card-brand mt-14 rounded-2xl p-7 sm:p-9">
              <h2 className="font-serif text-2xl font-medium text-white">
                Un projet d&apos;aménagement en tête ?
              </h2>
              <p className="mt-2 text-sm text-amber-200/80">
                Devis gratuit, sans engagement, y compris si votre idée est encore
                floue.
              </p>
              <Link
                href="/contact/"
                className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-white px-5 text-sm font-medium text-heading transition hover:bg-amber-50"
              >
                Demander un devis
              </Link>
            </div>
          </article>

          {toc.length > 2 && (
            <aside className="order-first lg:order-last">
              <nav
                aria-label="Sommaire de l'article"
                className="card-paper rounded-2xl p-5 lg:sticky lg:top-28"
              >
                <h2 className="font-serif text-base font-medium tracking-tight">Sommaire</h2>
                <ol className="mt-4 space-y-2.5">
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a
                        href={`#${t.id}`}
                        className="text-sm text-ink-soft transition hover:text-heading"
                      >
                        {t.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          )}
        </div>
      </Section>

      <Block band>
        <SectionHeading title="À lire ensuite" subtitle="D'autres guides sur le même sujet." />
        <ArticleRows posts={suggestions} />
      </Block>

      <FinalCta
        title="Un projet d'aménagement en tête ?"
        subtitle="Devis gratuit, sans engagement, y compris si votre idée est encore floue."
      />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.date,
          wordCount: post.words,
          articleSection: post.category,
          inLanguage: 'fr-FR',
          url: `${site.url}/blog/${post.slug}/`,
          mainEntityOfPage: { '@type': 'WebPage', '@id': `${site.url}/blog/${post.slug}/` },
          author: { '@id': `${site.url}/#organization` },
          publisher: { '@id': `${site.url}/#organization` },
          isPartOf: { '@id': `${site.url}/blog/#blog` },
        }}
      />
    </>
  )
}

function slugify(s: string) {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)
}
