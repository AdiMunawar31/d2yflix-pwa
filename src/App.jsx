import { BrowserRouter as Routers } from "react-router-dom";
import Layout from "./pages/Layout";
import Router from "./router";
import useNotification from "./hooks/useNotification";
import { useEffect } from "react";

function App() {
  const { showNotification } = useNotification();

  return (
    <Routers>
      <Layout>
        <Router />
      </Layout>
    </Routers>
  );
}

export default App;
