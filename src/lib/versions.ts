/**
 * Les versions de la refonte, toutes publiées sur le site GitHub Pages du dépôt restart-arcade.
 * Le sélecteur de version renvoie vers la même page sur la version choisie.
 */
export type SiteVersion = { id: string; label: string; name: string; desc: string; url: string }

export const versions: SiteVersion[] = [
  {
    id: 'v1',
    label: 'V1',
    name: 'Papier',
    desc: 'Crème et indigo, gabarit éditorial',
    url: 'https://mbnstudio.github.io/client-restart-arcade/papier',
  },
  {
    id: 'v2',
    label: 'V2',
    name: 'Studio doré',
    desc: "Cartes blanches, scène à l'heure dorée",
    url: 'https://mbnstudio.github.io/client-restart-arcade',
  },
  {
    id: 'v3',
    label: 'V3',
    name: 'Onde pixel',
    desc: 'Grille de pixels vivante, noir et cyan',
    url: 'https://mbnstudio.github.io/client-restart-arcade/onde-pixel',
  },
]

/** Version servie par ce build. */
export const CURRENT_VERSION = 'v3'
