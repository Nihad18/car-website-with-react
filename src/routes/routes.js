import Home from "../pages/Home";
import MainLayout from "../pages/Layout";
import { Login } from "../components/Form/Login";
import { Register } from "../components/Form/Register";
import User from "../components/User/User";
import  Profile from "../components/User/Profile";
import Advertisements from "../components/User/Advertisements";
import NewAnnouncement from "../components/NewAnnouncement/NewAnnouncement"
const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {path:"/user",
      element: <User />,
      children:[
        {
          path:"profile",
          element: <Profile />,
        },
        {
          path:"advertisements",
          element: <Advertisements />,
        }
      ]
    }
    ,{
      path:"/newannouncement",
      element: <NewAnnouncement />,
    }
    ],
  },
];

export default routes;
