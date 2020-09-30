import React from "react";
import { Redirect } from "react-router-dom";
import AuthenticationAPI from "../api/AuthenticationAPI";

export const Logout = () => {
  AuthenticationAPI.logout();
  //TODO: here we need to redirect to the homepage
  return <Redirect to="/"/>;
};
