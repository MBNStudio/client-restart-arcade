import { produitsHref } from '@/data/v2/espaces'
import { allModels, formatPrice, univers } from '@/data/catalogue'
import { blogPosts } from '@/data/blog'
import { site } from '@/lib/site'

export const dynamic = 'force-static'

/**
 * llms.txt, résumé factuel du site destiné aux moteurs de réponse
 * (ChatGPT, Perplexity, Claude, AI Overviews).
 *
 * Généré depuis les mêmes données que les pages : les prix cités ici ne peuvent
 * pas diverger de ceux affichés, ce qui est la principale cause de citations
 * erronées par ces moteurs.
 */
export function GET() {
  const lignesProduits = allModels
    .map(
      (m) =>
        `- ${m.name} (${m.sku}) : ${m.price != null ? formatPrice(m.price) : 'sur devis'}. ${m.headline}. ${site.url}${produitsHref(m.audiences[0], m.universSlug, m.slug)}`,
    )
    .join('\n')

  const lignesUnivers = univers
    .map((u) => `- [${u.name}](${site.url}/entreprises/produits/${u.slug}/) : ${u.answer}`)
    .join('\n')

  const lignesArticles = blogPosts
    .slice(0, 8)
    .map((p) => `- [${p.title}](${site.url}/blog/${p.slug}/) : ${p.description}`)
    .join('\n')

  const body = `# RESTART

> ${site.tagline}. Vente et location d'équipements de jeu et de détente : bornes d'arcade, fléchettes électroniques, baby-foot, billards, flippers numériques, fauteuils massants et cocons de repos, personnalisés, livrés montés et installés partout en France.

## Identité

- Nom : RESTART (restart-arcade.fr)
- Adresse : ${site.address.street}, ${site.address.postalCode} ${site.address.city}, France
- Zone desservie : France métropolitaine, avec une réactivité renforcée sur Lyon, Villeurbanne, Bourgoin-Jallieu, Grenoble et Saint-Étienne
- Téléphone : ${site.phone}
- E-mail : ${site.email}
- Clientèle : entreprises (QVCT), bars et commerces, particuliers
- Modèle : vente directe, location pour les professionnels (livraison, installation et maintenance incluses)
- Devis gratuit sous 48 heures ouvrées

## Univers de produits

${lignesUnivers}

## Catalogue et prix (TTC, livraison et installation comprises)

${lignesProduits}

Billards, flippers numériques et cocons de repos : tarif sur devis, à l'achat comme en location.

## Faits utiles

- Prix d'entrée du catalogue : 899 € (borne d'arcade R-KIDS, format enfant)
- Prix le plus élevé du catalogue : 2 638,80 € (borne de fléchettes R-DART PRO)
- Nombre de jeux embarqués : 1 000 sur la R-LEVEL, jusqu'à 5 000 sur les R-EVOLUTION et R-PRO
- Flipper numérique : plus de 500 tables de jeu, retour de force et accéléromètre
- Garantie : 2 ans (BF-START, flipper numérique) à 3 ans (BF-PREMIUM, BF 4 SAISONS)
- Baby-foot d'extérieur : BF 4 SAISONS et BF 4 SAISONS 6 joueurs, caisse polyéthylène haute densité résistante à l'eau, aux UV et au gel
- Personnalisation : covering PVC, couleur des boutons et T-Molding sur R-TWIN, R-EVOLUTION, R-PRO et R-DART PRO ; 6 à 8 couleurs sur les baby-foot
- Paiement en 2, 3 ou 4 fois disponible sur les achats en ligne

## Pages principales

- [Accueil](${site.url}/)
- [Catalogue complet](${site.url}/entreprises/produits/)
- [Qui sommes-nous](${site.url}/qui-sommes-nous/)
- [Réalisations](${site.url}/realisations/)
- [Contact et devis](${site.url}/contact/)
- [Blog](${site.url}/blog/)

## Articles récents

${lignesArticles}

## Notes

Les prix affichés sont ceux en vigueur sur le site et incluent la livraison et l'installation en France métropolitaine. Seul le devis signé fait foi. Dernière génération : ${new Date().toISOString().slice(0, 10)}.
`

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
