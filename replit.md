# SIMMO 2.0 GESTION

## Vue d'ensemble
Application de gestion de tontines et paiements avec authentification multi-utilisateurs via Firebase.

## État actuel
- ✅ Serveur Express configuré sur port 5000
- ✅ Authentification Firebase activée
- ✅ Navigation mobile style iOS avec effet glassmorphism
- ✅ Progressive Web App (PWA) avec Service Worker
- ✅ Responsive design (desktop et mobile)

## Fonctionnalités principales
1. **Authentification** - Connexion/Inscription via Firebase Auth
2. **Gestion des membres** - Ajout, modification, recherche de membres
3. **Gestion des lots** - Lots immobiliers avec détails et statuts
4. **Paiements** - Suivi des paiements mensuels
5. **Statistiques** - Tableaux de bord et graphiques
6. **Export PDF** - Export des données et rapports

## Navigation Mobile
La navigation mobile utilise un style iOS moderne avec:
- Barre de navigation fixe en bas (toujours visible)
- Effet glassmorphism (blur + transparence)
- Animations fluides
- Support des safe areas (iPhone avec encoche)

## Technologies
- **Frontend**: HTML5, CSS3, JavaScript Vanilla
- **Backend**: Node.js + Express
- **Database**: Firebase Realtime Database
- **Auth**: Firebase Authentication
- **PWA**: Service Worker pour mode offline

## Structure du projet
- `server.js` - Serveur Express
- `login.html` - Page de connexion/inscription
- `index.html` - Application principale
- `script.js` - Logique applicative (PaymentManager)
- `mobile-glass-nav.css` - Styles navigation mobile iOS
- `styles.css` / `styles.mobile.css` - Styles principaux

## Configuration
Le serveur est configuré pour écouter sur `0.0.0.0:5000` pour la compatibilité Replit.

## Notes de sécurité
Firebase est configuré avec authentification par utilisateur. Chaque utilisateur a ses propres données isolées dans la Realtime Database.
