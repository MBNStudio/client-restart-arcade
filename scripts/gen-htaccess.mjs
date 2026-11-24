// Lot 7 (V3) : génère deploy/.htaccess pour l'hébergement o2switch (Apache) à partir de docs/redirections.md
// et des articles du blog. Le site est un export statique (dossier out/) déposé à la racine de restart-arcade.fr.
//
//   NEXT_PUBLIC_BASE_PATH= npm run build && node scripts/gen-htaccess.mjs
//   puis copier out/ et deploy/.htaccess à la racine du site (voir docs/deploiement-o2switch.md)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const md = readFileSync(join(root, 'docs/redirections.md'), 'utf8')
const posts = JSON.parse(readFileSync(join(root, 'src/data/blog.json'), 'utf8')).map((p) => p.slug)
const DOMAINE = 'restart-arcade.fr'

const rules = []
const seen = new Set()
let section = ''
for (const line of md.split('\n')) {
  if (line.startsWith('## ')) section = line
  if (!line.startsWith('|') || /^\|[-| ]+\|$/.test(line) || line.includes('Ancienne URL')) continue
  const [, olds, news] = line.split('|').map((c) => c.trim())
  if (!olds || !news) continue
  const to = (news.match(/`([^`]+)`/) ?? [])[1]
  if (!to || to.includes('<')) continue // « /<slug-article>/ » : règle générique plus bas
  const target = to.split('#')[0] // Apache ne garde pas l'ancre : la page univers suffit
  for (const m of olds.matchAll(/`([^`]+)`/g)) {
    const from = m[1]
    if (from === target || seen.has(from)) continue
    seen.add(from)
    rules.push(`Redirect 301 ${from.replace(/\/$/, '')}/ ${target}`)
  }
}

// Pages sans équivalent : 410 Gone.
const gone = (md.split('## À supprimer')[1] ?? '').match(/`(\/[^`]+\/)`/g) ?? []
const goneRules = gone.map((g) => `Redirect gone ${g.replace(/`/g, '')}`)

// Anciens articles : /<slug>/ -> /blog/<slug>/
const articleRules = posts.map((s) => `Redirect 301 /${s}/ /blog/${s}/`)

const out = `# Généré par scripts/gen-htaccess.mjs depuis docs/redirections.md : ne pas éditer à la main.
# Hébergement : o2switch (Apache), site statique (export Next.js) à la racine de ${DOMAINE}.

RewriteEngine On

# Adresse unique : https, sans www.
RewriteCond %{HTTPS} off [OR]
RewriteCond %{HTTP_HOST} ^www\. [NC]
RewriteRule ^ https://${DOMAINE}%{REQUEST_URI} [L,R=301]

# Pages sans équivalent (410)
${goneRules.join('\n')}

# Redirections de l'ancien site (301)
${rules.join('\n')}

# Anciens articles du blog
${articleRules.join('\n')}

# Page d'erreur de l'export statique
ErrorDocument 404 /404.html

# Dossiers : /produits/ sert /produits/index.html (export avec slash final)
DirectoryIndex index.html
Options -Indexes

# Cache : fichiers versionnés par Next.js (immuables), images et polices un an, pages revalidées
<IfModule mod_headers.c>
  <FilesMatch "\.(webp|jpg|jpeg|png|svg|woff2|mp4|webm|ico)$">
    Header set Cache-Control "public, max-age=31536000"
  </FilesMatch>
  <FilesMatch "\.(html|txt|xml)$">
    Header set Cache-Control "public, max-age=0, must-revalidate"
  </FilesMatch>
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml text/plain
</IfModule>
`
mkdirSync(join(root, 'deploy'), { recursive: true })
writeFileSync(join(root, 'deploy/.htaccess'), out)
console.log(`${rules.length} redirections, ${goneRules.length} pages en 410, ${articleRules.length} articles → deploy/.htaccess`)
