# Sanreabox

Bac à sable React Native / Expo (SDK 57, Expo Router) : un squelette d'app mobile qui
réunit onboarding, authentification, tab bar, drawer, un tableau de bord SaaS et une
marketplace. **Interface uniquement** — aucun backend, les données sont factices et l'état
(session, panier) vit en mémoire.

## Démarrer

```bash
npm install
npx expo start        # puis i (iOS), a (Android) ou w (web)
```

## Parcours

Onboarding (3 étapes) → connexion / inscription → app.

- **Tab bar** : Accueil, Explorer, Favoris, Profil
- **Drawer** : utilisateur en haut, liens (Accueil, Tableau de bord, Marketplace,
  Paramètres), déconnexion en bas
- **SaaS** : tableau de bord avec cartes de statistiques, paramètres
- **Marketplace** : liste de produits avec recherche, détail produit, panier, profil vendeur

N'importe quel email et mot de passe sont acceptés à la connexion.

## Structure

```
src/
├── app/                    routes (Expo Router)
│   ├── _layout.tsx         layout racine : providers + routes protégées
│   ├── onboarding.tsx
│   ├── (auth)/             login, register
│   ├── (drawer)/           drawer : dashboard, marketplace, settings
│   │   └── (tabs)/         index, explore, favorites, profile
│   ├── product/[id].tsx
│   ├── seller/[id].tsx
│   ├── cart.tsx
│   └── +not-found.tsx
├── components/             composants d'écran, et ui/ pour les briques réutilisables
├── constants/              theme.ts (couleurs, espacements), mock-data.ts
└── hooks/                  use-auth, use-cart, use-theme
```

## Brancher un backend

- Authentification : remplacer le corps de `signIn` / `signUp` / `signOut` dans
  `src/hooks/use-auth.tsx`.
- Données : remplacer `src/constants/mock-data.ts`.
- Paiement : le bouton « Passer la commande » de `src/app/cart.tsx` est désactivé en attendant.

## Vérifier

```bash
npx tsc --noEmit
npx expo lint
```
