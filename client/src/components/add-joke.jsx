import React from 'react'

export default class AddJoke extends React.Component {

  render(){
    return (
       <div>
          <input type='text' ref='input' />
          <button onClick={(e) => this.handleClick(e)}>
             Add Joke
          </button>
       </div>
    )

}
  handleClick(e) {
     const node = this.refs.input
     const text = node.value.trim()
     this.props.addJoke(text)
     node.value = ''
  }
}
