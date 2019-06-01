const React = require('react');
import DeleteJoke from './delete-joke.jsx'

export default class Joke extends React.Component{
	render() {
		return (
			<tr>
				<td>{this.props.jokes.joke}</td>
				<td><DeleteJoke deleteJoke={this.props.deleteJoke}/></td>
			</tr>
		)
	}
}
