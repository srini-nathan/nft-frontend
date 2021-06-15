import React, { useContext } from "react";
import { Router } from "react-router-dom";
import { isLoggedInVar } from "../apollo";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthProvider";
import { createBrowserHistory } from "history";
import { Menu } from "../components/Menu";

// components

export const history = createBrowserHistory();

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { token, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    history.replace("/login");
  };

  return (
    <Router history={history}>
      <Menu token={token} handleLogout={handleLogout} />
      <main>{children}</main>
      <Footer />
    </Router>
  );
};

export default Layout;
