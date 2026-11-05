import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, ArrowUpRight, Check, CreditCard, Phone, Truck } from 'lucide-react'
import { allModels, findModel, findUnivers, formatPrice, type Audience, type ListedModel, type Univers } from '@/data/catalogue'
import { productImage, productImages } from '@/data/images'
import { espaceV2, produitsHref } from '@/data/v2/espaces'
import { ProductGallery } from '@/components/ProductGallery'
import { ViewItem } from '@/components/ViewItem'
import { Breadcrumbs, JsonLd } from '@/components/ui'
import { site } from '@/lib/site'
import { DesignCarousel, type DesignSlide } from './DesignCarousel'
import { FaqCta, GammeMosaic, SectionHead, delai, priceFrom, situation, situationAlt } from './sections'

/*
 * Pages produits, déclinées pour chacun des trois sites (mail du 5 novembre :
 * « tout faire en x3 »). Chaque espace a son catalogue, ses gammes et ses fiches,
 * avec le texte, les arguments et les modèles de son public. Le site particuliers
 * est le site e-commerce : prix en avant et bouton d'achat vers la boutique, qui
 * reste gérée à part. Les sites entreprise et bar & commerce sont des vitrines :
 * devis et location.
 */

/** La boutique en ligne est gérée à part : les boutons d'achat y mènent (adresse à confirmer après la migration du domaine). */
const SHOP_BASE = 'https://restart-arcade.fr/produit/'
const shopSlug: Record<string, string> = { 'r-twin': 'rborne-arcade-cocktail-twin' }
export const shopUrl = (modelSlug: string) => `${SHOP_BASE}${shopSlug[modelSlug] ?? modelSlug}/`

const forWho: Record<Audience, string> = {
  'bar-commerce': 'bars et commerces',
  entreprise: 'entreprises',
  particulier: 'la maison',
}

const modelsOf = (id: Audience, u: Univers) =>
  allModels.filter((m) => m.universSlug === u.slug && m.audiences.includes(id))

/** Univers vendus à cet espace, sinon 404. */
function universFor(id: Audience, slug: string) {
  const e = espaceV2(id)
  const u = findUnivers(slug)
  if (!u || !e.univers.includes(slug)) return null
  return u
}

const pay4 = (price: number) => formatPrice(Math.round((price / 4) * 100) / 100)

/* ------------------------------------------------------------------ */
/* Paramètres et métadonnées                                           */
/* ------------------------------------------------------------------ */

export const universParams = (id: Audience) => espaceV2(id).univers.map((univers) => ({ univers }))

export const modeleParams = (id: Audience) =>
  espaceV2(id).univers.flatMap((u) => modelsOf(id, findUnivers(u)!).map((m) => ({ univers: u, modele: m.slug })))

export function catalogueMetadata(id: Audience): Metadata {
  const e = espaceV2(id)
  const title =
    id === 'particulier'
      ? "Bornes d'arcade, baby-foot et fléchettes pour la maison : prix et modèles"
      : `Équipements de jeu pour ${forWho[id]} : bornes, fléchettes, baby-foot, billards`
  const description =
    id === 'particulier'
      ? "Tous les jeux RESTART pour la maison, avec leur prix : bornes d'arcade dès 899 €, baby-foot, fléchettes électroniques et fauteuils massants. Livrés montés, paiement en 2x, 3x ou 4x."
      : `Le catalogue RESTART pour les ${forWho[id]} : ${e.univers.map((s) => findUnivers(s)!.navLabel.toLowerCase()).join(', ')}. Achat ou location longue durée, personnalisation, livraison et installation partout en France.`
  return { title, description, alternates: { canonical: produitsHref(id) } }
}

export function universMetadata(id: Audience, slug: string): Metadata {
  const u = universFor(id, slug)
  if (!u) return {}
  const models = modelsOf(id, u)
  const title = `${u.navLabel} pour ${forWho[id]}${models.length ? ` : ${models.length} modèle${models.length > 1 ? 's' : ''}, ${priceFrom(slug, id)}` : ', sur devis'}`
  const description = `${u.intro} ${u.benefits[id][0]}.`
  return { title, description, alternates: { canonical: produitsHref(id, slug) } }
}

