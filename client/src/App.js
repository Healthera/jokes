import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/NavBar.js";
import Index from "./components/Index.js";
import JokesList from "./components/JokesList.js";
import CreateJoke from "./components/CreateJoke.js";
import EditJoke from "./components/EditJoke.js";
import DeleteJoke from "./components/DeleteJoke.js";


class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <NavBar/>
          <br/>
          <Route path="/" exact component={Index} />
          <Route path="/jokesList" component={JokesList} />
          <Route path="/create" component={CreateJoke} />
          <Route path="/edit/:id" component={EditJoke} />
          <Route path="/delete/:id" component={DeleteJoke} />
        </div>
      </Router>
    );
  }
}

export default App;
