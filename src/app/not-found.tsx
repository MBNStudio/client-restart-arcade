import Link from 'next/link'
import { espacesV2 } from '@/data/v2/espaces'
import { Section } from '@/components/ui'

export const metadata = {
  title: 'Page introuvable',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <Section className="py-24 text-center">
      <p className="font-serif text-6xl text-neon">404</p>
      <h1 className="mt-6 font-serif text-3xl">Cette page n&apos;existe pas (ou plus).</h1>
      <p className="mx-auto mt-4 max-w-lg text-ink-soft">
        Le site a été refondu : certaines anciennes adresses ont disparu. Voici les raccourcis les
        plus utiles.
      </p>
      <div className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-2">
        {espacesV2.map((u) => (
          <Link
            key={u.id}
            href={u.path}
            className="rounded-full border border-input px-4 py-2 text-sm text-ink-soft transition hover:border-cyan hover:text-heading"
          >
            {u.label}
          </Link>
        ))}
      </div>
      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="btn-primary"
        >
          Retour à l&apos;accueil
        </Link>
        <Link
          href="/contact/"
          className="btn-secondary"
        >
          Nous contacter
        </Link>
      </div>
    </Section>
  )
}
