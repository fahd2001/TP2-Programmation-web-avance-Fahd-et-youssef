# TP2 – Programmation Web Avancée  
Projet : Application e-commerce "livresgourmands.net"  
Auteurs : Fahd et Youssef  
Cégep : Institut Grasset – 420-WA6-AG  
Session : Automne 2025

---

## 1. Description du projet

Ce projet consiste à développer une application web e-commerce complète, permettant la consultation, l’ajout au panier et l’achat d’ouvrages culinaires via un système d’authentification basique et un paiement simulé.

Le site propose :
- Un catalogue de livres gourmands
- Une page détaillée pour chaque produit
- La gestion d’un panier d’achat
- Un système d’inscription et de connexion
- Un paiement simulé (popup bancaire, Stripe test)
- Une architecture complète Frontend + Backend

---

## 2. Fonctionnalités

### Frontend (React)
- Page d’accueil avec catalogue dynamique
- Page produit reliée par ID
- Panier persisté (localStorage)
- Ajout, retrait et mise à jour des quantités
- Connexion et inscription utilisateurs
- Déconnexion avec réinitialisation du panier
- Paiement simulé ou via Stripe test
- Navigation dynamique selon l’état utilisateur (connecté ou non)
- Interface simple utilisant Bootstrap

### Backend (Node.js + Express)
- API REST exposant les ouvrages
- Routes d’authentification (login/register)
- Validation basique des données
- Simulateur de paiement
- Utilisation de fichiers JSON pour stocker les données mock

---

## 3. Technologies utilisées

### Frontend
- React
- React Router
- Context API (Panier et Authentification)
- Bootstrap
- Fetch API

### Backend
- Node.js
- Express.js
- CORS
- Dotenv

### Paiement
- Stripe.js (mode test)
- Simulation interne d’une carte bancaire

---

## 4. Installation et exécution

### Backend
cd Backend
npm install
node server.js

bash
Copy code

Adresse du serveur :
http://localhost:3000

yaml
Copy code

---

### Frontend
cd Frontend
npm install
npm run dev

bash
Copy code

Adresse du site :
http://localhost:5173

yaml
Copy code

---

## 5. Structure du projet

TP2-Programmation-web-avance/
│
├── Backend/
│ ├── server.js
│ ├── routes/
│ ├── controllers/
│ ├── data/
│ ├── auth.routes.js
│ ├── ouvrages.routes.js
│ └── .env
│
├── Frontend/
│ ├── src/
│ │ ├── api/
│ │ ├── components/
│ │ ├── context/
│ │ ├── pages/
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── styles/
│ └── public/
│
└── README.md

yaml
Copy code

---

## 6. Paiement (simulation et Stripe)

Le système de paiement fonctionne de deux manières :

### Paiement simulé :
- Ouverture d’un popup bancaire
- Saisie d’informations fictives
- Validation locale
- Redirection vers un message de succès ou d’erreur

### Stripe (mode test) :
- Chargement de Stripe.js
- Validation côté client
- Redirection vers les pages de confirmation

---

## 7. Authentification

- Inscription et connexion via l’API backend
- Sauvegarde du token et de l’utilisateur dans localStorage
- Mise à jour automatique de la barre de navigation
- Déconnexion complète supprimant toutes les données locales

---

## 8. Auteurs

Fahd Mammou  
Youssef Bssat  
Cours : Programmation Web Avancée – Institut Grasset

---

## 9. Licence

Projet académique dans le cadre du cours 420-WA6-AG.  
Non destiné à un usage commercial.
