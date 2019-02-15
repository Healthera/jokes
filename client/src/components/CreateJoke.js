import React, {Component} from 'react'
import axios from 'axios';

class CreateJoke extends Component {
  constructor(props) {
    super(props);

    this.onChangeJoke      = this.onChangeJoke.bind(this)
    this.onChangePunchline = this.onChangePunchline.bind(this)
    this.onSubmit          = this.onSubmit.bind(this);

    this.state = {
      joke: '',
      punch_line: ''
    }
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

    this.setState({
      joke: '',
      punch_line: ''
    })
  }

  render(){
    return(
      <div style={{marginTop: 10}}>
        <h3>Create New Joke</h3>

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
export default CreateJoke;
