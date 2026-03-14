# L'Instant Gourmand by Salma

Site d'administration des commandes / achats pour traiteur spécialisé en petites bouchées, sandwichs et quiches pour événements professionnels et personnels.

## Fonctionnalités

- **Tableau de bord** — vue mensuelle des ventes avec calendrier, synthèse du mois et de l'année en cours
- **Ventes** — création, consultation et modification des commandes clients (montant, acompte, solde, mode de paiement, adresse de livraison)
- **Achats** — suivi des dépenses avec date et description
- **Produits** — gestion du stock (quantités)
- **Taxes** — rapport fiscal mensuel avec calcul automatique du taux (12,3 %) sur les paiements bancaires déclarables

## Stack technique

| Couche | Technologie |
|---|---|
| Runtime | Node.js + [pnpm](https://pnpm.io) |
| Framework | [TanStack Start](https://tanstack.com/start) + [Solid.js](https://www.solidjs.com) (SSR) |
| Routing | TanStack Solid Router (file-based) |
| ORM | Drizzle ORM |
| Base de données | PostgreSQL |
| CSS | Tailwind CSS v4 |
| Linter/Formatter | Biome |

## Prérequis

- Node.js ≥ 20
- pnpm
- PostgreSQL

## Installation

```bash
# Installer les dépendances
pnpm install

# Copier le fichier d'environnement
cp .env.example .env
```

Renseigner les variables dans `.env` :

```env
# URL de connexion PostgreSQL
DATABASE_URL=postgresql://DB_USERNAME:DB_PASSWORD@DB_HOST:DB_PORT/DB_NAME

# Email et mot de passe administrateur
# Générer avec : node -e "const {scrypt,randomBytes}=require('crypto'),{promisify}=require('util'),s=promisify(scrypt),salt=randomBytes(16).toString('hex');s('YOUR_PASSWORD',salt,64).then(h=>console.log(salt+':'+h.toString('hex')))"
APP_ADMIN_EMAIL=root@admin.fr
APP_ADMIN_PASSWORD_HEX=YOUR_PASSWORD_HASHED

# Clé secrète de session
# Générer avec : pnpm dlx auth@latest secret
SESSION_SECRET_HEX=YOUR_GENERATED_SECRET
```

## Développement

```bash
pnpm dev
```

L'application est disponible sur `http://localhost:5173`.

## Build & Production

```bash
# Construire l'application
pnpm build

# Démarrer en production
pnpm start
```

## Structure du projet

```
src/
├── common/
│   ├── db/
│   │   ├── schema.ts        # Schéma Drizzle (sales, purchases, products)
│   │   └── index.ts
│   ├── format/              # Formateurs de dates et montants (français)
│   └── hooks/               # Hooks partagés (useMutation, etc.)
├── features/
│   ├── auth/                # Authentification (session cookie HMAC)
│   ├── dashboard/           # Tableau de bord
│   ├── sales/               # Ventes
│   ├── purchases/           # Achats
│   ├── products/            # Produits / stock
│   └── taxes/               # Rapport fiscal
├── components/
│   └── layouts/             # PageLayout, TopHeader
└── routes/                  # Routes file-based TanStack Router
```

Chaque feature suit la convention :

| Fichier | Rôle |
|---|---|
| `api.server.ts` | Accès direct à la base de données (serveur uniquement) |
| `api.functions.ts` | Wrappers `createServerFn` (appelables depuis le client) |

## Authentification

Accès protégé par mot de passe unique. La session est stockée dans un cookie signé HMAC-SHA256, valable 7 jours. Toutes les routes redirigent vers `/login` si la session est absente ou invalide.

## Backlog

### Phase 1 — Quick Wins

- [ ] Ajouter la validation Zod sur les `inputValidator` des server functions
- [ ] Utiliser un `pgEnum` Drizzle pour les méthodes de paiement (`Bank` / `Cash`)
- [ ] Passer TypeScript en mode `strict: true`

### Phase 2 — Amélioration UX & Technique

- [ ] Remplacer `window.location.reload()` par des invalidations de cache (TanStack Query)
- [ ] Gestion d'erreurs structurée : `ErrorBoundary`, messages utilisateur (toasts)
