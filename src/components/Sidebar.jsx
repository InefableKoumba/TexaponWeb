import { Link } from "react-router-dom";
import Collapse from "rc-collapse";
var Panel = Collapse.Panel;
import "rc-collapse/assets/index.css";

export function Sidebar() {
  return (
    <div>
      <div className="bg-white flex flex-col pt-4 fixed mt-20 pr-8">
        <div className=" whitespace-nowrap px-4 rounded-r-full pb-4">
          <Link to="/" className="flex gap-x-4 items-center">
            <div className="w-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 109.862 106.15"
              >
                <g
                  id="home-alt-svgrepo-com"
                  transform="translate(-10.986 -14.699)"
                >
                  <path
                    id="Path_21"
                    data-name="Path 21"
                    d="M67.88,6.838a16.479,16.479,0,0,0-21.9,0L3.844,44.3a5.493,5.493,0,1,0,7.3,8.211l1.844-1.639V81.721a101.022,101.022,0,0,0,.451,12.425c.484,3.6,1.576,7.053,4.375,9.852s6.251,3.891,9.852,4.376a101.111,101.111,0,0,0,12.425.451H73.772a101.116,101.116,0,0,0,12.425-.451c3.6-.484,7.053-1.576,9.852-4.376s3.891-6.251,4.376-9.852a101,101,0,0,0,.451-12.425V50.868l1.843,1.639a5.493,5.493,0,1,0,7.3-8.211ZM56.931,75.867a5.493,5.493,0,0,0-5.493,5.493V92.346a5.493,5.493,0,0,1-10.986,0V81.36a16.479,16.479,0,1,1,32.959,0V92.346a5.493,5.493,0,1,1-10.986,0V81.36A5.493,5.493,0,0,0,56.931,75.867Z"
                    transform="translate(8.986 12.023)"
                    fill="#0071bc"
                    fillRule="evenodd"
                  />
                </g>
              </svg>
            </div>
            <span>Accueil</span>
          </Link>
        </div>
        <div className="">
          <Collapse accordion={true}>
            <Panel header="Gestion des vidanges" headerClass="my-header-class">
              <div className=" whitespace-nowrap px-2 rounded-r-full pb-2 ">
                <Link to="/create_drain">Planifier une vidange</Link>
              </div>
              <div className=" whitespace-nowrap px-2 rounded-r-full pb-2 ">
                <Link to="/gettraitements">Liste des vidanges</Link>
              </div>
            </Panel>
          </Collapse>
        </div>

        <div>
          <div className="mb-2"></div>
          <Collapse accordion={true}>
            <Panel header="Gestion des Zones" headerClass="my-header-class">
              <div className=" whitespace-nowrap px-2 rounded-r-full pb-2">
                <Link to="/create_zone">Ajouter une zone</Link>
              </div>
              <div className=" whitespace-nowrap px-2 rounded-r-full pb-2">
                <Link to="/getzone">Liste des zones</Link>
              </div>
            </Panel>
          </Collapse>
          <div className="mb-2"></div>
          <Collapse accordion={true}>
            <Panel header="Gestion des Sites" headerClass="my-header-class">
              <div className=" whitespace-nowrap px-2 rounded-r-full pb-2">
                <Link to="/create_site">Ajouter un site</Link>
              </div>
              <div className=" whitespace-nowrap px-2 rounded-r-full pb-2">
                <Link to="/getsite">Liste des sites</Link>
              </div>
            </Panel>
          </Collapse>
          <div className="mb-2"></div>
          <Collapse accordion={true}>
            <Panel header="Gestion des Agents" headerClass="my-header-class">
              <div className=" whitespace-nowrap px-2 rounded-r-full pb-2">
                <Link to="/create_agent">Ajouter un agent</Link>
              </div>
              <div className=" whitespace-nowrap px-2 rounded-r-full pb-2">
                <Link to="/getagent">Liste des agents</Link>
              </div>
            </Panel>
          </Collapse>
          <div className="mb-2"></div>
          <Collapse accordion={true}>
            <Panel
              header="Gestion des Générateurs"
              headerClass="my-header-class"
            >
              <div className=" whitespace-nowrap px-2 rounded-r-full pb-2">
                <Link to="/creategenerator">Ajouter un générateur</Link>
              </div>
              <div className=" whitespace-nowrap px-2 rounded-r-full pb-2">
                <Link to="/getgenerators">Liste des générateurs</Link>
              </div>
            </Panel>
          </Collapse>
        </div>
      </div>
    </div>
  );
}
