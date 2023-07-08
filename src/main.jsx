import React from 'react'; // Importe la bibliothèque React
import ReactDOM from 'react-dom/client'; // Importe la bibliothèque ReactDOM
import './index.css'; // Importe le fichier CSS pour le style de la page
import App from './App'; // Importe le composant App

// Crée une racine de rendu pour l'application en utilisant la méthode createRoot de ReactDOM
// L'élément du DOM avec l'ID "root" sera utilisé comme racine
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> {/* Utilise le mode Strict de React */}
    <App /> {/* Rend le composant App dans le mode Strict */}
  </React.StrictMode>,
);
