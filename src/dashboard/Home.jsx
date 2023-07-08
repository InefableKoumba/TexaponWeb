import { useState, useEffect } from "react";
import { Sidebar } from "./../components/Sidebar";

import { Link } from "react-router-dom";

const months = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

export function Home() {
  const [traitements, setTraitements] = useState([]);
  const [vidanges, setvidanges] = useState([]);
  const [vidangesRetard, setvidangesRetard] = useState(0);

  const getTraitements = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/v1/traitements", {
        method: "get",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + token,
        },
      });
      if (response.status == 200) {
        const data = await response.json();
        setTraitements(data);
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
  const getVidangesOfThisMonth = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3000/api/v1/vidanges/byMonth/" +
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
    getTraitements();
    getVidangesOfThisMonth();

    return () => null;
  }, []);

  return (
    <div>
      <main className="flex gap-x-12">
        <div className="">
          <Sidebar />
        </div>
        <div className="bg-[#F5F5F5] w-full ml-52 mt-20">
          <div className="px-8 py-4">
            <h2 className="font-bold text-4xl text-[#0071BC]">Dashboard</h2>
            <div className="flex flex-col lg:flex-row justify-between">
              <span className="text-2xl ">
                Bienvenue sur le menu management de Texapon
              </span>
              <span className="font-bold text-[#0071BC] text-xl">
                Compagne de {months[new Date().getUTCMonth()]}
              </span>
            </div>
            <hr className="mt-4 mb-12" />
            <div className="flex gap-x-4">
              <div className="flex flex-col justify-center items-center p-12 border bg-white rounded-lg ">
                <span className="text-4xl font-bold mb-4 text-[#0071BC]">
                  {vidanges.length}
                </span>
                <span className="text-lg text-[#0071BC] font-bold">
                  <Link to="/details_vidanges">Vidanges exécutées</Link>
                </span>
              </div>
              <div className="flex flex-col justify-center items-center p-12 border bg-white rounded-lg ">
                <span className="text-4xl font-bold mb-4 text-[#0071BC]">
                  {vidangesRetard}
                </span>
                <span className="text-lg text-[#0071BC] font-bold">
                  <Link to="/details_vidanges">Vidanges en dépassements</Link>
                </span>
              </div>
              <div className="flex flex-col justify-center items-center p-12 border bg-white rounded-lg ">
                <span className="text-4xl font-bold mb-4 text-[#0071BC]">
                  {traitements.length}
                </span>
                <span className="text-lg text-[#0071BC] font-bold">
                  <Link to="/getsite">Total des sites</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
