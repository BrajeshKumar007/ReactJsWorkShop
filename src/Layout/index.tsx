import { lazy, Suspense } from "react";
import styles from "./index.module.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Paper } from "@material-ui/core";
import Fallback from "components/Fallback";
import AppHeader from "components/AppHeader";

const Home = lazy(() => import("pages/Home"));
const Layout = () => {
  return (
    <Router>
      <Paper square className={styles.root}>
        <AppHeader />
        <Suspense fallback={<Fallback />}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </Suspense>
      </Paper>
    </Router>
  );
};

export default Layout;
