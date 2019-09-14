import React, { useState, useEffect } from "react"
import { getRandomJoke } from "../api"

const RandomJoke = () => {
    const [random, setRandom] = useState({})

    const getRandom = async () => {
        try {
            const joke = await getRandomJoke()
            
            if(joke && joke.status === 200)
                setRandom(joke.data)
        } catch(err) {
            alert("I think this error appeared because I cannot find a nice Joke :c check logs please")
            console.log(err)
        }
    }

    useEffect(() => {
        getRandom()
    }, [])

    return (
        <div id="random-joke">
            { random.text }
            <h2>Nice one :)</h2>
        </div>
    )
}

export default RandomJoke