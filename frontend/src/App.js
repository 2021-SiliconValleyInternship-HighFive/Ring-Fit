import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routes from "./routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
function App() {
  return (
    <div className="App">
      {/* 라우팅*/}
      <Router>
        <Switch>
          {Routes.map((route) => {
            return (
              <Route path={route.page} key={route.page} exact>
                <route.component />
              </Route>
            );
          })}
        </Switch>
      </Router>{" "}

    </div>
  );
}

export default App;
