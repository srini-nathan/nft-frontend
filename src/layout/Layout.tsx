import React, { useContext } from "react";
import { Router } from "react-router-dom";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthProvider";
import { createBrowserHistory } from "history";
import { Menu } from "../components/Menu";

// components

export const history = createBrowserHistory();

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { token, logout, user } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    history.replace("/login");
  };

  const role = user?.role!;

  return (
    <Router history={history}>
      <Menu token={token} role={role} handleLogout={handleLogout} />
      <main>{children}</main>
      <Footer />
    </Router>
  );
};

export default Layout;
