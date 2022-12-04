import React, { useState } from 'react';
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

function App() {
  const [routes] = useState(genericRoutes())
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
