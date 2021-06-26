import { BrowserRouter } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { ApolloProvider } from "@apollo/client";
import { HelmetProvider } from "react-helmet-async";
import getLibrary from "./lib/getLibrary";
import NotificationProvider from "./lib/providers/NotificationProvider";
import { client } from "./apollo";
import { AppRoute } from "./AppRoute";
import { AuthProvider } from "../src/context/AuthProvider";


function App() {
  return (
   
    <BrowserRouter>
      <ApolloProvider client={client}>
        <AuthProvider>
          <NotificationProvider>
            <Web3ReactProvider getLibrary={getLibrary}>
              <HelmetProvider>
                <AppRoute />
              </HelmetProvider>
            </Web3ReactProvider>
          </NotificationProvider>
        </AuthProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
