import { ToastContainer } from "react-toastify";
import Spinner from "./components/layouts/Spinner/Spinner";
import useRouterElements from "./routes/elements";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const elements = useRouterElements();
  return (
    <>
      <Spinner />
      <ToastContainer />
      {elements}
    </>
  );
}

export default App;
