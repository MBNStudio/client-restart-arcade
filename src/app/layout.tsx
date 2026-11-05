import type { Metadata } from 'next'
import './globals.css'
import { SiteHeader } from '@/components/v2/SiteHeader'
import { SiteFooter } from '@/components/v2/SiteFooter'
import { ThemePicker } from '@/components/v2/ThemePicker'
import { Reveal } from '@/components/v2/Reveal'
import { v2FontVariables } from '@/lib/v2/fonts'
import { v2ThemeBootScript } from '@/lib/v2/themes'
import { Analytics } from '@/components/Analytics'
import { ConsentBanner } from '@/components/ConsentBanner'
import { JsonLd } from '@/components/ui'
import { site } from '@/lib/site'

import { fontVariables } from '@/lib/fonts'
import { EspaceChooser } from '@/components/EspaceChooser'
import { espaceBootScript } from '@/lib/espace'

/**
 * V2 (retours de RESTART du 5 novembre 2026) : un site général en une page et trois
 * sites par public, six thèmes au choix. Les scripts du <head> posent le thème choisi
 * et renvoient la visite qui revient sur l'accueil général vers l'accueil de l'espace
 * choisi (voir lib/espace.ts), avant le premier rendu.
 */
const bootScript =
  "document.documentElement.classList.add('js');" +
  v2ThemeBootScript() +
  espaceBootScript(process.env.NEXT_PUBLIC_BASE_PATH ?? '')

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "RESTART : bornes d'arcade, fléchettes et baby-foot personnalisés",
    template: '%s | RESTART',
  },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: site.locale,
    siteName: site.name,
    url: site.url,
    title: "RESTART : bornes d'arcade, fléchettes et baby-foot personnalisés",
    description: site.description,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  category: 'Loisirs et aménagement',
}

export const viewport = {
  themeColor: '#16100b',
}

/**
 * Identité de l'organisation + établissement local.
 * Le NAP doit rester strictement aligné sur celui du footer et de la page contact :
 * une divergence entre schema et texte visible affaiblit le signal local.
 */
const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      description: site.description,
      email: site.email,
      telephone: site.phoneE164,
      sameAs: [site.socials.facebook, site.socials.instagram, site.socials.linkedin],
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${site.url}/#localbusiness`,
      name: site.name,
      parentOrganization: { '@id': `${site.url}/#organization` },
      url: site.url,
      telephone: site.phoneE164,
      email: site.email,
      priceRange: '€€',
      currenciesAccepted: 'EUR',
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.address.street,
        postalCode: site.address.postalCode,
        addressLocality: site.address.city,
        addressRegion: site.address.region,
        addressCountry: site.address.country,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: site.address.lat,
        longitude: site.address.lng,
      },
      areaServed: site.areaServed.map((n) => ({ '@type': 'Place', name: n })),
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      url: site.url,
      name: site.name,
      inLanguage: 'fr-FR',
      publisher: { '@id': `${site.url}/#organization` },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${fontVariables} ${v2FontVariables}`}
      data-theme="atelier"
      data-version="v2"
      data-scheme="light"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <JsonLd data={organizationSchema} />
      </head>
      <body>
        <Analytics />
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main id="contenu" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
        <ConsentBanner />
        <EspaceChooser />
        <ThemePicker />
        <Reveal />
      </body>
    </html>
  )
}
