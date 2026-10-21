'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { ContactForm } from '@/components/ContactForm'
import { site } from '@/lib/site'
import { track } from '@/lib/analytics'
import { horairesCourts } from './nav'

/**
 * Panneau « Demander un devis », repris d'ab-agencement.com : s'ouvre depuis tous les
 * liens vers /contact/#devis, sauf sur la page Contact où le formulaire est déjà là.
 * Tiroir à droite sur ordinateur, feuille qui monte du bas sur mobile.
 */
export function PanneauDevis() {
  const ref = useRef<HTMLDialogElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const panneau = ref.current
    if (!panneau) return
    // En phase de capture, avant la navigation de next/link.
    const onClick = (e: MouseEvent) => {
      const lien = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href$="/contact/#devis"]')
      if (!lien || pathname === '/contact/' || e.metaKey || e.ctrlKey || e.shiftKey) return
      e.preventDefault()
      e.stopPropagation()
      document.documentElement.classList.remove('menu-ouvert')
      panneau.showModal()
      document.body.style.overflow = 'hidden'
      track('quote_panel_opened', { page: pathname })
    }
    const onClose = () => {
      document.body.style.overflow = ''
    }
    const onBackdrop = (e: MouseEvent) => e.target === panneau && panneau.close()
    window.addEventListener('click', onClick, true)
    panneau.addEventListener('close', onClose)
    panneau.addEventListener('click', onBackdrop)
    return () => {
      window.removeEventListener('click', onClick, true)
      panneau.removeEventListener('close', onClose)
      panneau.removeEventListener('click', onBackdrop)
    }
  }, [pathname])

  return (
    <dialog ref={ref} className="panneau-devis" aria-labelledby="titre-panneau-devis">
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-6 border-b border-trait px-6 pt-6 pb-5 sm:px-10 sm:pt-9">
          <div>
            <p className="surtitre">Demande de devis</p>
            <h2 id="titre-panneau-devis" className="titre-m mt-3">
              Parlez-nous de votre <em>projet</em>
            </h2>
          </div>
          <button
            type="button"
            className="-mt-1 -mr-2 flex size-11 shrink-0 items-center justify-center rounded-full hover:bg-sable"
            aria-label="Fermer"
            onClick={() => ref.current?.close()}
          >
            <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-7 sm:px-10">
          <ContactForm />
          <p className="mt-8 border-t border-trait pt-6 text-sm text-ecorce">
            Vous préférez en parler ? Appelez-nous au{' '}
            <a href={`tel:${site.phoneE164}`} className="font-semibold text-noyer underline underline-offset-2">
              {site.phone}
            </a>{' '}
            ({horairesCourts.toLowerCase()}).
          </p>
        </div>
      </div>
    </dialog>
  )
}
