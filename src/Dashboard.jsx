import { Home } from "./dashboard/Home";
import { AddDrain } from "./dashboard/AddDrain";
import { AddAgent } from "./dashboard/AddAgent";
import { AddSite } from "./dashboard/AddSite";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GetAgent } from "./dashboard/GetAgent";
import { GetZone } from "./dashboard/GetZone";
import { GetSite } from "./dashboard/GetSite";
import { DetailsVidanges } from "./dashboard/DetailsVidanges";
import { AddGenerator } from "./dashboard/AddGenerator";
import { AddZone } from "./dashboard/AddZone";
import { GetGenerator } from "./dashboard/GetGenerator";
import { GetDrain } from "./dashboard/GetDrain";
import { TopBar } from "./components/TopBar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/create_drain",
    element: <AddDrain />,
  },
  {
    path: "/details_vidanges",
    element: <DetailsVidanges />,
  },
  {
    path: "/create_agent",
    element: <AddAgent />,
  },
  {
    path: "/create_site",
    element: <AddSite />,
  },
  {
    path: "/getagent",
    element: <GetAgent />,
  },
  {
    path: "/getzone",
    element: <GetZone />,
  },
  {
    path: "/getsite",
    element: <GetSite />,
  },
  {
    path: "/getgenerators",
    element: <GetGenerator />,
  },
  {
    path: "/gettraitements",
    element: <GetDrain />,
  },
  {
    path: "/creategenerator",
    element: <AddGenerator />,
  },
  {
    path: "/create_zone",
    element: <AddZone />,
  },
]);

export function Dashboard({ setisLoggedIn }) {
  return (
    <div>
      <TopBar setisLoggedIn={setisLoggedIn} />
      <RouterProvider router={router} />
    </div>
  );
}
