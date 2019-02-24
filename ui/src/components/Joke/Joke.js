import React, {Component} from 'react';
import axios from 'axios';
import './Joke.css';

class Joke extends Component {
  constructor(props) {
    super(props);
    this.deleteJoke = this.deleteJoke.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  onKeyUp(e) {
    if (e.key === 'Enter' && e.target.value) {
      axios.post(
        `http://${process.env.REACT_APP_EXTERNAL_IP}:3000/jokes/${
          this.props.data._id
        }`,
        {text: e.target.value},
      );
    }
  }

  deleteJoke() {
    this.props.handleDelete(this.props.data._id);
  }

  render() {
    return (
      <div className="joke">
        <span className="action-buttons">
          <button onClick={this.deleteJoke}>delete</button>
        </span>
        <input className="joke-text" defaultValue={this.props.data.text} onKeyUp={this.onKeyUp} />
      </div>
    );
  }
}

export default Joke;
