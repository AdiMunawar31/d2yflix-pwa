import { Toaster } from "react-hot-toast";
import { BrowserRouter as Routers } from "react-router-dom";
import useNotification from "./hooks/useNotification";
import Layout from "./pages/Layout";
import Router from "./router";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routers>
        <Layout>
          <Router />
        </Layout>
      </Routers>
    </>
  );
}

export default App;
