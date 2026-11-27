import type { Metadata } from 'next'
import Link from 'next/link'
import { blogPosts, readingTime } from '@/data/blog'
import { blogImage } from '@/data/images'
import { FinalCta, JsonLd } from '@/components/ui'
import { Block, Frame, PageHero, SectionHeading, BriefPoints } from '@/components/kit'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Blog : aménagement, QVCT, bars et expérience client',
  description:
    "Nos articles sur l'aménagement d'espaces conviviaux : bien-être au travail, animation de bar et de restaurant, expérience client en hôtellerie et cohésion d'équipe.",
  alternates: { canonical: '/blog/' },
}

const fmt = (d: string) =>
  new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

export default function BlogPage() {
  const [lead, ...rest] = blogPosts

  return (
    <>
      <PageHero
        crumbs={[{ href: '/blog/', label: 'Blog' }]}
        title="Ce qu'on apprend en aménageant des espaces"
        visual={
          <Frame>
            <Link href={`/blog/${lead.slug}/`} className="group block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={blogImage(lead.slug)}
                alt=""
                fetchPriority="high"
                className="aspect-[16/8] w-full object-cover"
              />
              <span className="block p-6">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-accent">
                  À la une · {lead.category}
                </span>
                <span className="mt-2 block font-serif text-2xl font-medium leading-tight tracking-tight text-heading group-hover:underline">
                  {lead.title}
                </span>
                <span className="mt-2 block text-sm text-muted-foreground">{lead.description}</span>
              </span>
            </Link>
          </Frame>
        }
        brief={
          <BriefPoints
            items={[
              `${blogPosts.length} articles, un nouveau chaque mois`,
              'Bien-être au travail et cohésion d’équipe',
              'Animation des bars, restaurants et clubs',
              'Hôtellerie, campings et expérience client',
            ]}
          />
        }
        primary={{ href: `/blog/${lead.slug}/`, label: "Lire l'article à la une" }}
        secondary={{ href: '/contact/', label: 'Un projet ?' }}
      />

      <Block>
        <SectionHeading title="Tous les articles" />
        <div className="cards-dim mt-12 center-grid [--cols:3]">
          {rest.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}/`} className="card flex flex-col overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={blogImage(p.slug)}
                alt=""
                loading="lazy"
                className="aspect-[3/2] w-full border-b border-border object-cover"
              />
              <div className="flex flex-1 flex-col p-5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-accent">
                  {p.category}
                </span>
                <h2 className="mt-2 font-serif text-lg font-medium leading-snug tracking-tight">
                  {p.title}
                </h2>
                <p className="mt-2 flex-1 text-[13px] leading-snug text-foreground/65">
                  {p.description}
                </p>
                <p className="mt-4 text-xs text-muted-foreground">
                  <time dateTime={p.date}>{fmt(p.date)}</time> · {readingTime(p.words)} min
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Block>

      <FinalCta
        title="Un projet d'aménagement en tête ?"
        subtitle="Devis gratuit, sans engagement, y compris si votre idée est encore floue."
      />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          '@id': `${site.url}/blog/#blog`,
          name: 'Le blog RESTART',
          url: `${site.url}/blog/`,
          publisher: { '@id': `${site.url}/#organization` },
          blogPost: blogPosts.map((p) => ({
            '@type': 'BlogPosting',
            headline: p.title,
            datePublished: p.date,
            url: `${site.url}/blog/${p.slug}/`,
          })),
        }}
      />
    </>
  )
}
