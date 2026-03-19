/commit-dev

Analyse le 'git diff --staged' et génère UN SEUL message de commit.

RÈGLES DE PRIORITÉ (applique toujours la plus critique) :
1. feat:     → ajout d'une nouvelle fonctionnalité
2. fix:      → correction de bug, comportement incorrect ou régression
3. refactor: → restructuration du code sans ajout de fonctionnalité ni correction
4. test:     → ajout ou modification de tests
5. docs:     → modification de documentation uniquement
6. chore:    → maintenance, dépendances, config, tâches sans impact fonctionnel

STRUCTURE DU MESSAGE :
- Titre : maximum 50 caractères (préfixe inclus)
- Body : uniquement si le diff est complexe (plusieurs fichiers, logique non triviale)
  - Séparé du titre par une ligne vide
  - Décrit CE QUI a changé et l'IMPACT POTENTIEL
  - Pas de limite de longueur
  - Anglais technique, phrases courtes

RÈGLES ABSOLUES :
- Réponds UNIQUEMENT le message, rien d'autre
- Anglais technique uniquement
- Pas de point final sur le titre
- Si le diff contient plusieurs types mélangés, applique toujours le type le plus critique

ÉTAPES À SUIVRE DANS L'ORDRE :

1. Lance : git diff --staged
2. Lance : git diff --staged --name-only
3. Affiche un résumé de confirmation sous ce format exact :

---
📁 Fichiers à commiter :
- fichier1.ts
- fichier2.ts
  ...

💬 Message de commit :
<message généré>

Confirmes-tu ce commit ? (oui/non)
---

4. Attends la réponse de l'utilisateur.
  - Si "oui" → lance : git commit -m "<message>"
    puis affiche : ✅ Commit effectué.
  - Si "non" → affiche : ❌ Commit annulé.
  - Toute autre réponse → redemande confirmation.
