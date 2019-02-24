import React, {Component} from 'react';
import './Joke.css';

class Joke extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.props.handleDelete(this.props.data._id, this.props.corr);
  }

  render() {
    return (
      <div className="joke">
        <span className="action-buttons">
          <button>save</button>
          <button onClick={this.handleDelete}>delete</button>
        </span>
        <span>{this.props.data.text}</span>
      </div>
    );
  }
}

export default Joke;
