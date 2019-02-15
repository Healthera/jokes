import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

class Index extends Component {
  constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);

        this.state = {
          jokes: [],
          joke: '',
          punch_line: ''
        };
  }

  componentDidMount() {
    axios.get('http://localhost:8000/jokes')
      .then(response => {
        var i = response.data[Math.floor((Math.random()*response.data.length))];
          this.setState({
            jokes: response.data,
            joke: i.joke,
            punch_line: i.punch_line
          });
          console.log(i);
      })
      .catch(function (error){
          console.log(error);
      })
  }

  onClick(e) {
    this.componentDidMount();
  }

  render(){
    return(
      <div>
        <h3> You Want Some Jokes? </h3>
        <button type="button"
                class="btn btn-success"
                value={this.state}
                style={{ marginLeft: 20 }}
                onClick={this.onClick}> Get More Here </button>
          <table className="table table-striped" style={{ marginTop: 20 }} >
            <thead>
              <tr>
                  <th> Joke </th>
                  <th> Punchline </th>
                </tr>
            </thead>
            <tbody>
                <td>{this.state.joke}</td>
                <td>{this.state.punch_line}</td>
            </tbody>
          </table>
      </div>
    )
  }
}

export default Index;
