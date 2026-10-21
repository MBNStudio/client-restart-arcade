# RESTART — refonte du site

Refonte de [restart-arcade.fr](https://restart-arcade.fr) : design, expérience utilisateur, SEO/GEO
et mesure d'audience. Site statique Next.js 15, déployé sur GitHub Pages.

**URL de test** : voir l'onglet *Actions → Deploy* ou *Settings → Pages* du repo.

## Ce que la refonte change

### Architecture — la duplication disparaît

L'ancien site déployait **trois parcours parallèles** (professionnels, particuliers, bars &
commerces) avec une page par produit et par audience. Résultat mesuré au crawl du 8 septembre 2026 :
**10 familles de pages sur 11 avaient au moins une paire de pages aux `title` et `meta description`
strictement identiques**. Google ne pouvait pas arbitrer, et l'autorité se diluait entre deux ou
trois URLs concurrentes.

Ici, **une seule URL par produit**. Les trois audiences cohabitent dans la page, via un sélecteur en
accueil et une section « Selon votre situation » sur chaque page univers. Le discours segmenté est
conservé ; la concurrence entre URLs, non.

| Avant | Après |
|---|---|
| `/baby-foot/`, `/baby-foot-particulier/`, `/baby-foot-bars-commerces/` | `/produits/baby-foot/` |
| `/accueil/`, `/accueil-particulier/`, `/accueil-bars-commerces/` | `/` |
| `/blog-professionnel/`, `/blog-particulier/`, `/blog-bars-commerces/` | `/blog/` |

Le plan de redirections 301 complet est dans [`docs/redirections.md`](docs/redirections.md).

### SEO

