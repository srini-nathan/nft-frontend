import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
// import Login from "./auth/pages/Login";
// import SignUp from "./auth/pages/SignUp";
import { createBrowserHistory } from "history";
import CreatorRoute from "./routes/CreatorRoute";
import { Route as ROUTES } from "./routes/constant/routes";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import NotFound from "./pages/NotFound";
import { UserProfile } from "./pages/UserProfile/Index";
import { MyNFT } from "./pages/MyNFT";
import Layout from "../src/layout/Layout";
// import { Profile } from "./dashboard/components/MyProfile/Profile";
// import { MyNFT } from "./dashboard/components/MyNFT/MyNFT";
// import { MyPatentDetails } from "./dashboard/components/MyNFT/MyPatent/MyPatentDetails";

export const AppRoute = () => {
  return (
    <Layout>
      <Switch>
        <CreatorRoute exact path={ROUTES.HOME} component={Home} />
        <CreatorRoute exact path={ROUTES.PROFILE} component={UserProfile} />
        <CreatorRoute exact path={ROUTES.MYNFT} component={MyNFT} />
        {/* 
        <CreatorRoute  exact path={ROUTES.PATENT} component={MyPatentDetails} />  */}
        <Route path={ROUTES.SIGNUP} component={SignUp} />
        <Route path={ROUTES.LOGIN} component={Login} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
};
