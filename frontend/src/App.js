import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routes from "./routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
 import Switchs from "../src/components/switch";

function App() {
  
  const [value, setValue] = useState(false);
  return (
    <div className="App">
      {/* 라우팅*/}
      <Router>
        <Switch>
          {Routes.map((route) => {
            return (
              <Route path={route.page} key={route.page} exact>
                <route.component />
                <Switchs isOn={value}
        handleToggle={() => setValue(!value)}/>
              </Route>
            );
          })}
        </Switch>
      </Router>{" "}

 




    </div>
  );
}

export default App;
