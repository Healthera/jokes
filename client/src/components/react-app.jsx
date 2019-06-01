const React = require('react');
var axios = require('axios');

import JokeList from './joke-list.jsx'
import AddJoke from './add-joke.jsx'

export default class ReactApp extends React.Component {

	constructor(props) {
		super(props);
		this.state = {jokes: []};
		this.addJoke = this.addJoke.bind(this);
		this.deleteJoke = this.deleteJoke.bind(this);
		this.Axios = axios.create({
		    baseURL: "/jokes",
		    headers: {'Content-Type': 'application/json'}
		});
	}

	componentDidMount() {
		let _this = this;
		this.Axios.get('/all')
		  .then(function (response) {
		    _this.setState({jokes: response.data});
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
	}

	addJoke(joke){
		let _this = this;
		this.Axios.post('/add', {
        	joke: joke
         })
		  .then(function (response) {
		    _this.setState({jokes: response.data});
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
    }

    deleteJoke(joke){
        let _this = this;
        this.Axios.delete('/delete',{data: { joke: joke }})
        .then(function (response) {
      	_this.setState({jokes: response.data});
        })
        .catch(function (error) {
          console.log(error);
        });
    }

	render() {
		return (
				<div>
				  <AddJoke addJoke={this.addJoke}/>
				  <JokeList jokes={this.state.jokes} deleteJoke={this.deleteJoke}/>
		     </div>
			)
	}
}
