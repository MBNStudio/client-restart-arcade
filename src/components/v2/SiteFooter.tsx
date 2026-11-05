'use client'

import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { site } from '@/lib/site'
import { contactClick, ctaClick } from '@/lib/analytics'
import { espacesV2, espaceV2, produitsHref } from '@/data/v2/espaces'
import { useEspace } from '@/lib/v2/useEspace'
import { Brand } from './Brand'

const reseaux = [
  { nom: 'Instagram', url: site.socials.instagram },
  { nom: 'Facebook', url: site.socials.facebook },
  { nom: 'LinkedIn', url: site.socials.linkedin },
]

const legal = [
  { href: '/mentions-legales/', label: 'Mentions légales' },
  { href: '/cgv/', label: 'CGV' },
  { href: '/rgpd/', label: 'Confidentialité' },
  { href: '/politique-de-cookies/', label: 'Cookies' },
]

/**
 * Pied de page de la version Atelier (« notre préféré », mail du 5 novembre) :
 * « Parlons de votre projet », colonnes Contact et Le site, réseaux, logo, mentions.
 * La colonne « Le site » suit le menu de l'espace. Le bloc NAP doit rester identique
 * au schema LocalBusiness du layout.
 */
export function SiteFooter() {
  const espace = useEspace()
  const e = espace ? espaceV2(espace) : null
  const annee = new Date().getFullYear()
  const siteLinks = e
    ? [{ label: 'Accueil', href: e.path }, { label: 'Produits', href: produitsHref(e.id) }, ...e.nav]
    : [
        { label: 'Accueil', href: '/' },
        { label: 'Réalisations', href: '/realisations/' },
        { label: 'Qui sommes-nous', href: '/qui-sommes-nous/' },
        { label: 'Blog', href: '/blog/' },
        { label: 'Contact', href: '/contact/' },
      ]

  return (
    <>
      <footer className="v-dark relative overflow-hidden pb-28 pt-24 md:pb-10 lg:pt-32">
        <div className="v-wrap">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-6" data-reveal>
              <p className="v-eyebrow">Un projet ?</p>
              <h2 className="v-display v-h2 mt-6">
                Parlons de votre <em>projet</em>.
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-v-on-dark-soft">
                {e?.id === 'particulier'
                  ? 'Une salle de jeux à aménager, une borne à personnaliser ? Écrivez-nous ou appelez-nous : on vous conseille sur le modèle, les finitions et la livraison.'
                  : 'Un espace de pause à animer, un bar à équiper, une salle de jeux à la maison ? Décrivez-nous votre espace : nous revenons vers vous sous 48 heures avec une proposition chiffrée.'}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/contact/" className="v-btn v-btn--light" onClick={() => ctaClick('Demander un devis', 'footer')}>
                  {e?.id === 'particulier' ? 'Nous écrire' : 'Demander un devis'}
                  <ArrowRight aria-hidden="true" />
                </Link>
                <a href={`tel:${site.phoneE164}`} className="v-btn v-btn--line" onClick={() => contactClick('phone', 'footer')}>
                  {site.phone}
                </a>
              </div>
            </div>

            <div
              className="grid grid-cols-2 gap-10 text-[0.95rem] sm:grid-cols-3 lg:col-span-6 lg:pt-4"
              data-reveal
              style={{ ['--delai' as string]: '120ms' }}
            >
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-v-dark-accent">Contact</p>
                <address className="space-y-2.5 not-italic text-v-on-dark-soft">
                  <a href={`tel:${site.phoneE164}`} className="v-link block w-fit hover:text-v-on-dark" onClick={() => contactClick('phone', 'footer')}>
                    {site.phone}
                  </a>
                  <a href={`mailto:${site.email}`} className="v-link block w-fit break-all hover:text-v-on-dark" onClick={() => contactClick('email', 'footer')}>
                    {site.email}
                  </a>
                  <span className="block pt-2">
                    {site.address.street}
                    <br />
                    {site.address.postalCode} {site.address.city}
                  </span>
                  <span className="block pt-2">Lun – Ven · 9h – 18h</span>
                </address>
              </div>
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-v-dark-accent">Le site</p>
                <ul className="space-y-2.5 text-v-on-dark-soft">
                  {siteLinks.map((l) => (
                    <li key={l.href + l.label}>
                      <Link href={l.href} className="v-link hover:text-v-on-dark">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-v-dark-accent">Nos espaces</p>
                <ul className="space-y-2.5 text-v-on-dark-soft">
                  {espacesV2.map((x) => (
                    <li key={x.id}>
                      <Link href={x.path} className="v-link hover:text-v-on-dark">
                        {x.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="mb-4 mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-v-dark-accent">Suivez-nous</p>
                <ul className="flex flex-wrap gap-x-4 gap-y-2 text-v-on-dark-soft">
                  {reseaux.map((r) => (
                    <li key={r.nom}>
                      <a href={r.url} className="v-link hover:text-v-on-dark" target="_blank" rel="noopener noreferrer me">
                        {r.nom}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-20 border-b border-v-dark-line pb-8 lg:mt-24">
            <Link href={e ? e.path : '/'} aria-label={`${site.name}, ${site.tagline.toLowerCase()}`}>
              <Brand />
            </Link>
          </div>

          <div className="mt-8 flex flex-col gap-3 text-sm text-v-on-dark-soft/70 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {annee} {site.name} · {site.tagline} à {site.address.city} (Isère) · Exploité par {site.company.name}
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="v-link hover:text-v-on-dark">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>

      {/* Barre d'action fixe sur mobile */}
      <div className="fixed inset-x-3 bottom-3 z-30 flex gap-2 rounded-full bg-v-dark/90 p-1.5 shadow-2xl backdrop-blur-md md:hidden">
        <a
          href={`tel:${site.phoneE164}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-v-on-dark"
          onClick={() => contactClick('phone', 'barre-mobile')}
        >
          <Phone className="size-4" aria-hidden="true" />
          Appeler
        </a>
        <Link href="/contact/" className="flex flex-1 items-center justify-center rounded-full bg-v-dark-accent py-3 text-sm font-semibold text-v-dark">
          Demander un devis
        </Link>
      </div>
    </>
  )
}
