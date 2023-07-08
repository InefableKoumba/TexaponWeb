import { useState } from "react";

import { Sidebar } from "./../components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

export function GetZone() {
  const [zones, setzones] = useState([]);

  // Définit la fonction de connexion qui vérifie si le nom d'utilisateur et le mot de passe sont valides et met à jour l'état de connexion en conséquence
  const getzone = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/v1/zones", {
        method: "get",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + token,
        },
      });
      if (response.status == 200) {
        setzones(await response.json());
        console.log(zones);
      }
    } catch (error) {
      toast.error("Une erreur est survenue, veuillez réesayez plutard", {
        position: "top-center",
        autoClose: 15000,
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
    getzone();

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
              Liste des zones
            </h2>
            <span className="text-lg">
              Afficher la liste de toutes les zones
            </span>
            <hr className="mt-4 mb-12" />
            <div className="pb-4 flex justify-between items-center">
              <span>Total des zones : {zones.length}</span>
            </div>
            <div className="flex flex-col space-y-4"></div>
            <table className="w-full ">
              <thead className="border bg-[#0071BC]">
                <tr className="">
                  <th className="border py-2 px-2 text-white">
                    Nom de la zone
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {zones &&
                  zones.map((zone) => (
                    <tr key={zone.zone_id}>
                      <td className="border py-2 px-2">{zone.name_zone}</td>
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
