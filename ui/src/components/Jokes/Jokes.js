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
    this.setState({jokes});
  }

  handleSave (event) {
    //await axios.post(
    //  `http://${process.env.REACT_APP_EXTERNAL_IP}:3000/jokes/${id}`,
    //);
    console.log(event);
  }

  async handleDelete(id, index) {
    await axios.delete(
      `http://${process.env.REACT_APP_EXTERNAL_IP}:3000/jokes/${id}`,
    );
    const jokes = [...this.state.jokes];
    jokes.splice(index, 1);
    this.setState({jokes});
  }

  async addJoke(joke) {
    await axios.post(
      `http://${process.env.REACT_APP_EXTERNAL_IP}:3000/jokes`,{joke}
    );
  }

  render() {
    return (
      <div>
        <NewJoke addJoke={this.addJoke}/>
        <div>
          {this.state.jokes.map((j, index) => {
            return <Joke
              corr={index}
              key={index}
              data={j}
              handleDelete={this.handleDelete}
            />;
          })}
        </div>
      </div>
    );
  }
}

export default Jokes;
