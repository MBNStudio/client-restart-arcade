# Feuille de route : V4 (retours de RESTART sur la V3, mail du 27/11/2026)

Branche `theme-v4`, créée depuis `theme-v3`. Publiée sous `/v4/` (un seul dépôt, un seul site Pages) :
https://mbnstudio.github.io/client-restart-arcade/v4/
**Rien n'est poussé ni publié sans demande explicite.**

## Avancement au 27/11/2026

| Lot | État |
|---|---|
| 1 Thèmes, couleur, typo | **Fait** |
| 2 Photos | **Fait** (défilé, 6 encarts, 9 blocs) |
| 3 Textes | **Fait** ; CGV remplacées par le texte en vigueur du site actuel (`scripts/build-legal.py`) |
| 4 Contenus manquants | **Fait** (`scripts/build-contenus.py`, composant `Contenus.tsx`) ; à relire par RESTART |
| 5 Mise en ligne | À faire |
| 6 Boutique | Décidé, à faire : WordPress sur `boutique.restart-arcade.fr` |
| Publication `/v4/` | Demandée le 27/11 |

Vérifié en local (`out/` servi sur le port 3112) : build 84 pages, 4 accueils en 1440 × 800 et 390 × 780 sans
débordement ni image cassée, défilé (avance, pause, reprise), aucun lien interne manquant, lint sans erreur.

La V3 contenait aussi une page CGV rédigée pendant la refonte (« livrés assemblés et mis en service sur place »,
livraison comprise dans les prix) : **la V3 publiée l'affiche encore**.

Retour global : « Merci pour cette V3, elle est super ». Le design des trois univers est validé ; les retours
portent **uniquement sur les 4 pages d'accueil** (couleur, photos, textes, typo des numéros), plus une demande de
**vérification de tous les contenus** et une question sur la mise en ligne.

## Sources

| Élément | Emplacement |
|---|---|
| Mail complet et texte | `assets-client/2026-11/retours-v3/retours-v3.eml`, `captures/mail-avec-reperes.txt` |
| 9 captures annotées (+ signature) | `assets-client/2026-11/retours-v3/captures/capture-01.png` à `-10.png` |
| 20 photos (WeTransfer, expirait le 30/11) | `assets-client/2026-11/retours-v3/photos-home/SITE INTERNET/` |
| Références clients (3 photos « au hasard ») | `assets-client/2026-11/photos-references/` |
| Fiches mises en avant | restart-arcade.fr/produit/r-evolution/ et /produit/r-dart-pro/ |

`assets-client/` reste hors git.

## Lot 1 : thèmes, couleur, typo

| Demande | Capture | Réalisation | Fichiers |
|---|---|---|---|
| Particulier : « le bleu n'est pas le bon », prendre `#4444FE` | 01, 02 | Remplacer la teinte claire `#7c7cff` par `#4444FE`. Contraste sur fond nuit : 3,2:1 (2,9:1 sur les cartes) : correct pour les grands titres, aplats et icônes, insuffisant pour le petit texte, qui passe en clair. | `app/v2.css` |
| Bars & commerces : « thème 1 » | 07 | `theme-1` devient le thème de l'univers. | `lib/v2/themes.ts` |
| Entreprise : thème validé | 05, 06 | Inchangé. | |
| Thèmes arrêtés | 07 | Retirer le sélecteur de thème (annoncé comme provisoire) et les propositions écartées. | `layout.tsx`, `ThemePicker.tsx`, `themes.ts`, `v2.css` |
| Numéros 01/02/03 en **League Spartan gras**, plus d'italique fine | 04, 06 | Police `League_Spartan` (700/800), style droit. Vaut pour tous les blocs numérotés, accueil général et pages concept compris. | `lib/v2/fonts.ts`, `v2.css` (`.v-ch__num`) |

## Lot 2 : photos des 4 accueils

### Défilé d'ouverture

« Les photos qui défilent » = les vidéos `hero-<univers>.mp4` (montage de photos générées, 14 s). Choix : les
remplacer par un **diaporama CSS** (fondu + zoom lent) : pas de réencodage vidéo, netteté d'origine, cadrage réglable
par photo, photos remplaçables par RESTART sans montage. Bouton pause et « animations réduites » conservés.
L'accueil général (film Pexels) n'a pas de dossier de photos : inchangé.

| Univers | Dossier | Photos | Points faibles à signaler à Alicia |
|---|---|---|---|
| Particulier | 1. SITE PARTICULIER HOME PAGE | 5 | n° 1 : 1024 × 572 (floue en grand écran) ; n° 3, 4 : 1376 × 768 ; n° 5 : 4:3, borne à gauche sous le titre |
| Entreprise | 3. SITE ENTREPRISE HOME PAGE | 4 | n° 2 : bandeau 3:1 (côtés coupés) ; n° 1 et 3 presque carrées (haut et bas coupés) ; n° 3 : 1120 px |
| Bars & commerces | 4. SITE BAR ET COMMERCE HOME PAGE | 4 | n° 3 : carrée 1024 px ; n° 4 : 1280 px |

