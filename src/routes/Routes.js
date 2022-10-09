import { Login } from "../components/Form/Login";
import { Register } from "../components/Form/Register";
import Profile from "../components/User/Profile";
import PasswordChange from "../components/User/PasswordChange";
import MyPosts from "../components/User/MyPosts";
import Home from "../pages/Home";
import MainLayout from "../pages/Layout";
import User from "../pages/User";
import NewPost from "../pages/NewPost";
import Favourites from "../pages/Favourites";
import PostDetail from "../pages/PostDetail";
import UpdatePostPage from "../pages/UpdatePostPage";

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
        path: "/user",
        element: <User />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "passwordchange",
            element: <PasswordChange />,
          },
          {
            path: "myposts",
            element: <MyPosts />,
          },
        ],
      },
      {
        path: "/newpost",
        element: <NewPost />,
      },
      {
        path: "/updatepostpage",
        element: <UpdatePostPage />,
      },
      {
        path: "/favourites",
        element: <Favourites />,
      },
      {
        path: "postdetail/:postId",
        element: <PostDetail />,
      },
    ],
  },
];

export default routes;
