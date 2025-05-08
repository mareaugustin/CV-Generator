# Générateur de CV - Documentation

## 📋 Aperçu du Projet

Un générateur de CV moderne et intuitif permettant aux utilisateurs de créer, personnaliser et exporter leurs CV professionnels en quelques clics.


## 🚀 Fonctionnalités Principales

- Création de CV avec plusieurs modèles disponibles (Moderne, Classique, Minimaliste, Professionel)
- Interface utilisateur intuitive avec édition en temps réel
- Exportation en PDF
- Sauvegarde des CV
- Gestion des sections :
  - Informations personnelles
  - Expérience professionnelle
  - Formation
  - Compétences techniques et générales
  - Langues
  - Centres d'intérêt
 
    
## 🛠 Architecture Technique

### Frontend

- Technologies principales :
  
  - React avec TypeScript
  - Vite comme bundler
  - Tailwind CSS pour le styling
  - Radix UI pour les composants d'interface
  - FontAwesome pour les icônes
    
- Structure des composants :
  
  - ResumeBuilder : Composant principal pour la création de CV
  - ResumePreview : Prévisualisation en temps réel avec 4 templates
  - Formulaires modulaires pour chaque section du CV
  - Système de gestion d'état avec React Hooks
 
    
### Backend

- Technologies :
  
  - Node.js avec Express
  - MongoDB pour le stockage des données
  - Système d'authentification JWT
  
- Modèles de données :
  
  - Resume : Stockage des CV avec références utilisateur
  - Gestion des utilisateurs et authentification
 
    
## 🔧 Configuration du Projet

### Frontend
bash
'clonez le dépôt git clone https://github.com/mareaugustin/cv-generator.git

cd frontend
npm install
npm run dev

### Backend
cd backend
npm install
npm start


## 📝 Gestion des CV

### Modèles de CV Disponibles

- Moderne : Design contemporain avec mise en page en colonnes
- Classique : Style traditionnel et professionnel
- Minimaliste : Design épuré et minimaliste
- Professionel : Présentation professionnelle avec bande colorée
  
### Exportation

- Génération de PDF haute qualité
- Gestion intelligente des sauts de page
- Préservation de la mise en forme

  
## 🔒 Sécurité

- Authentification utilisateur
- Protection des routes API
- Validation des données

  
## 🌐 Déploiement

- Frontend déployable sur Vercel
- Configuration de redirection avec vercel.json
- Optimisation des performances avec Vite

  
## 📱 Responsive Design

- Interface adaptative pour tous les appareils
- Mise en page fluide avec Tailwind CSS
- Composants UI optimisés pour mobile

  
## 🛠 Maintenance et Support

- Version actuelle : 0.0.1
- Contact support : magilog.dev@gmail.com
- Slogan : "Du concept au code, avec méthode"

  
## 🤝 Contribution

Développé par Augustin Maré MILLOGO

## Licence libre
