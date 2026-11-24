# Feuille de route : V3 (retours de RESTART sur la V2, mail du 19/11/2026)

Statut : **préparée, aucun développement lancé.** Base de travail : branche `theme-v2` (sources de la V2 ;
`main` ne porte que le build publié sous `/v2/`). Proposition : nouvelle branche `theme-v3` créée depuis
`theme-v2`, publiée sous `/v3/` (voir mémoire « Versions du site » : un seul dépôt, jamais de dépôt dupliqué).
Ne rien pousser ni publier sans demande explicite.

Éléments fournis, rangés dans `assets-client/` (lire `assets-client/README.md`) :
logos (`2026-11/logos/`), 300 photos de références clients (`2026-11/photos-references/`), accès cPanel
(`2026-11/acces/`, ignoré par git).

## Ce que RESTART valide (à ne pas toucher)

- Pop-up de choix d'univers à l'arrivée et changement d'univers à tout moment.
- Responsive.
- Pièce interactive : **gardée de côté** « pour un autre endroit, en tête pour le moment ». Ne pas la
  supprimer du code, la retirer des pages d'accueil seulement (voir lot 4).

## Lots, par ordre de réalisation

### Lot 1 : identité (logo, icône, polices, couleurs) — bloquant pour tout le reste

| Tâche | Détail | Fichiers |
|---|---|---|
| Nouveau logo | Remplacer la pastille « Power » + texte provisoires par le logo fourni (blanc ou noir selon le fond). Copier les fichiers voulus dans `public/img/logo/`, en WebP/SVG si possible (le PNG d'origine fait 13312 px de large : à réduire). | `src/components/v2/Brand.tsx`, `SiteHeader.tsx`, `SiteFooter.tsx`, `public/img/logo/` |
| Icône du site (favicon) | Le « R » à triangle bleu devient l'icône (`icones-transparent/` et `logos-fond/ICONE …`). Remplace l'icône « power » actuelle. Générer favicon, `apple-touch-icon`, icône 512. | `src/app/layout.tsx` (métadonnées), `src/app/icon.*` |
| Polices | Le PDF de charte contient **Orbitron Black** (titres, logotype) et **Poppins** (Regular, Bold, Italic). Ajouter via `next/font/google` à côté de Manrope. | `src/lib/v2/fonts.ts`, `src/app/v2.css` (`--v-font-display`, `--v-font-body`) |
| Couleur principale | `#4444FE` (bleu du « R » du logo) ; couleur d'appel à l'action : à garder rose pour le test (valeur actuelle `#ff2e93`) ; ancien bleu `#00CCD5` pour Bars & commerces. | `src/app/v2.css`, `src/lib/v2/themes.ts` |

Question à confirmer avec RESTART : Orbitron est-il bien la police des titres, ou seulement du logotype ?
Poppins pour tout le texte ? (Déduit du PDF, le mail dit seulement « les bonnes polices ».)

### Lot 2 : trois univers, trois thèmes (le cœur de la V3)

Le mail demande de **tester** ces trois directions, en respectant logo, polices et couleurs. Le thème
« Arcade » de la V2 (nuit bleutée, magenta, cyan) est la base.

| Univers | Thème demandé | Détail de test |
|---|---|---|
| Particulier | Arcade V2 | principale `#4444FE`, CTA rose (conservé pour tester) |
| Entreprise | Arcade V2 **en mode clair** | fond par exemple `#e6e7e8` ; **pas de fond blanc** ; à valider visuellement |
| Bars & commerces | Arcade V2 | principale `#4444FE`, CTA bleu `#00CCD5` (« voir ce que ça donne ») |

Implémentation proposée :
1. Créer trois thèmes (`arcade-particulier`, `arcade-entreprise` clair, `arcade-bar`) dans `v2.css` et
   `themes.ts`, avec `scheme` `dark` / `light` / `dark`.
2. **Thème imposé par univers** : appliquer automatiquement le thème de l'espace actif (via `useEspace`)
   et au changement d'univers. C'est le « code couleur par univers » demandé pour la lisibilité.
3. **Sélecteur de thème (`ThemePicker`)** : sert à comparer pendant la recette. Le garder en V3 pour permettre
   à RESTART de trancher, avec les trois propositions ; le retirer une fois la charte validée.
4. Vérifier le contraste (`#4444FE` sur fond sombre : texte et liens, ratio AA) et le mode clair d'Entreprise.

Livrable : captures des trois univers côte à côte, pour décision de RESTART.

### Lot 3 : rubrique « Actualité » dans le menu des trois univers

- Ajouter « Actualité » dans `nav` de chaque espace (`src/data/v2/espaces.ts`, lignes ~99, ~229, ~368) et dans
  le menu mobile.
- Objectif de RESTART : publier beaucoup d'articles SEO **par cible**. Donc une liste d'articles par univers :
  `/<espace>/actualite/` et `/<espace>/actualite/<slug>/`, avec filtre sur la cible.
- Le blog actuel (`/blog/`, 4 articles dans `src/data/blog.ts`) devient la source : ajouter un champ
  `audiences` à chaque article, les répartir, et rediriger/canonicaliser `/blog/` pour éviter le doublon.
- Compléter `sitemap.ts` et les données structurées (JSON-LD `Article`).
- Décision à prendre : l'URL `/blog/` existe déjà sur le site actuel (voir `docs/redirections.md`) : garde-t-on
  `/blog/` ou passe-t-on à `/actualite/` ? Impact SEO à traiter à la migration.

### Lot 4 : accueil, doublon de sections

RESTART est d'accord : « Tout ce qui fait jouer » et la pièce interactive font doublon et alourdissent.
**Garder la mosaïque « Tout ce qui fait jouer »** (la capture du mail : 1 grande tuile Bornes d'arcade +
Fléchettes, Baby-foot, Billard, Flipper).
- `Homes.tsx` : retirer `<InteractiveRoom />` de `GeneralHome` (ligne ~192) et `EspaceHome` (ligne ~341).
- Conserver `InteractiveRoom.tsx` en réserve pour un autre emplacement (à décider plus tard).
- Ajuster la grille de la mosaïque (`GammeMosaic` dans `sections.tsx`) pour qu'elle corresponde à la capture.

### Lot 5 : photos et vidéos (priorité aux vraies photos)

Consigne : mettre **le plus possible leurs propres photos**, limiter l'IA au strict nécessaire.
- Photos IA/vidéos IA des accueils (V2) : gardées pour l'instant sur les pages d'accueil des 3 univers, **à
  retravailler** pour que les produits et les gabarits soient fidèles (vrais modèles RESTART).
- Photos IA autorisées pour : articles « Actualité », landing pages, campagnes ADS.
- Remplacer les scènes IA des pages produits, concept, réalisations et mosaïques par des photos de
  `assets-client/2026-11/photos-references/` (repérer par client et produit grâce au nom de fichier). Choix à
  faire avec RESTART : tri visuel des 300 photos (qualité, produit, droit à l'image) avant intégration.
- `RealisationsGallery.tsx` / page `/realisations/` : alimenter avec ces photos, avec le nom du client si
  l'accord est confirmé.
- Convertir en WebP, tailles responsive, `alt` descriptifs. Budget : pas de nouveau coût image IA.

### Lot 6 : médiathèque avec les 3 dossiers par commercial

Demande : ajouter les photos dans la « médiathèque » **en conservant les 3 dossiers** (Maxime, Thibaut,
Guillaume) ; but à terme : **landing pages par ville et par région**.
- Secteurs : **Maxime** = Sud-Est, **Thibaut** = Sud-Ouest, **Guillaume** = Auvergne-Rhône-Alpes.
- Le site est une exportation statique Next.js : la médiathèque est un dossier de fichiers, pas un CMS.
  Proposition : `public/img/references/{maxime,thibaut,guillaume}/` avec un index
  `src/data/references.ts` (client, produit, ville si connue, secteur, fichier, accord d'affichage).
  Question : « médiathèque » = celle de WordPress de l'ancien site (alors import côté WordPress au moment de la
  migration) ou une médiathèque dans ce site ? À clarifier avec RESTART.
- Données à obtenir : la **ville** de chaque client (absente des noms de fichiers), pour les futures landings
  par ville/région. Préparer le gabarit de landing (`/<espace>/<region>/<ville>/`) sans le lancer.

### Lot 7 : domaine et hébergement (migration faite côté RESTART)

RESTART a ses propres accès et la migration est faite : cPanel o2switch (lien Smash du mail, expire le
26/11, **capture rangée dans `assets-client/2026-11/acces/`, jamais commitée**).
- Récupérer le lien avant le 26/11 : le mail ne contient que la capture, pas de fichier à part.
- Définir le mode de mise en ligne : site statique (`out/`) à déposer sur o2switch (FTP ou Git) au lieu de
  GitHub Pages ; `NEXT_PUBLIC_BASE_PATH` vide, domaine unique `restart-arcade.fr`, redirections
  (`docs/redirections.md`) à traduire en `.htaccess`.
- Ne pas stocker le mot de passe dans le repo ni dans les mémoires ; conseiller à RESTART de le changer
  (il apparaît en clair dans un mail).

## Points ouverts à poser à RESTART

1. Polices : Orbitron pour les titres et Poppins pour le texte, c'est bien ça ?
2. Médiathèque : où ? (WordPress ou ce site)
3. `/blog/` ou `/actualite/` pour la rubrique ?
4. Accord d'affichage des clients des photos, et villes pour les landings.
5. Photo corrompue de Thibaut (`VIN'S BAR`) à redemander.

## Échéances

- 22/11 : lien WeTransfer des photos (**déjà récupéré**, importé le 19/11).
- 26/11 : liens Smash charte/logo (**déjà récupérés**) et cPanel (capture récupérée).

## Ordre de lancement conseillé

1 → 2 → 4 → 3 → 5/6 (au fil du tri photo) → 7 (en parallèle, côté déploiement). Les lots 1 et 2 produisent
la V3 visible à montrer à RESTART ; les lots 5 à 7 dépendent de leurs réponses.
