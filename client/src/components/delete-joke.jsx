import React from 'react'

export default class DeleteJoke extends React.Component {
  render(){
    return (
          <button onClick={(joke) => this.handleDelete(joke)}>
             Delete
          </button>
    )

}
  handleDelete(joke) {
   this.props.deleteJoke(joke);
  }
}
