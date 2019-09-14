import React from 'react'
import { render } from 'react-dom'
import Home from './home/home'


const App = () => {
    return (
      <div>
        <Home />
      </div>
    )
}

render(<App />, document.getElementById('root'))