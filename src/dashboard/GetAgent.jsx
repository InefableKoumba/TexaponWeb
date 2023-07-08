import { useState } from "react";
import { TopBar } from "./../components/TopBar";
import { Sidebar } from "./../components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

export function GetAgent() {
  const [agents, setagents] = useState([]);

  // Définit la fonction de connexion qui vérifie si le nom d'utilisateur et le mot de passe sont valides et met à jour l'état de connexion en conséquence
  const getagent = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/v1/agents", {
        method: "get",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + token,
        },
      });
      if (response.status == 200) {
        setagents(await response.json());
        console.log(agents);
      }
    } catch (error) {
      toast.error("Une erreur est survenue, veuillez réesayez plutard", {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  useEffect(() => {
    getagent();

    return () => null;
  }, []);

  return (
    <div>
      <main className="flex gap-x-12">
        <Sidebar />
        <div className="bg-[#F5F5F5] w-full ml-52 mt-20">
          <ToastContainer />
          <div className="px-8 py-4">
            <h2 className="font-bold text-4xl text-[#0071BC]">
              Liste des agents
            </h2>
            <span className="text-lg">
              Afficher la liste de tous les agents
            </span>
            <hr className="mt-4 mb-12" />
            <div className="pb-4 flex justify-between items-center">
              <span>Total des agents : {agents.length}</span>
            </div>
            <div className="flex flex-col space-y-4"></div>
            <table className="w-full ">
              <thead className="border bg-[#0071BC]">
                <tr className="">
                  <th className="border py-2 px-2 text-white">Matricule</th>
                  <th className="border py-2 px-2 text-white">Nom</th>
                  <th className="border py-2 px-2 text-white">Prenom</th>
                  <th className="border py-2 px-2 text-white">Poste</th>
                  <th className="border py-2 px-2 text-white">Service</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {agents &&
                  agents.map((agent) => (
                    <tr key={agent.matricule_agent}>
                      <td className="border py-2 px-2">
                        {agent.matricule_agent}
                      </td>
                      <td className="border py-2 px-2">{agent.nom}</td>
                      <td className="border py-2 px-2">{agent.prenom}</td>
                      <td className="border py-2 px-2">{agent.poste}</td>
                      <td className="border py-2 px-2">{agent.service}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
