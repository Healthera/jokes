import React, {Component} from 'react';
import axios from 'axios';

class DeleteJoke extends Component {
  constructor(props){
    super(props);

    this.onClickYes = this.onClickYes.bind(this);
    this.onClickNo = this.onClickNo.bind(this);

    this.state = {
      joke: '',
      punch_line: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8000/jokes'+this.props.match.params.id)
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

  onClickYes(e){
    e.preventDefault();

    console.log(`Form submitted:`);
    console.log(`Joke: ${this.state.joke}`);
    console.log(`Punchline: ${this.state.punch_line}`);

    axios.delete('http://localhost:8000/jokes/'+this.props.match.params.id)
            .then(res => console.log(res.data));

    this.setState({
      joke: '',
      punch_line: ''
    })

    this.props.history.push('/');
  }

  onClickNo(e){
    this.props.history.push('/');
  }

  render(){
    return(
      <div>
        <h3> You Sure You Want To Delete? </h3>
        <table className="table table-striped" style={{ marginTop: 20 }} >
        <thead>
            <tr>
                <button type="button"
                        class="btn btn-danger"
                        value={this.state}
                        style={{ marginRight: 20 }}
                        onClick={this.onClickYes}>YES PLEASE!!!</button>

                <button type="button"
                        class="btn btn-success"
                        value={this.state}
                        onClick={this.onClickNo}>Yeah Naw She'll Be Right</button>
            </tr>
        </thead>
        </table>
      </div>
    )
  }
}

export default DeleteJoke;
