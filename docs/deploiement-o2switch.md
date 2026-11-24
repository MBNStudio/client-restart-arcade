# Mise en ligne sur o2switch (V3, lot 7)

RESTART a migré le domaine et l'hébergement de son côté (cPanel o2switch). Le site est un **export statique**
Next.js : on dépose le contenu de `out/` à la racine de `restart-arcade.fr`, avec le `.htaccess` généré.

## Construire

```bash
NEXT_PUBLIC_BASE_PATH= npm run build     # domaine unique : pas de sous-dossier (≠ GitHub Pages, /client-restart-arcade/v3/)
node scripts/gen-htaccess.mjs            # écrit deploy/.htaccess depuis docs/redirections.md et le blog
```

Si le build échoue avec `Cannot read properties of undefined (reading 'length')` (WasmHash), supprimer `.next/`
et relancer.

## Déposer

1. cPanel → Gestionnaire de fichiers (ou FTP/SFTP) → racine du site (`public_html/`).
2. Y copier **le contenu** de `out/` (pas le dossier lui-même), puis `deploy/.htaccess`.
3. Vérifier : `https://restart-arcade.fr/`, `/particuliers/`, `/entreprises/actualite/`, une ancienne adresse
   (`/accueil/` doit répondre 301 vers `/entreprises/`), une adresse inconnue (page 404 du site).

Alternative : déploiement Git depuis cPanel (« Git Version Control ») sur une branche `deploy` contenant
uniquement `out/` + `.htaccess`.

## Redirections

`deploy/.htaccess` reprend le plan de `docs/redirections.md` : 301 de l'ancien site, 410 pour les pages sans
équivalent, anciens articles `/<slug>/` → `/blog/<slug>/`, https et domaine sans `www`. Les ancres
(`#particulier`) ne survivent pas à une redirection Apache : la page univers suffit. Si l'ancien site WordPress
reste en ligne ailleurs, ne pas déposer ces règles dessus.

## Sécurité

- Les accès cPanel sont dans `assets-client/2026-11/acces/` (ignoré par git). **Ne jamais les commiter ni les
  copier dans un fichier du dépôt ou une mémoire.**
- Le mot de passe a circulé en clair par mail : conseiller à RESTART de le changer.
- Le lien Smash du cPanel expire le 26/11/2026 : la capture est déjà récupérée.
