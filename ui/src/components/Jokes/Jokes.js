import React, {Component} from 'react';
import axios from 'axios';
import Joke from '../Joke/Joke';
import NewJoke from '../NewJoke/NewJoke';

class Jokes extends Component {
  constructor() {
    super();
    this.state = {jokes: []};
    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {
    const {data: jokes} = await axios.get(
      `http://${process.env.REACT_APP_EXTERNAL_IP}:3000/jokes`,
    );
    jokes.map(j => {
      j.key = j._id;
      return j;
    })
    this.setState({jokes});
  }

  async handleDelete(id) {
    await axios.delete(
      `http://${process.env.REACT_APP_EXTERNAL_IP}:3000/jokes/${id}`,
    );
    const jokes = this.state.jokes.filter(j => j._id !== id);
    this.setState({jokes});
  }

  async addJoke(joke) {
    await axios.post(`http://${process.env.REACT_APP_EXTERNAL_IP}:3000/jokes`, {
      joke,
    });
  }

  render() {
    return (
      <div>
        <NewJoke addJoke={this.addJoke} />
        <div>
          {this.state.jokes.map(j => {
            return (
              <Joke
                data={j}
                key={j.key}
                handleDelete={this.handleDelete}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Jokes;
