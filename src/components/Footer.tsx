'use client'

import Link from 'next/link'
import { logo } from '@/data/images'
import { site } from '@/lib/site'
import { contactClick, ctaClick } from '@/lib/analytics'
import { horairesCourts, lienDevis, navigation } from '@/components/atelier/nav'

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
 * Pied de page de la version Atelier, repris d'ab-agencement.com : appel « Un projet ? »
 * sur fond encre, colonnes Contact et Le site, grand logo, mentions ; sur mobile, une
 * barre d'action fixe (Appeler, Demander un devis).
 * Le bloc NAP doit rester strictement identique au schema LocalBusiness du layout.
 */
export function Footer() {
  const annee = new Date().getFullYear()
  return (
    <>
      <footer className="sur-sombre relative overflow-hidden bg-encre pt-24 pb-28 text-lin md:pb-10 lg:pt-32">
        <div className="conteneur">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7" data-reveal>
              <p className="surtitre !text-chene">Un projet ?</p>
              <h2 className="titre-l mt-6">
                Parlons de votre <em>projet</em>.
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-lin/70">
                Un espace de pause à animer, un bar à équiper, une salle de jeux à la maison ? Décrivez-nous votre
                espace : nous revenons vers vous sous 48 heures avec une proposition chiffrée.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href={lienDevis} className="btn btn-clair" onClick={() => ctaClick('Demander un devis', 'footer')}>
                  Demander un devis
                  <svg className="fleche" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
                <a href={`tel:${site.phoneE164}`} className="btn btn-contour-clair" onClick={() => contactClick('phone', 'footer')}>
                  {site.phone}
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10 text-[0.95rem] lg:col-span-5 lg:pt-4" data-reveal style={{ '--delai': '120ms' } as React.CSSProperties}>
              <div>
                <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-chene uppercase">Contact</p>
                <address className="space-y-2.5 not-italic text-lin/75">
                  <a href={`tel:${site.phoneE164}`} className="lien-souligne block w-fit hover:text-lin" onClick={() => contactClick('phone', 'footer')}>
                    {site.phone}
                  </a>
                  <a href={`mailto:${site.email}`} className="lien-souligne block w-fit break-all hover:text-lin" onClick={() => contactClick('email', 'footer')}>
                    {site.email}
                  </a>
                  <span className="block pt-2">
                    {site.address.street}
                    <br />
                    {site.address.postalCode} {site.address.city}
                  </span>
                  <span className="block pt-2">{horairesCourts}</span>
                </address>
              </div>
              <div>
                <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-chene uppercase">Le site</p>
                <ul className="space-y-2.5 text-lin/75">
                  <li>
                    <Link href="/" className="lien-souligne hover:text-lin">
                      Accueil
                    </Link>
                  </li>
                  {navigation.map((l) => (
                    <li key={l.libelle}>
                      <Link href={l.href} className="lien-souligne hover:text-lin">
                        {l.libelle}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/blog/" className="lien-souligne hover:text-lin">
                      Blog
                    </Link>
                  </li>
                </ul>
                <p className="mt-8 mb-4 text-xs font-semibold tracking-[0.2em] text-chene uppercase">Suivez-nous</p>
                <ul className="flex flex-wrap gap-x-4 gap-y-2 text-lin/75">
                  {reseaux.map((r) => (
                    <li key={r.nom}>
                      <a href={r.url} className="lien-souligne hover:text-lin" target="_blank" rel="noopener noreferrer me">
                        {r.nom}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-24 border-b border-lin/10 pb-10 lg:mt-32">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo}
              alt={`${site.name}, ${site.tagline.toLowerCase()}`}
              width={1350}
              height={495}
              loading="lazy"
              className="h-auto w-full max-w-[22rem] lg:max-w-[28rem]"
            />
          </div>

          <div className="mt-8 flex flex-col gap-3 text-sm text-lin/50 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {annee} {site.name} · {site.tagline} à {site.address.city} (Isère) · Exploité par {site.company.name}
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="lien-souligne hover:text-lin">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>

      {/* Barre d'action fixe sur mobile */}
      <div className="barre-mobile fixed inset-x-3 bottom-3 z-30 flex gap-2 rounded-full bg-noyer/90 p-1.5 shadow-2xl shadow-noyer/30 backdrop-blur-md md:hidden">
        <a
          href={`tel:${site.phoneE164}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-lin"
          onClick={() => contactClick('phone', 'barre-mobile')}
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
          </svg>
          Appeler
        </a>
        <Link href={lienDevis} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-chene py-3 text-sm font-semibold text-encre">
          Demander un devis
        </Link>
      </div>
    </>
  )
}
