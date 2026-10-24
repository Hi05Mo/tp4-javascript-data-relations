# Application JavaScript structurée avec données liées

## Description

Ce projet consiste à développer une application web en JavaScript permettant de manipuler des données liées entre plusieurs fichiers JSON.

L'application utilise une architecture modulaire afin de séparer la gestion des données, les traitements et l'affichage.

## Objectifs

- Organiser un projet JavaScript en plusieurs modules.
- Charger des données depuis des fichiers JSON de manière asynchrone.
- Comprendre les relations entre les clients, les produits et les commandes.
- Manipuler les tableaux et les objets JavaScript.
- Utiliser les méthodes `map()`, `filter()`, `find()` et `reduce()`.
- Afficher dynamiquement les données dans une page HTML.
- Utiliser Git pour suivre les étapes du développement.

## Technologies utilisées

- HTML5
- CSS3
- JavaScript (ES Modules)
- JSON

## Structure du projet

```text
TP4/
├── index.html
├── README.md
├── CSS/
│   └── style.css
├── data/
│   ├── customers.json
│   ├── products.json
│   └── orders.json
└── js/
    ├── app.js
    ├── state.js
    ├── dataService.js
    ├── selectors.js
    └── view.js
```

## Organisation des modules

- **state.js** : gère l'état de l'application.
- **dataService.js** : charge les données depuis les fichiers JSON.
- **selectors.js** : recherche les données liées et effectue les calculs nécessaires.
- **view\.js** : gère l'affichage dynamique des données.
- **app.js** : initialise l'application et coordonne les différents modules.

## Modèle de données

L'application repose sur trois ensembles de données :

- **Customers** : informations relatives aux clients.
- **Products** : informations relatives aux produits.
- **Orders** : commandes associées aux clients et contenant les produits commandés.

Les identifiants permettent d'établir les relations entre les différentes données.

## Lancement du projet

1. Ouvrir le dossier du projet dans Visual Studio Code.
2. Installer l'extension **Live Server** si nécessaire.
3. Ouvrir `index.html` avec Live Server.
4. Consulter l'application dans le navigateur.

> L'utilisation d'un serveur local est recommandée pour permettre le chargement des fichiers JSON avec `fetch()`.

