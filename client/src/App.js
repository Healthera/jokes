import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/NavBar.js";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          // add navbar
          <NavBar/>

          // add path '/'

          //add path '/jokeslist'

          //add path '/create'

          //add path '/edit/:id'

          //add path '/delete/:id'

        </div>
      </Router>
    );
  }
}

export default App;
