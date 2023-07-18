import { Sidebar } from "./../components/Sidebar";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import "react-toastify/dist/ReactToastify.css";

export function AddDrain() {
  const [data, setData] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  const defineSelectedData = (value) => {
    data.map((data) => {
      if (data.id_site == value.value) {
        setSelectedData(data);
      }
    });
    console.log(selectedData);
  };

  const get_data_to_create_treatment = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://texapon-server.onrender.com/api/v1/get_data_to_create_treatment",
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.status);
      if (response.status == 200) {
        const data_temp = await response.json();

        setData(data_temp);
        const options_temp = [];
        for (const item of data_temp) {
          options_temp.push({
            value: item.id_site,
            label: item.site_name,
          });
        }
        setOptions(options_temp);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const create_drain = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://texapon-server.onrender.com/api/v1/traitements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          generator_id: selectedData.generator_id,
          agent_id: selectedData.agent_id,
        }),
      });
      if (response.status == 201) {
        toast.success("Assignation effectué avec succès", {
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
      console.log(error);
    }
  };

  useEffect(() => {
    get_data_to_create_treatment();
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
              Planifier une vidange
            </h2>
            <span className="text-lg">
              Planifier et assigner la vidange au technicien
            </span>
            <hr className="mt-4 mb-12" />
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-[#0071BC]">
                  Nom du site
                </label>

                <Select
                  placeholder="Nom du site"
                  onChange={(value) => defineSelectedData(value)}
                  options={options}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-[#0071BC]">
                  ID du site
                </label>
                <input
                  disabled={true}
                  contentEditable={false}
                  defaultValue={selectedData ? selectedData.id_site : ""}
                  type="text"
                  placeholder="ID du site"
                  className="border py-2 rounded border-slate-500 px-2 w-full"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-[#0071BC]">Zone</label>
                <input
                  disabled={true}
                  contentEditable={false}
                  defaultValue={selectedData ? selectedData.zone_name : ""}
                  type="text"
                  placeholder="Zone"
                  className="border py-2 rounded border-slate-500 px-2 w-full"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-[#0071BC]">
                  Régime de fonctionnement
                </label>
                <input
                  contentEditable={false}
                  disabled={true}
                  defaultValue={selectedData ? selectedData.regime : ""}
                  onChange={(e) => { }}
                  type="text"
                  placeholder="Régime de fonctionnement"
                  className="border py-2 rounded border-slate-500 px-2 w-full"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-[#0071BC]">
                  Assigner à
                </label>
                <input
                  disabled={true}
                  contentEditable={false}
                  defaultValue={
                    selectedData ? selectedData.agent_full_name : ""
                  }
                  type="text"
                  placeholder="Assigner à"
                  className="border py-2 rounded border-slate-500 px-2 w-full"
                />
              </div>
              <button
                onClick={() => create_drain()}
                className="bg-[#0071BC] text-white py-2 w-full"
              >
                Envoyer au technicien
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