- `title` et `meta description` uniques sur chacune des 47 pages, générés depuis les données.
- Un seul `<h1>` par page, décrivant le contenu réel (l'ancienne home portait un `<h1>` « LANDING PAGE »).
- **Schema.org complet** : `Organization`, `LocalBusiness` (NAP, géolocalisation, zone desservie),
  `WebSite`, `Product` avec `Offer` sur chaque fiche, `BreadcrumbList`, `FAQPage`, `BlogPosting`,
  `CollectionPage`, `ItemList`. L'ancien site n'avait qu'un `Organization` au `sameAs` vide.
- Sitemap et `robots.txt` générés depuis les données — ni page de test, ni panier, ni URL morte.
- Fil d'Ariane sur toutes les pages profondes, maillage interne entre univers, modèles et articles.

### GEO — être cité par les moteurs de réponse

- Un encadré **« En bref »** en haut de chaque page importante : un paragraphe autoportant avec des
  chiffres vérifiables, qui est le format que ChatGPT, Perplexity et les AI Overviews citent.
- Des **FAQ balisées `FAQPage`** répondant à de vraies questions (« Combien coûte une borne
  d'arcade ? », « Quel baby-foot choisir pour l'extérieur ? »), avec des réponses chiffrées.
- Un [`/llms.txt`](src/app/llms.txt/route.ts) généré depuis le catalogue : identité, zone
  desservie, prix de chaque modèle, faits saillants. Comme il partage sa source avec les pages,
  les prix qu'un moteur y lit ne peuvent pas diverger de ceux affichés.

### Tracking

Plan de taggage GA4 complet avec Consent Mode v2 : voir
[`docs/plan-de-taggage.md`](docs/plan-de-taggage.md). Aucun cookie n'est déposé avant acceptation.

### Design et UX

- Thème sombre, accents néon (magenta/cyan) réservés aux CTA et aux états actifs.
- Navigation à un seul niveau de choix : plus d'« espace » à sélectionner avant de voir un produit.
- Prix affichés dès la carte produit, spécifications complètes sur chaque fiche.
- Formulaire de devis pré-rempli depuis la fiche produit consultée (`?produit=SKU`).
- Accessibilité : lien d'évitement, navigation au clavier, `aria-*` sur les onglets et le menu,
  contrastes conformes, `prefers-reduced-motion` respecté.

## Versions du site

L'onglet « Version », sur le bord gauche, propose six versions, toutes publiées sur le même site
Pages de ce dépôt. Quatre vivent sur `main` et changent l'accueil : le choix dure le temps de la
visite, et `?version=studio`, `?version=halo`, `?version=plateau` ou `?version=plateau-clair` dans
l'URL ouvre directement une version. Les deux autres sont des sites à part, sur leur branche :
**Panorama** (`theme-panorama`, publiée sous `/panorama/`) et **Showroom** (`theme-showroom`, sous
`/showroom/`). Le même onglet, avec la même liste, est présent dans les trois sites
(`src/lib/version.ts` ici, `src/lib/versions.ts` sur les branches) ; en local, il pointe vers les
serveurs de dev (`localhost:4321` pour `main`, `localhost:3107` pour Panorama).

- **Carrousel** : carrousel photo, une gamme par slide. Photos du baby-foot,
  du billard, de la borne, des fléchettes et du flipper : Unsplash et Pexels (licences libres d'usage
  commercial), recadrées en 16:9 dans `public/img/hero/`. Dessous, la page suit la construction de la
  version Panorama dans sa propre palette (bleu nuit, ivoire, corail) : un chapitre par public (bar,
  entreprise, maison) où photo et texte alternent, les sept gammes, la méthode en quatre étapes, des
  avis clients, la FAQ, puis un appel final avec quatre installations clients
  (`src/components/carrousel/CarrouselHome.tsx`, bloc « Version Carrousel » de `globals.css`).
- **Halo** : d'après l'asset « Ion Halo Helmet Motion » de horizonx.so. Le film occupe tout l'écran
  sous l'en-tête, qui n'y montre que le logo jusqu'au premier défilement. C'est un montage de vraies
  vidéos, pas de la 3D : neuf plans dans une ambiance de fête, flipper, fléchettes,
  baby-foot, sourires et verres qui trinquent (Pexels, licence d'usage commercial gratuit, sources
  dans `public/clients/restart/fete/SOURCES.md` du studio), étalonnés ensemble, en boucle de 13,5 s
  sans couture. Composition `FootageCut` du studio, réglages dans
  `video/hero-halo*.props.json`. Une légende par plan renvoie aux
  baby-foot. Sous le film, la page reprend exactement le contenu de la version Plateau, en gris
  studio et orange : seuls le hero et la palette changent, pour comparer deux rendus à contenu égal
  (`HaloHero.tsx`, prop `hero` de `PlateauHome`, bloc « Version Halo » de `globals.css`).
  Chaque image du film fait la moyenne d'une quarantaine de rendus (profondeur de champ, flou de
  bougé, ombres de boîte à lumière) pour un rendu photographique.
- **Plateau** : mise en page sombre inspirée de resend.com, qui s'applique à tout le site ; le hero
  montre un mur de photos animé : trois colonnes de gammes et de lieux qui défilent sans fin (celle
  du milieu en sens inverse), inclinées en perspective ; au survol la colonne s'arrête et la photo
  avance (`PlateauHero.tsx`, bloc `.pl-wall` de `globals.css`, CSS seulement). Toute la page reste noire, de l'accueil au pied de page.
- **Plateau clair** : la version Plateau, inversée : le haut est clair, la zone des cartes et du
  catalogue passe au noir au défilement, puis une rupture franche ramène le clair avant les avis. Son
  hero remplace le mur de photos par les gammes en grand, une à la fois (`PlateauGammes.tsx`) : borne
  d'arcade, fléchettes, baby-foot et billard en photos d'installations clients, flipper et cocon en
  photos en situation (`public/img/plateau/gammes/`, recadrées en 4:5 sans logo ni filigrane). Un volet
  doré balaie la photo et pose la gamme suivante ; à droite, une colonne étroite donne le nom, une
  phrase, le prix d'entrée et le lien, et six segments suivent le défilement et se cliquent. Les
  composants Plateau n'emploient que les couleurs `pl-ink`, `pl-bg` et `pl-gold`, redéfinies par
  version dans `src/app/globals.css`.

