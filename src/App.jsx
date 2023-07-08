// Importer useState depuis la librairie react
import { useEffect, useState } from "react";
// Importer les composants Dashboard et Login
import { Dashboard } from "./Dashboard";
import { Login } from "./LoginPage";

// Définir le composant App
function App() {
  // Initialiser le state isLoggedIn à false en utilisant useState
  const [isLoggedIn, setisLoggedIn] = useState(false);
  // Si l'utilisateur est connecté, afficher le composant Dashboard
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setisLoggedIn(true);
    }
    return () => null;
  }, [isLoggedIn]);

  if (isLoggedIn == true) {
    return <Dashboard setisLoggedIn={setisLoggedIn} />;
  }
  // Sinon, afficher le composant Login
  else {
    return <Login setisLoggedIn={setisLoggedIn} />;
  }
}

// Exporter le composant App
export default App;
