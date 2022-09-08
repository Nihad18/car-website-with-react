import Home from "../pages/Home";
import MainLayout from "../pages/Layout";
import { Login } from "../components/Form/Login";
import { Register } from "../components/Form/Register";
import PostDetail from "../components/Home/PostDetail";
import User from "../components/User/User";
import  Profile from "../components/User/Profile";
import Advertisements from "../components/User/Advertisements";
import NewAnnouncement from "../components/NewAnnouncement/Desktop/NewAnnouncement"
import Favourites from "../pages/Favourites"
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
      {
        path: "detail",
        element: <PostDetail />,
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
    },
    {
      path:"/favourites",
      element: <Favourites />,
    },
    {
      path:"/postdetail",
      element: <PostDetail/>,
    },
    ],
  },
];

export default routes;
