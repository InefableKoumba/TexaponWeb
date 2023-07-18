import { Sidebar } from "./../components/Sidebar";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function AddSite() {
  const [data, setData] = useState([]);
  const [id_site, setid_site] = useState(null);
  const [name, setname] = useState(null);
  const [site_sne, setsite_sne] = useState(true);
  const [matricule_agent, setmatricule_agent] = useState(null);
  const [zone_id, setzone_id] = useState(null);

  // Définit la fonction de connexion qui vérifie si le nom d'utilisateur et le mot de passe sont valides et met à jour l'état de connexion en conséquence

  const get_data_to_create_site = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://texapon-server.onrender.com/api/v1/get_data_to_create_site",
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status == 200) {
        const data = await response.json();
        console.log(data);
        setData(data);
        setzone_id(data.zones[0].zone_id);
        setmatricule_agent(data.agents[0].matricule_agent);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const createsite = async () => {
    console.log(id_site, name, site_sne, matricule_agent, zone_id);

    if (
      id_site == null ||
      name == null ||
      site_sne == null ||
      matricule_agent == null ||
      zone_id == null
    ) {
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://texapon-server.onrender.com/api/v1/sites", {
        method: "post",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          id_site: id_site,
          name: name,
          site_sne: site_sne,
          matricule_agent: matricule_agent,
          zone_id: parseInt(zone_id),
        }),
      });
      if (response.status == 201) {
        toast.success("ajout du site effectué avec succès", {
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

  useEffect(() => {
    get_data_to_create_site();
    console.log(data);
    return () => {
      null;
    };
  }, []);

  return (
    <div>
      <main className="flex gap-x-12">
        <Sidebar />
        <div className="bg-[#F5F5F5] w-full ml-52 mt-20">
          <ToastContainer />
          <div className="px-8 py-4">
            <h2 className="font-bold text-4xl text-[#0071BC]">Nouveau site</h2>
            <span className="text-lg">
              Ajouter un nouveau site dans le système
            </span>
            <hr className="mt-4 mb-12" />
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-[#0071BC]">
                  ID du site
                </label>
                <input
                  onChange={(e) => setid_site(e.target.value)}
                  className="border py-2 rounded border-slate-500 px-2 w-full"
                  placeholder="Id du site"
                />
              </div>
              <ToastContainer />
              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-[#0071BC]">
                  Nom du site
                </label>
                <input
                  onChange={(e) => setname(e.target.value)}
                  type="text"
                  placeholder="Nom du site"
                  className="border py-2 rounded border-slate-500 px-2 w-full"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-[#0071BC]">
                  ID de la zone
                </label>
                <select
                  onChange={(e) => setzone_id(e.currentTarget.value)}
                  className="border py-2 rounded border-slate-500 px-2 w-full"
                  placeholder="Nom de la zone"
                  name=""
                  id=""
                >
                  {data.zones &&
                    data.zones.map((zone, i) => (
                      <option key={i} value={zone.zone_id}>
                        {zone.name_zone}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-[#0071BC]">Site SNE</label>
                <select
                  onChange={(e) => setsite_sne(!site_sne)}
                  className="border py-2 rounded border-slate-500 px-2 w-full"
                  name=""
                  id=""
                >
                  <option value={true}>{"OUI"}</option>
                  <option value={false}>{"NON"}</option>
                </select>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-[#0071BC]">
                  Matricule de l'agent
                </label>
                <select
                  onChange={(e) => setmatricule_agent(e.currentTarget.value)}
                  className="border py-2 rounded border-slate-500 px-2 w-full"
                  name=""
                  id=""
                  placeholder="Nom de l'agent"
                >
                  {data.agents &&
                    data.agents.map((agent, i) => (
                      <option key={i} value={agent.matricule_agent}>
                        {agent.nom} {agent.prenom}
                      </option>
                    ))}
                </select>
              </div>
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  await createsite();
                }}
                className="bg-[#0071BC] text-white py-2 w-full"
              >
                Enregistrer le site
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
