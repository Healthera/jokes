const React = require('react');
import Joke from './joke.jsx'

export default class JokeList extends React.Component{

    render() {
		 var jokes = this.props.jokes.map((joke, i) =>
		 	<Joke key={i} jokes={joke} deleteJoke={() => this.props.deleteJoke(joke.joke)}/>
		 );
		 return (
		 	<table>
		 		<tbody>
		 			<tr>
		 				<th>Joke</th>
		 				<th>Delete</th>
		 			</tr>
		 			{jokes}
		 		</tbody>
		 	</table>
		 )
	}
}
