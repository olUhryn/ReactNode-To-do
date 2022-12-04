import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navigation from './components/Navigation'
import genericRoutes from './genericRoutes'
import "./middleware/axiosInterceptor.js";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "@store/modules/users";

function App() {
  const [routes] = useState(genericRoutes())
  const userData = useSelector((state) => state.users.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    function parseJwt(token) {
      if (!token) {
        return;
      }
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace("-", "+").replace("_", "/");
      return JSON.parse(window.atob(base64));
    }
    if (
      localStorage.getItem("accessToken") !== "undefined" &&
      !!localStorage.getItem("accessToken")
    ) {
      dispatch(setUserData(parseJwt(localStorage.getItem("accessToken"))));
    }
  }, []);

  return (
    <div className="app">
      <Router>
        <Navigation routes={routes}/>
        <Switch>
          {
            routes.map(route =>
              <Route {...route.exact ? { exact: true } : null} path={route.path} key={route.name + 'Route'}>
                {React.createElement(route.component, null, null)}
              </Route>)
          }
        </Switch>
      </Router>
    </div>
  );
}

export default App;
