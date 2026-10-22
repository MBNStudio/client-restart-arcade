import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Analytics } from '@/components/Analytics'
import { ConsentBanner } from '@/components/ConsentBanner'
import { JsonLd } from '@/components/ui'
import { site } from '@/lib/site'

import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { fontVariables } from '@/lib/fonts'
import { CUSTOM_STORAGE_KEY, DEFAULT_THEME, THEME_STORAGE_KEY, themes } from '@/lib/themes'
import { VersionSwitch } from '@/components/VersionSwitch'
import { DEFAULT_VERSION, VERSION_SCHEMES, VERSION_STORAGE_KEY, versions } from '@/lib/version'

/**
 * Applique le thème choisi pendant la visite avant le premier rendu, pour éviter
 * un flash. Le choix vit en sessionStorage : chaque nouvelle visite repart sur le
 * thème par défaut (Studio doré). Même principe pour la version du site
 * (`?version=cinema` la force). Les anciens choix permanents sont effacés. Les valeurs viennent de nos données, jamais d'une saisie.
 */
const themeBootScript = `(function(){try{
var d=document.documentElement,K=${JSON.stringify(THEME_STORAGE_KEY)},C=${JSON.stringify(CUSTOM_STORAGE_KEY)};
var m=${JSON.stringify(Object.fromEntries(themes.map((t) => [t.id, t.scheme])))};
var q=new URLSearchParams(location.search).get('theme');
localStorage.removeItem(K);localStorage.removeItem(C);
var S=sessionStorage;
if(q&&m[q]){S.setItem(K,q);S.removeItem(C);}
var t=S.getItem(K);
if(t&&m[t]){d.dataset.theme=t;d.dataset.scheme=m[t];}
var V=${JSON.stringify(VERSION_STORAGE_KEY)},vs=${JSON.stringify(versions.map((v) => v.id))};
var qv=new URLSearchParams(location.search).get('version');
if(qv&&vs.indexOf(qv)>-1)S.setItem(V,qv);
var v=S.getItem(V);if(v&&vs.indexOf(v)>-1)d.dataset.version=v;
var vsc=${JSON.stringify(VERSION_SCHEMES)};
var c=S.getItem(C);
if(c){c=JSON.parse(c);for(var k in c.vars)d.style.setProperty(k,c.vars[k]);d.dataset.scheme=c.scheme;d.dataset.custom='true';}
if(vsc[d.dataset.version])d.dataset.scheme=vsc[d.dataset.version];
}catch(e){}})();`

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
  themeColor: '#f6f6f5',
  colorScheme: 'light',
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
      className={fontVariables}
      data-theme={DEFAULT_THEME}
      data-version={DEFAULT_VERSION}
      data-scheme={themes.find((t) => t.id === DEFAULT_THEME)!.scheme}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <JsonLd data={organizationSchema} />
      </head>
      <body>
        <Analytics />
        <div className="flex min-h-screen flex-col">
          <div className="site-chrome">
            <Header />
          </div>
          <main id="contenu" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <ConsentBanner />
        <div className="site-chrome">
          <ThemeSwitcher />
        </div>
        {/* Toujours visible, même sur l'accueil Panorama : on passe d'une version à l'autre partout. */}
        <VersionSwitch />
      </body>
    </html>
  )
}
