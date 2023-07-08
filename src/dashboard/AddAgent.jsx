import { useState } from "react";
import { Sidebar } from "./../components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function AddAgent() {
  const [username, setusername] = useState(null);
  const [password, setpassword] = useState(null);
  const [matricule_agent, setmatricule_agent] = useState(null);
  const [nom, setnom] = useState(null);
  const [prenom, setprenom] = useState(null);
  const [poste, setposte] = useState("FIELDS_ENGINEER");
  const [service, setservice] = useState("SERVICE_HTC");

  // Définit la fonction de connexion qui vérifie si le nom d'utilisateur et le mot de passe sont valides et met à jour l'état de connexion en conséquence
  const creategent = async () => {
    if (
      username == null ||
      password == null ||
      matricule_agent == null ||
      nom == null ||
      prenom == null
    ) {
      return;
    }
    console.log(
      username,
      password,
      poste,
      matricule_agent,
      service,
      nom,
      prenom
    );
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/v1/agents", {
        method: "post",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          username: username,
          password: password,
          poste: poste,
          matricule_agent: matricule_agent,
          service: service,
          nom: nom,
          prenom: prenom,
        }),
      });
      if (response.status == 201) {
        toast.success("ajout effectué avec succès", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (response.status == 401) {
        const res = await response.json();
        toast.error(res.message, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error("Une erreur est survenue, veuillez réesayez plutard", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div>
      <main className="flex gap-x-12">
        <Sidebar />
        <div className="bg-[#F5F5F5] w-full ml-52 mt-20">
          <ToastContainer />
          <div className="px-8 py-4">
            <h2 className="font-bold text-4xl text-[#0071BC]">Nouvel agent</h2>
            <span className="text-lg">
              Enregistrer un nouvel agent dans le système
            </span>
            <hr className="mt-4 mb-12" />
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-[#0071BC]">
                  Matricule
                </label>
                <input
                  onChange={(e) => setmatricule_agent(e.target.value)}
                  type="text"
                  placeholder="Matricule"
                  className="border py-2 placeholder:capitalize uppercase rounded border-slate-500 px-2 w-full"
                />
              </div>
              <ToastContainer />
              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-[#0071BC]">Nom</label>
                <input
                  onChange={(e) => setnom(e.target.value)}
                  type="text"
                  placeholder="Nom"
                  className="border py-2 rounded border-slate-500 px-2 w-full"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-[#0071BC]">Prenom</label>
                <input
                  onChange={(e) => setprenom(e.target.value)}
                  type="text"
                  placeholder="Prenom"
                  className="border py-2 rounded border-slate-500 px-2 w-full"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-[#0071BC]">Poste</label>
                <select
                  onChange={(e) => setposte(e.target.value)}
                  className="border py-2 rounded border-slate-500 px-2 w-full"
                  name=""
                  id=""
                >
                  <option value={"FIELDS_ENGINEER"}>{"FIELDS_ENGINEER"}</option>
                  <option value={"FIELDS_SUPERVISOR"}>
                    {"FIELDS_SUPERVISOR"}
                  </option>
                  <option value={"SERVICE_PLANIFICATION"}>
                    {"SERVICE_PLANIFICATION"}
                  </option>
                  <option value={"ANALYSTE_MAINTENANCE"}>
                    {"ANALYSTE_MAINTENANCE"}
                  </option>
                </select>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-[#0071BC]">Service</label>
                <select
                  onChange={(e) => setservice(e.target.value)}
                  className="border py-2 rounded border-slate-500 px-2 w-full"
                  name=""
                  id=""
                >
                  <option value={"SERVICE_HTC"}>{"SERVICE_HTC"}</option>
                  <option value={"CLIENT_DIVERS"}>{"CLIENT_DIVERS"}</option>
                </select>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-[#0071BC]">Username</label>
                <input
                  onChange={(e) => setusername(e.target.value)}
                  type="text"
                  placeholder="Username"
                  className="border py-2 rounded border-slate-500 px-2 w-full"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-[#0071BC]">Password</label>
                <input
                  onChange={(e) => setpassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  className="border py-2 rounded border-slate-500 px-2 w-full"
                />
              </div>
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  await creategent();
                }}
                className="bg-[#0071BC] text-white py-2 w-full"
              >
                Enregistrer l'agent
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
