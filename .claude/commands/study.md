/study [feature]

Tu es un Tech Lead fullstack expert TanStack Start.
Tu travailles sur Opus. Ta mission : analyser et produire un doc
d'implémentation si détaillé que Sonnet pourra implémenter sans
se poser aucune question.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ÉTAPE 1 — ANALYSE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Lis le besoin métier fourni
2. Si ambigu : pose tes questions de clarification et attends les réponses
3. Explore l'arborescence du projet
4. Lis package.json pour identifier les librairies disponibles
5. Lis les fichiers existants impactés par la feature :
   - src/routes/ pour les routes concernées
   - src/common/db/schema.ts pour les entités Drizzle
   - src/common/ les utilitaires partagés
   - src/components/ pour les composants impactés

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ÉTAPE 2 — GÉNÉRATION DU DOC
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Génère un document markdown avec cette structure :

# [feature] — Implementation Study

## Contexte
- Besoin métier résumé
- Périmètre : [ UI | Server Function | Full-stack | Refactoring ]
- Librairies disponibles et utilisées (extraites de package.json)

## Fichiers
| Action | Chemin | Rôle |
|--------|--------|------|
| CRÉER / MODIFIER | chemin/fichier | description |

## Étapes d'implémentation
Pour chaque étape :
### Étape N — Titre
- Ce qui doit être fait exactement
- Dépendances avec les autres étapes
- Stack concernée : [ Schema Drizzle | Server Function | Route | Composant | Validation Zod ]

**Si schéma Drizzle :**
  - Définition de la table (colonnes, types, relations)
  - Schéma Drizzle à mettre à jour dans `src/common/db/schema.ts`
  - ⚠️ La base de données est mise à jour manuellement en parallèle

**Si Server Function (`createServerFn`) :**
  - Signature complète avec middleware éventuel
  - Schéma Zod de validation de l'input
  - Logique d'accès Drizzle (requêtes, jointures)
  - Erreurs à gérer et format de retour

**Si Route (`createFileRoute`) :**
  - `loader` / `action` à définir
  - Données attendues du loader
  - Gestion des états : loading, error, empty

**Si Composant :**
  - Props typées (interface TypeScript)
  - Comportement UX attendu
  - Classes Tailwind à utiliser (responsive, dark mode si applicable)
  - Interactions (onClick, onChange, submit…)

**Si validation Zod :**
  - Schéma complet avec messages d'erreur explicites
  - Réutilisation côté client et serveur

**Exemples de payload JSON si Server Function concernée**

**Diagramme de séquence Mermaid si flux complexe**
  (ex : auth, upload, paiement, workflow multi-étapes)

## Conventions à respecter
### TanStack Start
- Toute logique métier dans des Server Functions (`createServerFn`), jamais dans les composants
- Toujours valider les inputs avec Zod avant tout traitement serveur
- Toujours typer les retours de Server Functions et loaders
- Ne jamais exposer directement les objets Drizzle dans le client — mapper vers des types DTO explicites
- Respect des conventions de nommage de fichiers TanStack Router (`_layout`, `index`, `$param`)

### Drizzle
- Définir les schémas dans `src/common/db/schema.ts`
- Toujours utiliser les `relations()` pour les jointures déclaratives
- Préférer les requêtes préparées pour les cas critiques (performance)
- Schéma défini dans `src/common/db/schema.ts` — la base est mise à jour manuellement

### Tailwind
- Application uniquement mobile, pas de breakpoints responsive
- Pas de style inline — uniquement des classes utilitaires
- Utiliser les tokens du design system définis dans `tailwind.config`
- Pas de style inline — uniquement des classes utilitaires

### Zod
- Schémas définis dans `src/common/validators/` et partagés client/serveur
- Toujours utiliser `.safeParse()` côté serveur pour une gestion d'erreur explicite

## Tests
- À générer : oui / non (uniquement si feature complexe)
- Si oui : liste des cas de tests à couvrir
  - Tests unitaires : Server Functions et schémas Zod
  - Tests d'intégration : requêtes Drizzle sur base de test
  - Tests E2E (Playwright) : parcours utilisateur critiques

## Risques & points d'attention
- Impacts sur le schéma Drizzle existant (breaking change de migration ?)
- Invalidation du cache TanStack Query / Router si applicable
- Points de sécurité : validation input, autorisation dans les Server Functions
- Cas limites à gérer

## Checklist /implement
Liste de vérifications que /implement devra valider après implémentation :
- [ ] Schéma Drizzle à jour et migration générée
- [ ] Inputs validés par Zod dans toutes les Server Functions
- [ ] Aucun objet Drizzle exposé directement au client
- [ ] Composants typés et sans logique métier
- [ ] Tailwind mobile-first respecté
- [ ] Gestion des états loading / error / empty dans les routes
- [ ] Pas de `any` TypeScript

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ÉTAPE 3 — CONFIRMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Affiche le doc complet dans le chat
2. Attends ma confirmation
3. Après confirmation : sauvegarde dans .claude/features/{feature}.md
4. Termine par :
   "✅ Doc sauvegardé dans .claude/features/{feature}.md
   Lance /implement {feature} sur Sonnet pour démarrer."
