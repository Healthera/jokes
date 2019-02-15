import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from "../assets/healthera.ico"
import "bootstrap/dist/css/bootstrap.min.css";

class NavBar extends Component {
  render(){
    return(
      <nav class="navbar navbar-expand-lg navbar-light bg-success">
        <a class="navbar-brand" href="https://healthera.co.uk/" target="_blank" rel="noopener noreferrer">
          <img src={logo} width="30" height="30" alt="Healthera" />
        </a>
        <Link to="/" className="navbar-brand text-white">Healthera Jokes</Link>
      </nav>
    )
  }
}

export default NavBar;
