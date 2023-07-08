import { useState } from "react";
import { Sidebar } from "./../components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function AddZone() {
  const [name_zone, setname_zone] = useState(null);

  // Définit la fonction de connexion qui vérifie si le nom d'utilisateur et le mot de passe sont valides et met à jour l'état de connexion en conséquence
  const create_zone = async () => {
    if (name_zone == null) {
      return;
    }
    console.log(name_zone);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/v1/zones", {
        method: "post",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          name_zone: name_zone,
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
            <h2 className="font-bold text-4xl text-[#0071BC]">Nouvelle Zone</h2>
            <span className="text-lg">
              Enregistrer une nouvelle zone dans le système
            </span>
            <hr className="mt-4 mb-12" />
            <ToastContainer />
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-[#0071BC]">
                  Libelle de la zone
                </label>
                <input
                  onChange={(e) => setname_zone(e.target.value)}
                  type="text"
                  placeholder="Libelle de la zone"
                  className="border py-2 placeholder:capitalize uppercase rounded border-slate-500 px-2 w-full"
                />
              </div>

              <button
                onClick={async (e) => {
                  e.preventDefault();
                  await create_zone();
                }}
                className="bg-[#0071BC] text-white py-2 w-full"
              >
                Enregistrer la zone
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