Idéal à demander : paysage 16:9, 2400 px de large au moins, tiers gauche dégagé (le titre s'y pose).

### Encarts (cartes d'offres)

Cartes passées au **format carré** (les photos fournies sont surtout verticales : en 4:3, la R-EVOLUTION et la borne
Buffalo Grill seraient coupées), avec un point de cadrage par photo.

| Univers | Carte | Photo | Contenu |
|---|---|---|---|
| Particulier 1 | R-EVOLUTION | `Borne d'arcade R-EVOLUTION.JPG` | Focus produit : 5 000 jeux, écran 22", 61 × 172 × 58 cm, covering et boutons au choix, 1 590 € |
| Particulier 2 | R-DART PRO | `Fléchette R-DART PRO.png` (version large) | Focus produit : 68 × 220 × 54 cm, covering, écran 21/10, LED, options porte-gobelet et monnayeur, 2 638,80 € |
| Particulier 3 | Salle de jeux | `Salle de jeux particuliers (2).png` | Texte inchangé, photo seule |
| Bars 1 | Location longue durée | `AU BUREAU ALBI` | Texte corrigé (lot 3) |
| Bars 2 | Achat, à votre enseigne | `BUFFALO GRILL` | |
| Bars 3 | Sur mesure | `ESPRIT PADEL` | |

L'ordre des trois photos bars est déduit (ordre des fichiers et sujet) : **à confirmer**.
La R-DART PRO manquait au catalogue Particulier de la V3 (voir lot 4).

### Blocs 01 / 02 / 03 : photos de références clients

| Univers | 01 Personnalisation | 02 Paiement / Location | 03 Livraison |
|---|---|---|---|
| Particulier | `thibaut/domaine-de-massoulac-borne-d-arcade-1` | `thibaut/domaine-de-roussillon-babyfoot-3` | `thibaut/l-embuscade-flechette-2` |
| Entreprise | `guillaume/zonzini-flechette-4` | `thibaut/padel-flechette-5` | `thibaut/polygone-indoor-flechette-borne-d-arcade-billard-1` |
| Bars | `thibaut/le-bigourdan-borne-d-arcade-babyfoot` | `thibaut/chope-compagnie-flechette-babyfoot-2` | `thibaut/bar-le-central-borne-d-arcade-3` |

Provisoire (Alicia : « je changerais quand j'aurai la main »). Légendes sans nom de client.
Piège : `Homes.tsx` remplace l'image du bloc 02 par une scène générée ; supprimer cette surcharge.

## Lot 3 : textes (priorité absolue)

### Trois repères du hero Particulier (capture 01, texte d'Alicia)

1. « Paiement en 2x, 3x ou 4x » / « Sans frais, livraison chez vous »
2. « Simple d'utilisation » / « Se branche sur une prise standard » (le mail écrit « brise » : coquille corrigée)
3. « Sur-mesure » / « Personnalisable à l'infini »

### Affirmations fausses ou sans source

Comparaison du 27/11 entre la V3 et le texte public de restart-arcade.fr (hors CGV) :

| Affirmation dans la V3 | Ancien site | Source contraire | Correction V4 |
|---|---|---|---|
| « Livré monté » (31 occurrences, 10 fichiers) | 0 | Alicia ; CGV art. 20 : montage et mise en service non compris | Supprimer partout |
| Installation chez le client | titre « Livraison et installation » sur une page, qui dit aussi « simples et rapides à monter » | Alicia ; CGV art. 8 et 20 | Supprimer ; « livraison » + « simple à mettre en place » |
| « Livraison comprise / incluse » (prix, llms.txt) | 0 | Alicia : 99 € TTC ; CGV art. 8 : frais non compris | « Livraison en supplément » |
| « Maintenance incluse / assurée » (25) | 0 | Alicia | Supprimer |
| « Retapissage des billards » | 0 | | Supprimer |
| « Devis sous 48 heures » (32) | 0 | | « Devis gratuit » |
| « Deux à trois semaines » | 0 | CGV art. 17 | « Délai communiqué avant validation de la commande » |
| « Prise en main sur place », « ligne directe », « sans frais cachés » | 0 | CGV art. 20 | Supprimer |
| « Corse comprise » | « même en Corse » | CGV art. 19 : Corse sur devis | « France métropolitaine, Corse sur devis » (à confirmer) |

Ces phrases ne viennent pas du site actuel : elles ont été ajoutées pendant la refonte. Vérifiées et conservées :
audit gratuit, garantie 2 ou 3 ans selon le modèle, paiement en plusieurs fois, statistiques 64 % et 80 %,
« plus de 500 tables », prix des fiches.

Fichiers : `data/v2/espaces.ts`, `data/catalogue.ts`, `data/audiencePages.ts`, `components/v2/{Homes,ProductPages,
ConceptPage,SiteHeader,SiteFooter,sections}.tsx`, `app/{page,contact,qui-sommes-nous,realisations,blog,llms.txt}`,
`lib/site.ts`.

## Lot 4 : contenus manquants de l'ancien site

« Le gros du contenu doit déjà être présent. » Mesure (recouvrement de phrases) : les articles sont repris, mais les
pages produits de l'ancien site le sont **très peu** (0 à 2 phrases sur 15 à 30 par page), les accueils à environ 25 %.

- Reprendre les textes d'origine, mot pour mot, des pages univers (une par gamme et par public) dans
  `data/contenus.generated.json` (script `scripts/build-contenus.py`), affichés sur les pages univers.
- Ajouter sur chaque accueil le texte de présentation de l'ancien accueil correspondant.
- Catalogue Particulier : ajouter R-DART PRO, R-PRO et BF 4 SAISONS 6 joueurs, vendus aux particuliers sur le site
  actuel.

## Lot 5 : mise en ligne officielle (réponse à « il ne vous manque rien côté technique ? »)

À régler avant bascule sur o2switch, non traité par la V4 :

| Point | Détail | Qui |
|---|---|---|
| **Boutique** | Décidée (lot 6). À la bascule, faire pointer les boutons « Acheter » vers `boutique.restart-arcade.fr` (`SHOP_BASE` dans `components/v2/ProductPages.tsx`) ; ils visent aujourd'hui `restart-arcade.fr/produit/…`, qui ne répondra plus. | MBN |
| **Redirections cassées** | 41 règles visent `/produits/…`, qui n'a aucune page (les fiches sont sous `/<espace>/produits/`). Les 3 `SK-*` (billards) renvoient vers les bornes d'arcade. Les anciennes adresses de la boutique (`/produit/…`, `/panier/`, `/commande/`, catégories) sont à renvoyer vers `boutique.restart-arcade.fr`. | MBN |
| **Formulaire de devis** | Ouvre la messagerie du visiteur (`mailto:`) : brancher un envoi réel (script PHP o2switch ou service tiers). | MBN, adresse de réception à confirmer |
| Rétractation | Le site actuel a un formulaire « Renoncer au contrat ici » ; la page de la refonte n'a que le texte. | MBN |
| Pages légales | Mentions légales, RGPD, cookies et rétractation de la refonte sont des rédactions à comparer au site actuel. | RESTART + MBN |
| Accès o2switch | Capture cPanel reçue le 19/11 ; vérifier la connexion, changer le mot de passe (envoyé en clair). | RESTART + MBN |
| Mesure | Identifiant GA4 à fournir au build (`NEXT_PUBLIC_GA4_ID`). | RESTART |
| E-mails | Vérifier que le changement d'hébergement ne touche pas les MX. | RESTART + MBN |

## Lot 6 : boutique en ligne

Décision du 27/11/2026 : **la vente en ligne reste sur le WordPress actuel**, hébergé sur
`boutique.restart-arcade.fr`. On lui applique le nouveau design (logo, couleurs, polices, thème Particulier).
**Toute la logique de commande reste la même : on n'y touche pas** (panier, configurateur, paiement, livraison).

- Le sous-domaine n'existe pas encore (vérifié le 27/11) : le créer sur o2switch.
- Changer l'adresse du WordPress entraîne de vérifier, sans modifier la logique : URL du site, paiement (Pledg, carte :
  adresses de retour et de notification), e-mails de commande, certificat HTTPS, mesure d'audience.
- Habillage par le thème ou une feuille de style, à tester sur une copie avant la mise en ligne.

## Questions à poser à Alicia

1. Frais de livraison : 99 € TTC pour tous les produits ? Le site actuel montre aussi 149 € (exemple de panier dans la
   balise de partage de la page « Panier »). Grille exacte ?
2. « Sans frais » : le paiement en 2x, 3x ou 4x (Pledg) est-il bien sans frais pour le client ? La ligne
   « Sans frais, livraison chez vous » ne risque-t-elle pas d'être lue « livraison gratuite » ?
3. Corse : « même en Corse » (page livraison) ou « sur devis » (CGV) ?
4. Location longue durée : qu'inclut-elle exactement (livraison, dépannage) ?
5. Ordre des 3 photos des encarts bars ; versions larges des photos signalées au lot 2.
6. Accueil général : mêmes changements de photos que les trois autres ?
7. Thème 1 : les mots mis en avant sont en bleu clair `#aab0ff` (lisibilité sur indigo). On garde ?
8. Billards SK : prix affichés à 1 440 € sur le site actuel, « sur devis » dans la refonte. Que retenir ?
9. Accord d'affichage des clients présents sur les photos.
10. Le site actuel se contredit : sa page « Livraison et installation » promet « installation partout en France »
    et « service clé en main », à l'opposé de ses CGV. À corriger chez eux aussi.
11. Coquilles du site actuel non reprises : des pages billard et flipper se terminent par un paragraphe sur les bornes.

## Ordre de réalisation

Lot 1 → lot 3 → lot 2 → lot 4 → build, contrôle visuel des 4 accueils (ordinateur et mobile) → validation avant
publication sous `/v4/` (branche poussée + ligne `theme-v4` dans le `deploy.yml` de `main`).
