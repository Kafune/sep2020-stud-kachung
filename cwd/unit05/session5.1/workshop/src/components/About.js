import React from "react";
import {Route, NavLink, Switch} from "react-router-dom"

const AboutTeam = () => <p>This is the Team for you</p>;
const AboutContact = () => <p>You can contact us</p>

export const About = () => (
  <div className="page columns">
    <div className="sidebar">
      <NavLink to="/about/team">Team</NavLink>
      <NavLink to="/about/contact">Contact</NavLink>
    </div>

    <div className="content">
      <Switch>
      <Route path="/about/team" component={AboutTeam}/>
      <Route path="/about/contact" component={AboutContact}/>
      <Route component={AboutDefault}/>
      </Switch>
    </div>
  </div>
);

const AboutDefault = () => <p>Here you can read about us</p>
