'use client'

import { useEffect, useState } from 'react'
import { univers } from '@/data/catalogue'
import { generateLead, track } from '@/lib/analytics'
import { site } from '@/lib/site'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const profils = [
  { id: 'entreprise', label: 'Une entreprise' },
  { id: 'bar-commerce', label: 'Un bar ou un commerce' },
  { id: 'particulier', label: 'Un particulier' },
]

/**
 * Formulaire de devis.
 *
 * Le site est en export statique : il n'y a pas de backend. L'envoi se fait donc
 * via un `mailto:` pré-rempli, ce qui garantit qu'aucune demande n'est perdue en
 * attendant le branchement d'un vrai service (Formspree, Resend, API interne).
 * Le point d'intégration est isolé dans `submit()` : une seule fonction à changer.
 */
export function ContactForm({ presetProduct }: { presetProduct?: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const [profil, setProfil] = useState('entreprise')
  const [produit, setProduit] = useState(presetProduct ?? '')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (presetProduct) setProduit(presetProduct)
  }, [presetProduct])

  // `form_start` : mesure combien de visiteurs commencent le formulaire mais
  // ne l'envoient pas, l'écart le plus utile pour diagnostiquer un blocage.
  const onFirstInput = () => {
    if (started) return
    setStarted(true)
    track('form_start', { form_name: 'devis' })
  }

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    setStatus('sending')

    const lines = [
      `Profil : ${profils.find((p) => p.id === profil)?.label}`,
      `Produit : ${fd.get('produit') || 'non précisé'}`,
      `Personnalisation : ${fd.get('perso') || 'non précisé'}`,
      '',
      `Nom : ${fd.get('nom')}`,
      `Structure : ${fd.get('structure') || 'non précisé'}`,
      `Ville : ${fd.get('ville') || 'non précisé'}`,
      `E-mail : ${fd.get('email')}`,
      `Téléphone : ${fd.get('telephone') || 'non précisé'}`,
      '',
      'Projet :',
      String(fd.get('message') || ''),
    ].join('\n')

    generateLead({
      form_name: 'devis',
      audience: profil,
      product_interest: String(fd.get('produit') || 'non_precise'),
      has_phone: Boolean(fd.get('telephone')),
    })

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `Demande de devis : ${fd.get('produit') || 'projet'}`,
    )}&body=${encodeURIComponent(lines)}`

    setStatus('sent')
  }

  const field =
    'w-full rounded-lg border border-input bg-paper px-4 py-3 text-sm text-heading placeholder:text-muted-foreground/70 focus:border-cyan'
  const label = 'mb-1.5 block text-sm font-medium text-heading'

  return (
    <form onSubmit={submit} onInput={onFirstInput} className="space-y-6">
      <fieldset>
        <legend className={label}>Vous êtes…</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {profils.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setProfil(p.id)}
              aria-pressed={profil === p.id}
              className={`rounded-lg border px-4 py-2.5 text-sm transition ${
                profil === p.id
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-input text-ink-soft hover:border-fog'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="produit">
            Produit qui vous intéresse
          </label>
          <select
            id="produit"
            name="produit"
            value={produit}
            onChange={(e) => setProduit(e.target.value)}
            className={field}
          >
            <option value="">Je ne sais pas encore</option>
            {univers.map((u) => (
              <optgroup key={u.slug} label={u.name}>
                <option value={u.name}>{u.name} (en général)</option>
                {u.models.map((m) => (
                  <option key={m.sku} value={m.sku}>
                    {m.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div>
          <label className={label} htmlFor="perso">
            Souhaitez-vous une personnalisation ?
          </label>
          <select id="perso" name="perso" className={field} defaultValue="">
            <option value="">À voir ensemble</option>
            <option value="Oui, à mes couleurs / mon logo">Oui, à mes couleurs ou mon logo</option>
            <option value="Non, modèle standard">Non, modèle standard</option>
          </select>
        </div>

        <div>
          <label className={label} htmlFor="nom">
            Votre nom <span className="text-amber-700">*</span>
          </label>
          <input id="nom" name="nom" required autoComplete="name" className={field} />
        </div>

        <div>
          <label className={label} htmlFor="structure">
            Entreprise ou établissement
          </label>
          <input id="structure" name="structure" autoComplete="organization" className={field} />
        </div>

        <div>
          <label className={label} htmlFor="email">
            E-mail <span className="text-amber-700">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={field}
          />
        </div>

        <div>
          <label className={label} htmlFor="telephone">
            Téléphone
          </label>
          <input
            id="telephone"
            name="telephone"
            type="tel"
            autoComplete="tel"
            className={field}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={label} htmlFor="ville">
            Ville d&apos;installation
          </label>
          <input
            id="ville"
            name="ville"
            autoComplete="address-level2"
            placeholder="Pour estimer le délai de livraison"
            className={field}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={label} htmlFor="message">
            Votre projet en quelques mots
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Quel espace, combien de personnes, quelles contraintes de place…"
            className={field}
          />
        </div>
      </div>

      <div className="flex items-start gap-3">
        <input
          id="rgpd"
          name="rgpd"
          type="checkbox"
          required
          className="mt-1 size-4 accent-[#1e1b4b]"
        />
        <label htmlFor="rgpd" className="text-sm text-ink-soft">
          J&apos;accepte que mes données soient utilisées pour être recontacté au sujet de ma
          demande. <span className="text-amber-700">*</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full btn-primary"
      >
        {status === 'sending' ? 'Envoi…' : 'Envoyer ma demande'}
      </button>

      {status === 'sent' && (
        <p role="status" className="rounded-lg border border-cyan/30 bg-cyan-soft p-4 text-sm">
          Votre messagerie s&apos;ouvre avec la demande pré-remplie. Si rien ne se passe, écrivez-nous
          directement à{' '}
          <a href={`mailto:${site.email}`} className="text-amber-700 underline">
            {site.email}
          </a>
          .
        </p>
      )}

      <p className="text-xs text-ink-soft">
        Vos données ne sont ni revendues ni utilisées à des fins
        publicitaires.
      </p>
    </form>
  )
}
