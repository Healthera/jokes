import React, {Component} from 'react';
import './NewJoke.css';

class NewJoke extends Component {
  constructor() {
    super();
    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  onChange(e) {
    this.setState({joke: e.target.value});
  }

  onKeyUp(e) {
    if (e.key === 'Enter' && this.state.joke) {
      this.props.addJoke(this.state.joke);
      e.target.value = '';
      this.setState({joke: ''})
    }
  }

  render() {
    return (
      <div className="new-joke">
        <div className="new-joke-title">Tell us a joke!</div>
        <input className="joke-input" placeholder="Type your new joke here and press enter"
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}/>
      </div>
    );
  }
}

export default NewJoke;
