import React, {Component} from 'react';

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
    }
  }

  render() {
    return (
      <div>
        <div>Add joke!</div>
        <input placeholder="Type your new joke here!"
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}/>
      </div>
    );
  }
}

export default NewJoke;
