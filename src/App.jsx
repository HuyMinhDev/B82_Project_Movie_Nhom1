import Spinner from "./components/layouts/Spinner/Spinner";
import useRouterElements from "./routes/elements";

function App() {
  const elements = useRouterElements();
  return (
    <>
      <Spinner />
      {elements}
    </>
  );
}

export default App;
