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
| Runtime | [Bun](https://bun.sh) |
| Framework | [TanStack Start](https://tanstack.com/start) + [Solid.js](https://www.solidjs.com) (SSR) |
| Routing | TanStack Solid Router (file-based) |
| Data fetching | TanStack Solid Query |
| ORM | Drizzle ORM |
| Base de données | PostgreSQL |
| CSS | Tailwind CSS v4 |
| Linter/Formatter | Biome |

## Prérequis

- [Bun](https://bun.sh) ≥ 1.0
- PostgreSQL

## Installation

```bash
# Installer les dépendances
bun install

# Copier le fichier d'environnement
cp .env.example .env
```

Renseigner les variables dans `.env` :

```env
# URL de connexion PostgreSQL
DATABASE_URL="postgresql://DB_USERNAME:DB_PASSWORD@DB_HOST:DB_PORT/DB_NAME"

# Hash du mot de passe de l'application
# Générer avec : bun -e "console.log(Buffer.from(await Bun.password.hash('VOTRE_MOT_DE_PASSE')).toString('hex'))"
APP_PASSWORD_HEX=YOUR_PASSWORD_HASHED

# Clé secrète de session
# Générer avec : bunx auth@latest secret
SESSION_SECRET_HEX=YOUR_GENERATED_SECRET
```

## Développement

```bash
bun run dev
```

L'application est disponible sur `http://localhost:5173`.

## Build & Production

```bash
# Construire l'application
bun run build

# Démarrer en production
bun run start
```

## Structure du projet

```
src/
├── common/
│   ├── db/
│   │   ├── schema.ts        # Schéma Drizzle (sales, purchases, products)
│   │   └── index.ts
│   └── format/              # Formateurs de dates et montants (français)
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
| `api.queries.ts` | `queryOptions` pour TanStack Query |

## Authentification

Accès protégé par mot de passe unique. La session est stockée dans un cookie signé HMAC-SHA256, valable 7 jours. Toutes les routes redirigent vers `/login` si la session est absente ou invalide.

## Backlog

- Supprimer le type `SaleData` et utiliser inference types drizzle et zod
- Utiliser des schémas Zod dans les `inputValidator` des server functions
