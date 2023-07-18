import { useState } from "react"; // Importe la fonction useState de React
import logo from "./assets/logo.png"; // Importe le logo de l'application
import logoss from "./assets/logoss.png"; // Importe le logo de l'entreprise
import dangerLogo from "./assets/danger.png"; // Importe le logo pour les messages d'erreur

// Définit le composant Login
export function Login(props) {
  // Initialise les variables d'état pour le nom d'utilisateur, le mot de passe, l'accès à la connexion et les mauvaises informations d'identification
  const [username, setusername] = useState(null);
  const [password, setpassword] = useState(null);
  const [isAllowedToLogin, setisAllowedToLogin] = useState(true);
  const [badCredentials, setbadCredentials] = useState(false);

  // Définit la fonction de connexion qui vérifie si le nom d'utilisateur et le mot de passe sont valides et met à jour l'état de connexion en conséquence
  const login = async () => {
    if (username == null || password == null) {
      return;
    }
    try {
      const response = await fetch(
        "https://texapon-server.onrender.com/api/authentification/login",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );
      if (response.status == 201) {
        setbadCredentials(false);
        const agent = await response.json();
        if (
          agent.poste !== "SERVICE_PLANIFICATION" &&
          agent.poste !== "ANALYSTE_MAINTENANCE"
        ) {
          setisAllowedToLogin(false);
          return;
        } else {
          props.setisLoggedIn(true);
          setisAllowedToLogin(true);
          localStorage.setItem("token", agent.token);
          console.log(agent.token);
        }
      } else {
        setbadCredentials(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Rend le formulaire de connexion avec le logo, le titre, les messages d'erreur éventuels et les champs pour le nom d'utilisateur et le mot de passe
  // Le bouton de connexion déclenche la fonction login lorsqu'il est cliqué
  return (
    <div>
      <form className="flex flex-col items-center space-y-4 w-1/3 mx-auto mt-4 text-center">
        <img src={logo} alt="logo" className="h-40 w-40" />

        <h1 className="font-bold text-xl text-[#0071BC]">TEXAPON-MANAGEMENT</h1>
        <h3 className=" text-xl text-[#0071BC]">Identifiez-vous</h3>
        {!isAllowedToLogin ? (
          <div className="text-white flex items-center justify-center gap-x-4 bg-red-600 rounded w-full px-4 py-4">
            <div>
              <img src={dangerLogo} alt="logo" className="h-18" />
            </div>
            <div className="text-ml">
              Vous ne disposez pas des droits requis pour accéder à cette
              application
            </div>
          </div>
        ) : null}
        {badCredentials ? (
          <div className="text-white flex items-center justify-center gap-x-4 bg-red-600 rounded w-full px-4 py-4">
            Username ou mot de passe incorrect
          </div>
        ) : null}
        <input
          onChange={(e) => setusername(e.target.value)}
          type="text"
          placeholder="Username"
          className="border py-2 rounded border-slate-500 px-2 w-full"
        />
        <input
          onChange={(e) => setpassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="border rounded border-slate-500 py-2 px-2 w-full"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            login();
          }}
          className="bg-[#0071BC] text-white border rounded border-slate-500 py-2 w-full"
        >
          Connexion
        </button>
        <img src={logoss} alt="logo" className="pt-5 pb-5" />
      </form>
    </div>
  );
}