Le film de la version Halo (`public/video/`) sont rendus avec le studio Remotion de
l'agence (`mbn-ads-agency/studio`, modèle `FootageCut`) à partir des réglages de
`video/` :

```bash
cd ../mbn-ads-agency/studio
node render.mjs <jobs.json>   # jobs : composition FootageCut, props video/hero-halo*.props.json
```

Les repères de temps des films sont repris dans `src/components/CinemaHero.tsx` (gel de la
fléchette, scènes) et `src/app/page.tsx` : à mettre à jour si un film change. Les affiches
`hero-halo-*.jpg` sont l'image 105 (amis aux fléchettes).

## Démarrer

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # export statique dans out/
```

Variables d'environnement (toutes optionnelles en local) :

| Variable | Rôle |
|---|---|
| `NEXT_PUBLIC_BASE_PATH` | Sous-chemin de déploiement (`/restart-arcade` sur GitHub Pages) |
| `NEXT_PUBLIC_SITE_URL` | URL absolue, utilisée pour les canonical et le JSON-LD |
| `NEXT_PUBLIC_GA4_ID` | Identifiant GA4 `G-XXXXXXXXXX`. Absent = aucun script de mesure |

## Structure

```
src/
├── app/                    # Routes (App Router, export statique)
│   ├── produits/[univers]/[modele]/
│   ├── blog/[slug]/
│   ├── llms.txt/           # Résumé factuel pour les moteurs génératifs
│   ├── sitemap.ts robots.ts
│   └── …                   # contact, qui-sommes-nous, réalisations, pages légales
├── components/             # Header, Footer, formulaire, cartes, primitives UI
├── data/
│   ├── catalogue.ts        # Source unique : univers, modèles, prix, specs, FAQ
│   ├── blog.json           # 12 articles extraits de l'ancien site
│   └── blog.ts             # Titres réécrits et catégorisation
└── lib/
    ├── site.ts             # NAP, réseaux, identifiants
    └── analytics.ts        # Helpers dataLayer GA4
```

`src/data/catalogue.ts` est la **source unique** : les pages, le sitemap, le JSON-LD, le `llms.txt`
et les options du formulaire en sont tous dérivés. Changer un prix à un seul endroit le met à jour
partout, y compris dans le balisage structuré.

## Points à trancher avant mise en production

1. **Mentions légales** — l'ancien site ne publiait que les informations de l'agence éditrice.
   La refonte affiche celles de l'exploitant (MG2T SAS, 941 508 442 RCS Vienne), reprises des CGV
   du 1er août 2026 et centralisées dans `site.company` ([`src/lib/site.ts`](src/lib/site.ts)).
2. **CGV à faire valider** par un conseil juridique avant publication.
3. **Incohérence de contact** — la page Contact de l'ancien site affiche `contact@restart-arcade.fr`,
   les mentions légales `contact@restart.fr`. La refonte retient la première ; à confirmer.
4. **Envoi du formulaire** — le site étant statique, l'envoi passe pour l'instant par un `mailto:`
   pré-rempli. Le branchement d'un service (Formspree, Resend, API interne) tient en une fonction :
   `submit()` dans [`src/components/ContactForm.tsx`](src/components/ContactForm.tsx).
5. **Photos** — aucune photo produit ni de réalisation n'était récupérable proprement. Les visuels
   sont des placeholders typographiques ; les pages réalisations décrivent des contextes sans image
   inventée.
6. **Modèles SK-PUB, SK-BUSINESS, SK-4 SAISONS** — écartés du catalogue : leurs fiches d'origine
   n'avaient ni caractéristiques, ni description, ni meta. À réintégrer si toujours commercialisés.

## Origine des données

Contenus, prix et caractéristiques extraits de restart-arcade.fr le 8 septembre 2026. L'analyse
complète de l'ancien site est conservée dans [`knowledge/`](knowledge/).
