import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./Home";
import View from "./View";
import Nav from "./components/nav";
import "./assets/css/app.css";

function App() {

  return (
    <BrowserRouter>
    <div className="main-container">
      <Nav />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/home" component={Home}/>
        <Route path="/view" component={View}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
