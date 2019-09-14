import React, { useState } from "react"
import CreateJoke from "../joke/create"
import CreateType from "../type/create"
import RandomJoke from "../joke/random"
import Jokes from "../joke/jokes"

const Home = () => {
    const [createJoke, setCreateJoke] = useState(false)
    const [createType, setCreateType] = useState(false)
    const [randomJoke, setRandomJoke] = useState(false)
    const [jokes, setJokes] = useState(false)

    const showCreateJoke = () => {
        setCreateJoke(!createJoke)
        setCreateType(false)
    }

    const showCreateType = () => {
        setCreateType(!createType)
        setCreateJoke(false)
    }

    const showJokes = () => {
        setJokes(!jokes)
        setRandomJoke(false)
    }

    const showRandomJoke = () => {
        setRandomJoke(!randomJoke)
        setJokes(false)
    }

    return (
      <div id="home">
        <h1>Jokes Portal</h1>

        { createJoke ? <CreateJoke close={ () => setCreateJoke(false) } /> : null }
        { createType ? <CreateType close={ () => setCreateType(false) } /> : null }

        <button className="menu" onClick={ showCreateType } >Create new Type</button>
        <button className="menu" onClick={ showCreateJoke }>Create new Joke</button>
        <button className="menu" onClick={ showJokes }>Get Jokes</button>
        <button className="menu" onClick={ showRandomJoke }>Get Random Joke</button>
        <hr />

        { jokes ?  <Jokes /> : null }
        { randomJoke ? <RandomJoke /> : null }
      </div>
    )
}

export default Home
