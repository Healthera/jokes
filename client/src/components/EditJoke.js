import React, { Component } from 'react';
import axios from 'axios';

class EditJoke extends Component {
  constructor(props){
    super(props);

    this.onChangeJoke      = this.onChangeJoke.bind(this)
    this.onChangePunchline = this.onChangePunchline.bind(this)
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      joke: '',
      punch_line: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8000/jokes')
      .then(response => {
          this.setState({
            joke: response.data.joke,
            punch_line: response.data.punch_line
           });
      })
      .catch(function (error){
          console.log(error);
      })
  }

  onChangeJoke(e){
    this.setState({
      joke: e.target.value
    });
  }

  onChangePunchline(e){
    this.setState({
      punch_line: e.target.value
    });
  }

  onSubmit(e){
    // for testing
    e.preventDefault();

    console.log(`Form submitted:`);
    console.log(`Joke: ${this.state.joke}`);
    console.log(`Punchline: ${this.state.punch_line}`);

    // add axios here
    const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
    const qs = require('qs');

    const newJoke = {
      joke: this.state.joke,
      punch_line: this.state.punch_line
    };

    axios.put('http://localhost:8000/jokes/'+this.props.match.params.id, qs.stringify(newJoke), config)
              .then(res => console.log(res.data));

    this.setState({
      joke: '',
      punch_line: ''
    })
  }

  render(){
    return(
      <div style={{marginTop: 10}}>
        <h3>Edit Joke</h3>

        <form onSubmit={this.onSubmit}>

                  <div className="form-group">
                      <label>Joke: </label>
                      <input  type="text"
                              className="form-control"
                              value={this.state.joke}
                              onChange={this.onChangeJoke}
                              />
                  </div>

                  <div className="form-group">
                      <label>Punch Line: </label>
                      <input  type="text"
                              className="form-control"
                              value={this.state.punch_line}
                              onChange={this.onChangePunchline}
                              />
                  </div>

                  <div className="form-group">
                        <input type="submit" value="Create Joke" className="btn btn-primary" />
                  </div>
        </form>
      </div>
    )
  }
}

export default EditJoke;