export function modeleMetadata(id: Audience, univers: string, modele: string): Metadata {
  const u = universFor(id, univers)
  const m = findModel(univers, modele)
  if (!u || !m || !m.audiences.includes(id)) return {}
  const price = m.price != null ? formatPrice(m.price) : 'sur devis'
  const title = `${m.name} pour ${forWho[id]} : ${m.headline.toLowerCase()}`
  const description =
    id === 'particulier'
      ? `${m.name}, ${m.headline.toLowerCase()} : ${price}, livré monté chez vous, paiement en 2x, 3x ou 4x. ${m.specs.slice(0, 2).join(', ')}.`
      : `${m.name} pour ${forWho[id]} : ${m.headline.toLowerCase()}. Achat (${price}) ou location longue durée, personnalisation, installation partout en France.`
  return { title, description, alternates: { canonical: produitsHref(id, univers, modele) } }
}

/* ------------------------------------------------------------------ */
/* Briques                                                             */
/* ------------------------------------------------------------------ */

function PageIntro({
  crumbs,
  eyebrow,
  title,
  text,
  image,
  alt,
  children,
}: {
  crumbs: { href: string; label: string }[]
  eyebrow: string
  title: React.ReactNode
  text: string
  image: string
  alt: string
  children?: React.ReactNode
}) {
  return (
    <section className="pb-16 pt-6 lg:pb-24">
      <div className="v-wrap">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <p className="v-eyebrow v-appear">{eyebrow}</p>
            <h1 className="v-display v-h1 mt-6 !text-[clamp(2.4rem,5vw,4.4rem)]">{title}</h1>
            <p className="v-lead v-appear mt-6 max-w-xl" style={delai(200)}>
              {text}
            </p>
            {children}
          </div>
          <div className="lg:col-span-6">
            <div className="v-photo aspect-[4/3]" data-reveal="image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt={alt} fetchPriority="high" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ModelCard({ id, m, i }: { id: Audience; m: ListedModel; i: number }) {
  const shop = id === 'particulier'
  return (
    <li className="v-card group" data-reveal style={delai(i * 80)}>
      <div className="relative aspect-[4/3] bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={productImage(m.slug)} alt={`${m.name}, ${m.universName} RESTART`} loading="lazy" className="size-full object-contain p-5 transition duration-700 group-hover:scale-[1.04]" />
        {m.highlight && (
          <span className="absolute left-4 top-4 rounded-full bg-v-btn px-3 py-1 text-[11.5px] font-semibold text-v-btn-ink">{m.highlight}</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-v-accent">{m.universName}</p>
        <h3 className="v-display mt-2 text-[1.5rem] leading-tight">
          <Link href={produitsHref(id, m.universSlug, m.slug)} className="after:absolute after:inset-0 after:content-['']">
            {m.name}
          </Link>
        </h3>
        <p className="mt-2 text-[14px] leading-relaxed text-v-soft">{m.headline}</p>
        <ul className="mt-4 flex flex-col gap-1.5 text-[13px]">
          {m.specs.slice(0, 3).map((s) => (
            <li key={s} className="flex items-start gap-2">
              <span className="v-tick">
                <Check className="size-3" strokeWidth={3} aria-hidden="true" />
              </span>
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-end justify-between gap-3 pt-6">
          {shop ? (
            <p>
              <span className="v-display block text-[1.6rem] leading-none">{m.price != null ? formatPrice(m.price) : 'Sur devis'}</span>
              {m.price != null && <span className="mt-1 block text-[12px] text-v-soft">ou 4 × {pay4(m.price)}</span>}
            </p>
          ) : (
            <p className="text-[13px] text-v-soft">
              Achat {m.price != null ? `dès ${formatPrice(m.price)}` : 'sur devis'}
              <br />
              ou location longue durée
            </p>
          )}
          <span aria-hidden="true" className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-v-line transition group-hover:border-v-btn group-hover:bg-v-btn group-hover:text-v-btn-ink">
            <ArrowRight className="size-4" />
          </span>
        </div>
      </div>
    </li>
  )
}

function Reassurance({ id }: { id: Audience }) {
  const items =
    id === 'particulier'
      ? [
          { icon: Truck, title: 'Livré monté', text: 'Partout en France, Corse comprise' },
          { icon: CreditCard, title: 'En 2x, 3x ou 4x', text: 'Paiement en plusieurs fois' },
          { icon: Check, title: "Jusqu'à 3 ans", text: 'De garantie, une ligne directe' },
        ]
      : [
          { icon: Truck, title: 'Installé chez vous', text: 'Partout en France, en 2 à 3 semaines' },
          { icon: CreditCard, title: 'Achat ou location', text: 'Maintenance incluse en location' },
          { icon: Check, title: 'Devis sous 48 h', text: 'Audit de votre espace offert' },
        ]
  return (
    <ul className="mt-8 grid gap-4 border-t border-v-line pt-6 sm:grid-cols-3">
      {items.map(({ icon: Icon, title, text }) => (
        <li key={title} className="flex items-start gap-3">
          <Icon className="mt-0.5 size-4 shrink-0 text-v-accent" aria-hidden="true" />
          <span>
            <span className="block text-[14px] font-semibold">{title}</span>
            <span className="block text-[12.5px] text-v-soft">{text}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}

/** Diapositives « designs et finitions » d'une gamme : les visuels de ses modèles, puis des installations. */
function designSlides(id: Audience, u: Univers): DesignSlide[] {
  const models = modelsOf(id, u)
  const fromModels: DesignSlide[] = models.flatMap((m) =>
    productImages(m.slug)
      .slice(0, 3)
      .map((src, i) => ({ image: src, alt: `${m.name}, visuel ${i + 1}`, title: m.name, detail: m.headline, contain: true })),
  )
  const fromUnivers: DesignSlide[] = models.length
    ? []
    : productImages(u.slug).map((src, i) => ({ image: src, alt: `${u.name}, visuel ${i + 1}`, title: u.name, detail: 'Finitions et coloris sur devis', contain: true }))
  return [
    { image: situation(u.slug), alt: situationAlt[u.slug] ?? u.name, title: `${u.name} en situation`, detail: 'Chaque modèle se personnalise : covering, couleurs, logo' },
    ...fromModels,
    ...fromUnivers,
  ]
}

function MoreGammes({ id, exclude }: { id: Audience; exclude?: string }) {
  const e = espaceV2(id)
  return (
    <section className="bg-v-alt py-24 lg:py-28">
      <div className="v-wrap">
        <SectionHead
          eyebrow="Notre gamme"
          title={
            <>
              Ce que nous faisons <em>d&apos;autre</em>
            </>
          }
          action={
            <Link href={produitsHref(id)} className="v-btn v-btn--line">
              Tout le catalogue <ArrowRight aria-hidden="true" />
            </Link>
          }
        />
        <div className="mt-12">
          <GammeMosaic univers={e.univers} espace={id} exclude={exclude} />
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Pages                                                               */
/* ------------------------------------------------------------------ */

export function CatalogueView({ id }: { id: Audience }) {
  const e = espaceV2(id)
  const models = e.univers.flatMap((s) => modelsOf(id, findUnivers(s)!))
  const shop = id === 'particulier'
  return (
    <>
      <PageIntro
        crumbs={[
          { href: e.path, label: e.label },
          { href: produitsHref(id), label: 'Produits' },
        ]}
        eyebrow={`Espace ${e.label}`}
        title={
          shop ? (
            <>
              Nos jeux <em>pour la maison</em>
            </>
          ) : (
            <>
              Nos équipements pour les <em>{forWho[id]}</em>
            </>
          )
        }
        text={
          shop
            ? 'Chaque modèle affiche son prix, livraison et installation comprises. Commandez en ligne et réglez en 2, 3 ou 4 fois.'
            : "Achat ou location longue durée, personnalisés à votre image, livrés et installés partout en France. Choisissez une gamme, on s'occupe du reste."
        }
        image={e.video.poster}
        alt={e.video.alt}
      >
        <Reassurance id={id} />
      </PageIntro>

      <section className="pb-24">
        <div className="v-wrap">
          <GammeMosaic univers={e.univers} espace={id} />
        </div>
      </section>

      {models.length > 0 && (
        <section className="border-t border-v-line py-24 lg:py-28">
          <div className="v-wrap">
            <SectionHead
              eyebrow={`${models.length} modèles`}
              title={shop ? <>Tous les modèles, <em>avec leur prix</em></> : <>Les modèles <em>au catalogue</em></>}
              text={shop ? undefined : 'Billards, flippers et cocons de repos se composent sur devis, selon votre espace.'}
            />
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {models.map((m, i) => (
                <ModelCard key={m.slug} id={id} m={m} i={i % 3} />
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  )
}

export function UniversView({ id, slug }: { id: Audience; slug: string }) {
  const u = universFor(id, slug)
  if (!u) notFound()
  const e = espaceV2(id)
  const models = modelsOf(id, u)
  const shop = id === 'particulier'

  return (
    <>
      <PageIntro
        crumbs={[
          { href: e.path, label: e.label },
          { href: produitsHref(id), label: 'Produits' },
          { href: produitsHref(id, slug), label: u.name },
        ]}
        eyebrow={`${u.navLabel} · ${forWho[id]}`}
        title={u.h1}
        text={u.intro}
        image={situation(slug)}
        alt={situationAlt[slug] ?? u.name}
      >
        <ul className="mt-8 grid gap-2.5">
          {u.benefits[id].map((b) => (
            <li key={b} className="flex items-start gap-3 text-[15px]">
              <span className="v-tick mt-0.5">
                <Check className="size-3" strokeWidth={3} aria-hidden="true" />
              </span>
              {b}
            </li>
          ))}
        </ul>
        <div className="mt-9 flex flex-wrap gap-3">
          {models.length > 0 ? (
            <a href="#modeles" className="v-btn v-btn--solid">
              {shop ? 'Voir les modèles et les prix' : 'Voir les modèles'} <ArrowRight aria-hidden="true" />
            </a>
          ) : (
            <Link href={`/contact/?produit=${encodeURIComponent(u.name)}`} className="v-btn v-btn--solid">
              Demander un devis <ArrowRight aria-hidden="true" />
            </Link>
          )}
          <a href={`tel:${site.phoneE164}`} className="v-btn v-btn--line">
            <Phone aria-hidden="true" /> {site.phone}
          </a>
        </div>
      </PageIntro>

      {models.length > 0 && (
        <section id="modeles" className="border-t border-v-line py-24 lg:py-28">
          <div className="v-wrap">
            <SectionHead
              eyebrow={`${models.length} modèle${models.length > 1 ? 's' : ''}`}
              title={
                <>
                  Choisissez votre <em>{u.name.toLowerCase()}</em>
                </>
              }
              text={shop ? 'Prix TTC, livraison et installation comprises.' : 'Prix d’achat indicatifs. La location longue durée se chiffre sur devis.'}
            />
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {models.map((m, i) => (
                <ModelCard key={m.slug} id={id} m={m} i={i} />
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-v-alt py-24 lg:py-28">
        <div className="v-wrap">
          <SectionHead
            eyebrow="Designs et finitions"
            title={
              <>
                Tous les designs <em>possibles</em>
              </>
            }
            text="Covering, couleurs des boutons, T-Molding, logo : chaque équipement se personnalise. Un visuel vous est soumis avant fabrication."
          />
        </div>
        <div className="mt-12 overflow-hidden">
          <DesignCarousel slides={designSlides(id, u)} />
        </div>
      </section>

      <FaqCta
        faq={u.faq}
        cta={shop && models.length ? { href: '#modeles', label: 'Choisir mon modèle' } : { href: `/contact/?produit=${encodeURIComponent(u.name)}`, label: 'Demander un devis gratuit' }}
      />

      <MoreGammes id={id} exclude={slug} />
    </>
  )
}

export function ModeleView({ id, univers, modele }: { id: Audience; univers: string; modele: string }) {
  const u = universFor(id, univers)
  const m = findModel(univers, modele)
  if (!u || !m || !m.audiences.includes(id)) notFound()
  const e = espaceV2(id)
  const shop = id === 'particulier'
  const siblings = modelsOf(id, u).filter((x) => x.slug !== m.slug)
  const url = `${site.url}${produitsHref(id, univers, modele)}`

  return (
    <>
      <ViewItem item={{ item_id: m.sku, item_name: m.name, item_category: m.universSlug, price: m.price ?? undefined, quantity: 1 }} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: m.name,
          sku: m.sku,
          description: m.headline,
          image: productImages(m.slug).map((p) => `${site.url}${p}`),
          brand: { '@type': 'Brand', name: site.name },
          ...(m.price != null && {
            offers: {
              '@type': 'Offer',
              url,
              priceCurrency: 'EUR',
              price: m.price,
              availability: 'https://schema.org/InStock',
              seller: { '@id': `${site.url}/#organization` },
            },
          }),
        }}
      />

      <section className="pb-20 pt-6 lg:pb-28">
        <div className="v-wrap">
          <Breadcrumbs
            items={[
              { href: e.path, label: e.label },
              { href: produitsHref(id), label: 'Produits' },
              { href: produitsHref(id, univers), label: u.name },
              { href: produitsHref(id, univers, modele), label: m.name },
            ]}
          />
          <div className="mt-8 grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <div className="v-card overflow-hidden bg-white hover:!transform-none">
                <ProductGallery images={productImages(m.slug)} alt={`${m.name}, ${u.name} RESTART`} badge={m.highlight} bare />
              </div>
            </div>
            <div className="lg:sticky lg:top-28 lg:col-span-5">
              <p className="v-eyebrow">{u.name}</p>
              <h1 className="v-display mt-5 text-[clamp(2.4rem,4.6vw,3.8rem)] leading-[1.02]">{m.name}</h1>
              <p className="mt-3 text-lg text-v-soft">{m.headline}</p>

              <div className="mt-8 border-y border-v-line py-6">
                {shop ? (
                  <>
                    <p className="v-display text-[2.6rem] leading-none">{m.price != null ? formatPrice(m.price) : 'Sur devis'}</p>
                    {m.price != null && (
                      <p className="mt-2 text-[14px] text-v-soft">
                        TTC, livraison et installation comprises · ou 4 × {pay4(m.price)}
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-v-soft">Achat ou location</p>
                    <p className="v-display mt-2 text-[2rem] leading-tight">
                      {m.price != null ? <>À l&apos;achat dès {formatPrice(m.price)}</> : 'Sur devis'}
                    </p>
                    <p className="mt-2 text-[14px] text-v-soft">Location longue durée sur devis, maintenance incluse.</p>
                  </>
                )}
              </div>

              <ul className="mt-6 grid gap-2.5">
                {u.benefits[id].slice(0, 3).map((b) => (
                  <li key={b} className="flex items-start gap-3 text-[15px]">
                    <span className="v-tick mt-0.5">
                      <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                {shop && m.price != null ? (
                  <>
                    <a href={shopUrl(m.slug)} className="v-btn v-btn--solid" rel="noopener">
                      Acheter sur la boutique <ArrowUpRight aria-hidden="true" />
                    </a>
                    <Link href={`/contact/?produit=${encodeURIComponent(m.sku)}`} className="v-btn v-btn--line">
                      Le personnaliser
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href={`/contact/?produit=${encodeURIComponent(m.sku)}`} className="v-btn v-btn--solid">
                      Demander un devis <ArrowRight aria-hidden="true" />
                    </Link>
                    <a href={`tel:${site.phoneE164}`} className="v-btn v-btn--line">
                      <Phone aria-hidden="true" /> Appeler
                    </a>
                  </>
                )}
              </div>
              <Reassurance id={id} />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-v-line py-20 lg:py-24">
        <div className="v-wrap">
          <SectionHead eyebrow="Fiche technique" title="Caractéristiques" />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {m.specs.map((s, i) => (
              <li key={s} className="flex items-center gap-3 border border-v-line bg-v-surface px-5 py-4 text-[14.5px]" style={{ borderRadius: 'var(--v-radius)' }} data-reveal>
                <span className="text-[12px] font-bold tabular-nums text-v-accent">{String(i + 1).padStart(2, '0')}</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FaqCta
        faq={u.faq}
        title={
          shop ? (
            <>
              Livré monté.
              <br />
              Prêt à jouer.
            </>
          ) : undefined
        }
        text={shop ? 'Une question sur ce modèle, une personnalisation ? On vous répond sous 48 heures.' : undefined}
        cta={shop ? { href: `/contact/?produit=${encodeURIComponent(m.sku)}`, label: 'Poser une question' } : { href: `/contact/?produit=${encodeURIComponent(m.sku)}`, label: 'Demander un devis gratuit' }}
      />

      {siblings.length > 0 && (
        <section className="border-t border-v-line py-24 lg:py-28">
          <div className="v-wrap">
            <SectionHead
              eyebrow="Même gamme"
              title={
                <>
                  Les autres modèles <em>{u.name.toLowerCase()}</em>
                </>
              }
            />
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {siblings.map((s, i) => (
                <ModelCard key={s.slug} id={id} m={s} i={i} />
              ))}
            </ul>
          </div>
        </section>
      )}

      <MoreGammes id={id} exclude={univers} />
    </>
  )
}
