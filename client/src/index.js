/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AdminLayout from "layouts/Admin.js";
import GameContainerLayout from "layouts/GameContainer.js";
import PlayerLogin from "layouts/PlayerLogin";
import PlayerArea from "layouts/PlayerArea";
import Login from "layouts/Login.js";
import PlayerGamingPage from "layouts/PlayerGamingPage";
import PlayerContainer from "layouts/PlayerContainer";



const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" render={(props) => <Login {...props} />} />
      <Route exact path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route exact path="/game-display" render={(props) => <GameContainerLayout {...props} />} />
      <Route exact path="/player-login" render={(props) => <PlayerLogin {...props} />} />
      <Route exact path="/player-area" render={(props) => <PlayerGamingPage {...props} />} />
      {/* <Route exact path="/game" render={(props) => <PlayerGamingPage {...props} />} /> */}
      <Route exact path="/admin/game" render={(props) => <AdminLayout {...props} />} />
      <Route exact path="/admin/categories-questions" render={(props) => <AdminLayout {...props} />} />
      <Route path='/' render={(props) => <Login {...props} />} />
    </Switch>

  </BrowserRouter>
);
