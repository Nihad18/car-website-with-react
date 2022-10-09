import { useRoutes } from "react-router-dom";
import routes from "./routes/Routes";
function App() {
  // return useRoutes(Routes.routes);
  // return  <Routes/>
  return useRoutes(routes);
}

export default App;
