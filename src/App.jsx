import { BrowserRouter as Routers } from "react-router-dom";
import Layout from "./pages/Layout";
import Router from "./router";

function App() {

  return (
    <Routers>
      <Layout>
        <Router />
      </Layout>
    </Routers>
  );
}

export default App;
