# Cahier des Charges pour le Projet FSolver

## Introduction

Le projet FSolver vise à créer une application web interactive basée sur le site fsolver.fr, qui propose des solutions à des grilles de mots fléchés et mots croisés. L'application sera développée en utilisant les technologies React, Tailwind CSS, Shadcn/ui, et Next.js pour offrir une expérience utilisateur fluide et réactive.

## Objectifs du Projet

- Fournir une plateforme pour résoudre des mots fléchés et mots croisés.
- Permettre aux utilisateurs de créer, partager, et résoudre des puzzles.
- Intégrer des fonctionnalités sociales comme les commentaires, les votes, et les notifications.
- Offrir une expérience utilisateur moderne et intuitive.

## Fonctionnalités

### 1. Authentification et Gestion des Utilisateurs

- **Inscription et Connexion** : Les utilisateurs peuvent s'inscrire et se connecter via un formulaire ou via des services tiers comme Google ou Facebook.
- **Profil Utilisateur** : Les utilisateurs peuvent voir et modifier leur profil, incluant leur nom d'utilisateur, leur email, et leur avatar.
- **Rôles** : Les utilisateurs peuvent avoir différents rôles (USER, ADMIN, MODERATOR) avec des permissions spécifiques.

**Appel d'API** :
- `POST /api/auth/register` : Inscription d'un nouvel utilisateur.
- `POST /api/auth/login` : Connexion d'un utilisateur existant.
- `GET /api/users/{id}` : Récupération des informations de profil d'un utilisateur.
- `PUT /api/users/{id}` : Mise à jour des informations de profil d'un utilisateur.

### 2. Gestion des Mots

- **Ajout de Mots** : Les utilisateurs peuvent ajouter de nouveaux mots avec des définitions, des catégories, et des niveaux de difficulté.
- **Recherche de Mots** : Les utilisateurs peuvent rechercher des mots en utilisant des filtres comme la catégorie et la difficulté.
- **Affichage des Mots** : Les mots peuvent être affichés avec leurs définitions, les votes, et les commentaires associés.

**Appel d'API** :
- `POST /api/words` : Ajout d'un nouveau mot.
- `GET /api/words` : Recherche de mots avec des paramètres de filtrage.
- `GET /api/words/{id}` : Récupération des détails d'un mot spécifique.

### 3. Puzzles et Devinettes

- **Création de Puzzles** : Les utilisateurs peuvent créer des puzzles avec des indices et des réponses.
- **Résolution de Puzzles** : Les utilisateurs peuvent résoudre des puzzles créés par d'autres utilisateurs ou eux-mêmes.
- **Historique des Tentatives** : Les utilisateurs peuvent voir leurs tentatives passées et leurs scores.

**Appel d'API** :
- `POST /api/puzzles` : Création d'un nouveau puzzle.
- `GET /api/puzzles` : Liste des puzzles disponibles.
- `GET /api/puzzles/{id}` : Détails d'un puzzle spécifique.
- `POST /api/puzzles/{id}/attempts` : Soumission d'une tentative de résolution d'un puzzle.

### 4. Fonctionnalités Sociales

- **Commentaires** : Les utilisateurs peuvent commenter les mots et les puzzles.
- **Votes** : Les utilisateurs peuvent voter pour les mots et les puzzles.
- **Notifications** : Les utilisateurs peuvent recevoir des notifications pour les interactions sociales (commentaires, votes, etc.).

**Appel d'API** :
- `POST /api/comments` : Ajout d'un nouveau commentaire.
- `GET /api/comments/{wordId}` : Récupération des commentaires d'un mot ou d'un puzzle.
- `POST /api/votes` : Soumission d'un vote pour un mot ou un puzzle.
- `GET /api/notifications` : Récupération des notifications d'un utilisateur.

### 5. Sauvegarde et Historique

- **Sauvegarde des Recherches** : Les utilisateurs peuvent sauvegarder leurs recherches pour un accès rapide ultérieur.
- **Historique des Sessions de Jeu** : Les utilisateurs peuvent voir leurs sessions de jeu passées et leurs performances.

**Appel d'API** :
- `POST /api/saved-searches` : Sauvegarde d'une recherche.
- `GET /api/saved-searches/{userId}` : Récupération des recherches sauvegardées d'un utilisateur.
- `GET /api/game-sessions/{userId}` : Récupération des sessions de jeu d'un utilisateur.

## Expérience Utilisateur (UX)

### Interface Utilisateur

- **Design Réactif** : L'interface sera conçue pour être réactive et fonctionner de manière optimale sur divers appareils (ordinateurs, tablettes, smartphones).
- **Navigation Intuitive** : Une barre de navigation claire et simple pour accéder aux différentes sections de l'application (Accueil, Puzzles, Mots, Profil, etc.).
- **Feedback Visuel** : Des animations et des retours visuels pour guider l'utilisateur à travers l'application.

### Fonctionnalités UX Clés

- **Recherche Avancée** : Une interface de recherche avancée avec des filtres pour les catégories, les difficultés, et les mots-clés.
- **Affichage des Résultats** : Les résultats de recherche seront affichés de manière claire avec des options de tri et de pagination.
- **Interactivité** : Les utilisateurs pourront interagir avec les mots et les puzzles en votant, commentant, et partageant.

## Technologies Utilisées

### Frontend

- **React** : Utilisé pour créer des composants réutilisables et gérer l'état de l'application.
- **Next.js** : Utilisé pour le rendu côté serveur (SSR) et la génération de sites statiques (SSG), améliorant les performances et le SEO.
- **Tailwind CSS** : Utilisé pour le style de l'application avec un système de classes utilitaires.
- **Shadcn/ui** : Utilisé pour des composants UI prédéfinis qui s'intègrent bien avec Tailwind CSS.

### Backend

- **API RESTful** : Utilisée pour gérer les interactions entre le frontend et le backend.
- **Base de Données** : Une base de données relationnelle (comme PostgreSQL) pour stocker les données des utilisateurs, des mots, des puzzles, et des interactions sociales.

## Architecture Technique

### Structure de l'Application

- **Frontend** : Composé de composants React, géré par Next.js, et stylé avec Tailwind CSS et Shadcn/ui.
- **Backend** : API RESTful avec des endpoints pour gérer les utilisateurs, les mots, les puzzles, et les interactions sociales.
- **Base de Données** : Structure de base de données relationnelle pour stocker et gérer les données.

### Flux de Données

- Les utilisateurs interagissent avec l'interface frontend.
- Les requêtes sont envoyées à l'API RESTful via des appels HTTP.
- L'API interagit avec la base de données pour récupérer ou mettre à jour les données.
- Les réponses sont envoyées au frontend pour mise à jour de l'interface utilisateur.

## Conclusion

Ce cahier des charges détaille les objectifs, les fonctionnalités, l'expérience utilisateur, et l'utilisation des technologies pour le projet FSolver. L'application vise à offrir une plateforme interactive et engageante pour les amateurs de mots fléchés et mots croisés, tout en intégrant des fonctionnalités sociales et une interface utilisateur moderne et intuitive.
