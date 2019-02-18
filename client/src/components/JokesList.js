import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Joke = props => (
  <tr>
    <td>{props.jokes.joke}</td>
    <td>{props.jokes.punch_line}</td>
    <td>
        <Link to={"/edit/"+props.jokes._id}>Edit</Link>
    </td>
    <td>
        <Link to={"/delete/"+props.jokes._id}>Delete</Link>
    </td>
  </tr>
)

class JokeList extends Component {
  constructor(props) {
        super(props);
        this.state = {jokes: []};
  }

  componentDidMount() {
    axios.get('http://localhost:8000/jokes')
      .then(response => {
          this.setState({ jokes: response.data });
      })
      .catch(function (error){
          console.log(error);
      })
  }

  jokeList() {
     return this.state.jokes.map(function(currentJoke, i){
         return <Joke jokes={currentJoke} key={i} />;
     })
   }

  render(){
    return(
      <div>
        <h3>Jokes List</h3>
              <table className="table table-striped" style={{ marginTop: 20 }} >
                  <thead>
                      <tr>
                          <th>Joke</th>
                          <th>Punchline</th>
                      </tr>
                  </thead>
                  <tbody>
                      { this.jokeList() }
                  </tbody>
              </table>
      </div>
    )
  }
}

export default JokeList;
