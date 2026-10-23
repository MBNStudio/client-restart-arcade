---
name: auto-pull
description: Récupère automatiquement le code du dépôt client-restart-arcade (site du client Restart Arcade) depuis son remote `MBNStudio/client-restart-arcade` en gérant seul les cas courants (working tree propre, auto-stash des modifications locales, pas d'upstream, HEAD détaché, rebase en cours) et en n'interrompant l'utilisateur que pour les conflits réels. À utiliser dès que l'utilisateur demande de « pull », « pouler », « récupère le code », « récupère les changements », « mets à jour », « update », « synchronise », « sync », « fetch », « tire les modifs », « va chercher le remote », « ramène ce qu'il y a sur le repo », ou toute autre formulation qui exprime l'intention d'aligner son dépôt local avec le remote — même quand le mot exact « pull » n'est pas utilisé. Ce skill prend en charge l'intégralité du flux : vérification du dépôt, lecture de l'état, fetch, comparaison local/remote, stash éventuel, rebase, pop du stash, et rapport final.
---

# auto-pull

Skill de récupération Git qui automatise le cycle complet **lecture d'état → fetch → intégration → rapport**, avec gestion transparente des modifications locales et rapport final clair.

Philosophie : agir, ne demander que pour les vrais conflits. Exigence : pas de force, pas de skip des hooks, pas de perte silencieuse de travail.

## Ce dépôt

| | |
|---|---|
| Dépôt | `client-restart-arcade` (site du client Restart Arcade) |
| Remote attendu | `origin` → `https://github.com/MBNStudio/client-restart-arcade.git` |
| Branche principale | `main` |

Ce skill ne tire **que** ce dépôt. Chaque repo de l'organisation `MBNStudio` a son propre `auto-pull` ; pour mettre à jour un autre repo, c'est le skill de ce repo-là qui s'applique.

## Quand déclencher

Déclencher dès que l'utilisateur exprime l'intention d'aligner son dépôt local avec le remote, par exemple :
- « pull »
- « pull ça »
- « récupère le code »
- « récupère les changements »
- « mets à jour »
- « update le repo »
- « synchronise »
- « sync avec le remote »
- « fetch »
- « tire les modifs »
- « va chercher ce qu'il y a sur le remote »
- « ramène le dernier état »
- « check si y a du nouveau »

### Deux intentions possibles — les distinguer

| Intention utilisateur | Action |
|-----------------------|--------|
| **Pull** (récupérer **et** intégrer) : « pull », « mets à jour », « synchronise », « récupère le code » | Fetch + rebase dans la branche locale. |
| **Fetch seul** (juste voir ce qu'il y a sans toucher au working tree) : « fetch », « check le remote », « regarde s'il y a du nouveau » | `git fetch --all --prune` + rapport comparatif, **pas** de rebase. |

En cas de doute, faire un **pull** (intention la plus fréquente) et mentionner en fin de rapport qu'on a intégré les changements.

## Pourquoi ce skill existe

Récupérer proprement le code depuis un remote demande de vérifier plusieurs choses (working tree propre ou non, branche trackée ou non, divergence éventuelle, rebase en cours) avant de lancer la bonne commande. C'est répétitif et le prix de l'erreur est élevé : pull avec du dirty → refus ou merge parasite, rebase foireux → commits perdus, etc.

Ce skill garantit :
- Un **historique linéaire** (rebase par défaut, pas de merge commits parasites).
- Une **protection systématique** du travail local : si des modifs non commitées existent, elles sont stashées avant le rebase et restaurées après.
- Un **rapport clair** : ce qui a été récupéré, combien de commits, quels fichiers impactés côté remote.
- Les **garde-fous Git** habituels (pas de reset --hard, pas de checkout destructif, pas de clean -fd).

## Procédure

### 0. Vérifier qu'on travaille sur le bon dépôt

Toutes les commandes Git du skill visent la racine du dépôt `client-restart-arcade` : le dossier qui contient `.claude/skills/auto-pull/`. Si la session tourne ailleurs (autre dossier de travail, autre repo ouvert à côté), lancer chaque commande avec `git -C <racine de client-restart-arcade>` plutôt que de compter sur le dossier courant.

```bash
git rev-parse --show-toplevel
git remote get-url origin
```

- Le dossier racine doit être celui de `client-restart-arcade`.
- L'URL d'`origin` doit désigner `MBNStudio/client-restart-arcade` (en HTTPS `https://github.com/MBNStudio/client-restart-arcade.git` ou en SSH `git@github.com:MBNStudio/client-restart-arcade.git`).

Si l'une des deux ne correspond pas, **ne rien récupérer** : le signaler à l'utilisateur (dépôt trouvé, remote trouvé, ce qui était attendu) et s'arrêter. Ne jamais corriger la config du remote soi-même.

### 1. Lire l'état du dépôt

Lancer en parallèle :
- `git status` (sans `-uall`)
- `git branch --show-current`
- `git rev-parse --abbrev-ref --symbolic-full-name @{u} 2>/dev/null` (détecte l'upstream)
- `git rev-parse HEAD 2>/dev/null` (pour détecter le HEAD détaché : si `git symbolic-ref -q HEAD` échoue, on est détaché)
- `git rev-parse --git-path rebase-merge --git-path rebase-apply --git-path MERGE_HEAD 2>/dev/null` (pour détecter un rebase/merge en cours)

### 2. Fetch dans tous les cas

Toujours commencer par :

```bash
git fetch --all --prune
```

C'est **sûr** (ne touche pas au working tree ni aux branches locales), et ça donne l'image la plus récente du remote pour décider de la suite.

Si le fetch échoue (pas de remote, problème réseau, auth), le dire clairement à l'utilisateur et s'arrêter.

### 3. Analyser la divergence

Après le fetch, comparer local et remote :

```bash
git rev-list --left-right --count @{u}...HEAD 2>/dev/null
```

Cela renvoie `behind  ahead`. Quatre cas :

| behind | ahead | Situation                                      | Action                                             |
|--------|-------|------------------------------------------------|----------------------------------------------------|
| 0      | 0     | Déjà à jour                                    | Rapport une ligne, stop.                           |
| 0      | N     | Local en avance uniquement                     | Rapport : rien à récupérer, N commits à pousser.   |
| N      | 0     | Remote en avance, pas de commits locaux        | Fast-forward (`git merge --ff-only @{u}`).         |
| N      | M     | Historiques divergents                         | Rebase (voir étape 5).                             |

Pour le cas « intention = fetch seul », s'arrêter ici et faire un rapport comparatif (voir étape 7), sans toucher aux branches.

### 4. Gérer le working tree sale (avant toute intégration)

Si `git status --porcelain` n'est **pas** vide et qu'on va faire un fast-forward ou un rebase :

1. **Auto-stash transparent** :
   ```bash
   git stash push -u -m "auto-pull: stash avant intégration"
   ```
   Le `-u` inclut les fichiers non trackés (sinon ils peuvent bloquer le rebase).

2. Retenir qu'on a stashé (flag interne) pour pouvoir pop après.

3. Si le stash échoue (cas très rare, ex. fichier en conflit pré-existant), **ne pas forcer** : prévenir l'utilisateur et s'arrêter.

### 5. Intégrer les changements

Selon le cas identifié à l'étape 3 :

- **Fast-forward pur** (behind > 0, ahead = 0) :
  ```bash
  git merge --ff-only @{u}
  ```

- **Divergence** (behind > 0, ahead > 0) :
  ```bash
  git pull --rebase
  ```
  Le rebase garde l'historique linéaire : les commits locaux sont rejoués par-dessus la nouvelle base du remote.

**Ne jamais** utiliser :
- `git reset --hard` pour « forcer » l'alignement.
- `git pull` sans `--rebase` (crée un merge commit parasite).
- `git clean -fd` pour « nettoyer » avant pull.
- `git checkout -- .` ou `git restore .` pour « écraser » les modifs locales.

Sauf demande explicite de l'utilisateur. Le skill ne détruit jamais de travail local en silence.

### 6. Restaurer le stash (si on en avait créé un)

Si on a stashé à l'étape 4 :

```bash
git stash pop
```

Trois issues possibles :

- **Pop propre** : parfait, on continue vers le rapport.
- **Pop avec conflit** : le stash est préservé (il n'est pas supprimé en cas de conflit), les fichiers en conflit sont indiqués par `git status`. **S'arrêter**, prévenir l'utilisateur : lister les fichiers en conflit, rappeler que le stash est intact (`git stash list` le montre), et lui demander comment résoudre.
- **Pop impossible** (très rare) : ne rien forcer, préserver le stash, prévenir l'utilisateur.

### 7. Rapporter

Résumer en 2-4 lignes maximum :
- D'où on est parti (dépôt `client-restart-arcade`, branche, upstream).
- Ce qu'on a récupéré : nombre de commits, courte liste des auteurs ou des scopes si pertinent, fichiers principaux modifiés côté remote.
- Si un stash a été fait puis restauré, le mentionner discrètement.
- Si on est désormais en avance sur le remote, signaler qu'il y a des commits locaux à pousser.

**Exemple de rapport après pull avec divergence** :

> `client-restart-arcade` : récupéré 3 commits depuis `origin/main` (docs, refacto d'un skill). Tes 2 modifs locales ont été stashées puis restaurées sans conflit. Tu es maintenant 1 commit en avance, à pousser.

**Exemple après fetch seul** :

> `client-restart-arcade` : fetch OK. `origin/main` a 2 nouveaux commits (docs: ajout d'une section, chore: mise à jour de la config Claude). Dis-moi si tu veux que je les intègre.

**Exemple quand tout est à jour** :

> `client-restart-arcade` : déjà à jour avec `origin/main`. Rien à récupérer.

## Récupération automatique (sans demander)

L'esprit du skill : **résoudre seul tout ce qui peut l'être**, n'interrompre l'utilisateur **que pour les conflits réels**.

Cas à corriger automatiquement, sans demander :

- **Working tree sale mais pas de conflit potentiel** → stash + rebase + pop, transparent pour l'utilisateur.
- **Rebase en cours propre** (pas de marqueur de conflit, index cohérent) → `git rebase --continue` puis reprendre le flux.
- **Merge en cours propre** → `git merge --continue` puis reprendre.
- **Pas d'upstream configuré sur la branche courante** → faire `git fetch --all --prune` et prévenir l'utilisateur qu'il n'y a rien à pull tant qu'aucun upstream n'est défini. Proposer la commande exacte (`git branch --set-upstream-to=origin/<branche>`) mais **ne pas l'exécuter** sans accord.
- **Pas de remote du tout** → le dire en une phrase et s'arrêter.
- **HEAD détaché** → faire `git fetch --all --prune` uniquement, prévenir l'utilisateur (décision humaine : checkout d'une branche ou pas), ne jamais pull sur un HEAD détaché.
- **Branche locale existe mais n'a jamais été poussée** → fetch, signaler qu'il n'y a rien à pull (pas d'équivalent remote).
- **Le remote a été force-pushé** (ex. `behind > 0` et `ahead > 0` mais les commits locaux sont en réalité des anciennes versions de commits remote) → ne pas tenter de deviner, faire le rebase normal ; s'il y a des conflits, remonter à l'utilisateur. **Ne jamais** faire `git reset --hard @{u}` automatiquement.

## Cas qui exigent l'utilisateur (les seuls)

Interrompre **uniquement** quand une décision humaine est indispensable :

- **Conflit pendant le rebase** (marqueurs `<<<<<<<`, fichiers en `UU`/`AA`/`DD` dans `git status`) → s'arrêter, lister précisément les fichiers en conflit, résumer pour chacun la version locale vs la version remote, demander la résolution. Rappeler la commande pour abandonner (`git rebase --abort`) au cas où l'utilisateur préfère annuler.
- **Conflit au `stash pop`** après un rebase qui a lui-même réussi → s'arrêter, lister les fichiers, rappeler que le stash d'origine est préservé (`git stash list`).
- **Auth ou accès refusé au remote** → reporter le message d'erreur brut, ne pas tenter de bricoler la config.
- **Remote inattendu** (`origin` ne pointe pas vers `MBNStudio/client-restart-arcade`, ou l'upstream de la branche pointe vers un autre remote ou un fork) → signaler la situation, ne pas changer la config.

Dans tous les autres cas : **agir, ne pas demander**.

## Garde-fous (rappel)

- Ne jamais modifier la config Git.
- Ne jamais `reset --hard`, `clean -fd`, `checkout -- .`, `restore .` sans demande explicite de l'utilisateur.
- Ne jamais `pull --force`, `fetch --force` sans demande explicite.
- Ne jamais sauter les hooks (`--no-verify`).
- Ne jamais supprimer un stash créé par le skill tant qu'il n'a pas été restauré proprement.
- Ne jamais pull sur un HEAD détaché.
- Ne jamais tirer un autre dépôt que `client-restart-arcade`.
