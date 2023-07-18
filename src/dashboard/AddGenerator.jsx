import { Sidebar } from "./../components/Sidebar";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function AddGenerator() {
  const [data, setData] = useState([]);
  const [serial_number, setserial_number] = useState(null);
  const [model_generator, setmodel_generator] = useState(null);
  const [regime_fonctionnement, setregime_fonctionnement] = useState(null);
  const [capacity, setcapacity] = useState(null);
  const [id_site, setid_site] = useState(null);

  // Définit la fonction de connexion qui vérifie si le nom d'utilisateur et le mot de passe sont valides et met à jour l'état de connexion en conséquence

  const get_data_to_create_generator = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://texapon-server.onrender.com/api/v1/get_data_to_create_generator",
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
        setid_site(data.sites[0].id_site);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const creategenerator = async () => {
    console.log(
      serial_number,
      model_generator,
      regime_fonctionnement,
      capacity,
      id_site
    );
    if (
      serial_number == null ||
      model_generator == null ||
      regime_fonctionnement == null ||
      capacity == null ||
      id_site == null
    ) {
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://texapon-server.onrender.com/api/v1/generators", {
        method: "post",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          serial_number: serial_number,
          model_generator: model_generator,
          regime_fonctionnement: parseInt(regime_fonctionnement),
          capacity: capacity,
          id_site: id_site,
        }),
      });
      if (response.status == 201) {
        toast.success("ajout du générateur effectué avec succès", {
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
    get_data_to_create_generator();
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
            <h2 className="font-bold text-4xl text-[#0071BC]">
              Nouveau générateur
            </h2>
            <span className="text-lg">
              Ajouter un nouveau générateur dans le système
            </span>
            <hr className="mt-4 mb-12" />
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-[#0071BC]">
                  Numero de série
                </label>
                <input
                  onChange={(e) => setserial_number(e.target.value)}
                  className="border py-2 rounded border-slate-500 px-2 w-full"
                  placeholder="Numero de série"
                />
              </div>
              <ToastContainer />
              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-[#0071BC]">
                  Marque du générateur
                </label>
                <input
                  onChange={(e) => setmodel_generator(e.target.value)}
                  type="text"
                  placeholder="Marque du générateur"
                  className="border py-2 rounded border-slate-500 px-2 w-full"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-[#0071BC]">
                  Régime de fonctionnement
                </label>
                <input
                  type="number"
                  onChange={(e) => {
                    setregime_fonctionnement(e.target.value);
                  }}
                  placeholder="Régime de fonctionnement"
                  className="border py-2 rounded border-slate-500 px-2 w-full"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-[#0071BC]">Capacité</label>
                <input
                  onChange={(e) => setcapacity(e.target.value)}
                  className="border py-2 rounded border-slate-500 px-2 w-full"
                  placeholder="Capacité"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-[#0071BC]">Site</label>
                <select
                  onChange={(e) => setid_site(e.currentTarget.value)}
                  className="border py-2 rounded border-slate-500 px-2 w-full"
                  name=""
                  id=""
                >
                  {data.sites &&
                    data.sites.map((site, i) => (
                      <option key={i} value={site.id_site}>
                        {site.name}
                      </option>
                    ))}
                </select>
              </div>
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  await creategenerator();
                }}
                className="bg-[#0071BC] text-white py-2 w-full"
              >
                Enregistrer le générateur
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
