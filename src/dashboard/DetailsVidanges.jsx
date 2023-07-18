import { useState } from "react";
import { Sidebar } from "./../components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

export function DetailsVidanges() {
  const [vidanges, setvidanges] = useState([]);
  const [vidangesRetard, setvidangesRetard] = useState(0);

  const getVidangesOfThisMonth = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://texapon-server.onrender.com/api/v1/vidanges/byMonth/" +
        new Date().getUTCMonth() +
        "/" +
        new Date().getFullYear(),
        {
          method: "get",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status == 200) {
        const data = await response.json();
        setvidanges(data);
        let temp = 0;
        for (const vidange of data) {
          if (vidange.nbre_heures_retard > 0) temp++;
        }
        setvidangesRetard(temp);
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
    getVidangesOfThisMonth();

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
              Liste des vidanges
            </h2>
            <span className="text-lg">
              Afficher la liste de toutes les vidanges
            </span>
            <hr className="mt-4 mb-12" />
            <div className="pb-4 flex justify-between items-center">
              <span>Total des vidanges : {vidanges.length}</span>
            </div>
            <div className="flex flex-col space-y-4"></div>
            <table className="w-full ">
              <thead className="border bg-[#0071BC]">
                <tr className="">
                  <th className="border py-2 px-2 text-white">ID du site</th>
                  <th className="border py-2 px-2 text-white">Nom du site</th>
                  <th className="border py-2 px-2 text-white">Date vidange</th>
                  <th className="border py-2 px-2 text-white">
                    Nbre d'heures vidange
                  </th>
                  <th className="border py-2 px-2 text-white">Assigner à</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {vidanges &&
                  vidanges.map((vidange) => (
                    <tr
                      key={vidange.id}
                      className={`${vidange.nbre_heures_retard > 0
                          ? "bg-red-500 text-white"
                          : ""
                        }`}
                    >
                      <td className="border py-2 px-2">
                        {vidange["traitement"]["generator"]["Site"].id_site}
                      </td>
                      <td className="border py-2 px-2">
                        {vidange["traitement"]["generator"]["Site"].name}
                      </td>
                      <td className="border py-2 px-2">{vidange.date_exec}</td>
                      <td className="border py-2 px-2">
                        {vidange.nbre_heures}
                      </td>
                      <td className="border py-2 px-2">
                        {vidange["traitement"]["agent"].prenom +
                          " " +
                          vidange["traitement"]["agent"].nom}
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
