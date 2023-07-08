import { useState } from "react";
import { Sidebar } from "./../components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

export function GetSite() {
  const [sites, setsites] = useState([]);

  // Définit la fonction de connexion qui vérifie si le nom d'utilisateur et le mot de passe sont valides et met à jour l'état de connexion en conséquence
  const getsitesData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/v1/sites", {
        method: "get",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + token,
        },
      });
      if (response.status == 200) {
        setsites(await response.json());
        console.log(sites);
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
    getsitesData();
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
              Liste des sites
            </h2>
            <span className="text-lg">Afficher la liste de tous les sites</span>
            <hr className="mt-4 mb-12" />
            <div className="pb-4 flex justify-between items-center">
              <span>Total des sites : {sites.length}</span>
            </div>
            <div className="flex flex-col space-y-4"></div>
            <table className="w-full ">
              <thead className="border bg-[#0071BC]">
                <tr className="">
                  <th className="border py-2 px-2 text-white">ID du site</th>
                  <th className="border py-2 px-2 text-white">Nom du site</th>
                  <th className="border py-2 px-2 text-white">Site SNE</th>
                  <th className="border py-2 px-2 text-white">Zone du site</th>
                  <th className="border py-2 px-2 text-white">Owner du site</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {sites &&
                  sites.map((data) => (
                    <tr key={data.id_site}>
                      <td className="border py-2 px-2">{data.id_site}</td>
                      <td className="border py-2 px-2">{data.name}</td>
                      <td className="border py-2 px-2">
                        {data.site_sne ? "Oui" : "Non"}
                      </td>
                      <td className="border py-2 px-2">{data.zone}</td>
                      <td className="border py-2 px-2">{data.owner}</td>
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
