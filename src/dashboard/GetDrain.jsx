import { useState } from "react";
import { Sidebar } from "./../components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

export function GetDrain() {
  const [traitements, settraitements] = useState([]);

  // Définit la fonction de connexion qui vérifie si le nom d'utilisateur et le mot de passe sont valides et met à jour l'état de connexion en conséquence
  const gettraitements = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://texapon-server.onrender.com/api/v1/traitements", {
        method: "get",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + token,
        },
      });
      if (response.status == 200) {
        settraitements(await response.json());
        console.log(traitements);
      }
    } catch (error) {
      toast.error("Une erreur est survenue, veuillez réesayez plutard", {
        position: "top-center",
        autoClose: 8000,
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
    gettraitements();

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
              Liste des vidanges planifiées
            </h2>
            <span className="text-lg">
              Afficher la liste de toutes les vidanges planifiées du mois
            </span>

            <hr className="mt-4 mb-12" />
            <div className="pb-4 flex justify-between items-center">
              <span>Total des vidanges : {traitements.length}</span>
            </div>
            <div className="flex flex-col space-y-4"></div>
            <table className="w-full ">
              <thead className="border bg-[#0071BC]">
                <tr className="">
                  <th className="border py-2 px-2 text-white">
                    Numero de série
                  </th>
                  <th className="border py-2 px-2 text-white">
                    Modèle générateur
                  </th>
                  <th className="border py-2 px-2 text-white">
                    Régime de fonctionnement
                  </th>
                  <th className="border py-2 px-2 text-white">Assigner à</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {traitements &&
                  traitements.map((traitement) => (
                    <tr key={traitement.id}>
                      <td className="border py-2 px-2">{traitement.serie}</td>
                      <td className="border py-2 px-2">
                        {traitement.model_generator}
                      </td>
                      <td className="border py-2 px-2">{traitement.regime}</td>
                      <td className="border py-2 px-2">
                        {traitement.name_agent}
                      </td>
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
