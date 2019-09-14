import React, { useState, useEffect } from "react"
import SelectType from "./select"
import { getPaginatedJokes, deleteJoke, updateJoke } from "../api"

const Jokes = () => {
    const [pagination, setPagination] = useState({ "page": 0, "size": 10 })
    const [jokes, setJokes] = useState([])
    const [selectedType, setSelectedType] = useState("")
    const [selectList, setSelectList] = useState([])
    const [updateId, setUpdateId] = useState("")
    const [updatedText, setUpdatedText] = useState("")
    
    const getJokes = async () => {
        try {
            const result = await getPaginatedJokes(pagination.page, pagination.size,
                SelectType !== "" ? selectedType : null)

            if(result && result.status === 200)
                setJokes(result.data)
        } catch(err) {
            alert("Something happened trying to get some nice jokes, check the logs")
            console.log(err)
        }
    }

    const goPage = async page => {
        setPagination({ "page": page, "size": 10})
    }

    const removeJoke = async _id => {
        try {
            const result = await deleteJoke(_id)
            if(result && result.status === 200)
                setJokes(jokes.filter(joke => { return joke._id !== _id}))
        } catch(err) {
            alert("Cannot remove this Joke, because it's too much amazing... No :c check the logs")
            console.log(err)
        }
    }

    const modifyJoke = async (_id, _type) => {
        try {
            const result = await updateJoke(_id, _type, updatedText)
            
            if(result && result.status === 200) {
                setJokes(jokes.map(joke => {
                    if(joke._id === _id) {
                        joke.text = updatedText
                    }
    
                    return joke
                }))
    
                setUpdatedText("")
                setUpdateId("")
            }
        } catch(err) {
            console.log(err)
        }
    }

    const showUpdateJoke = async _id => {
        setUpdatedText("")

        if(_id === updateId)
            setUpdateId("")
        else
            setUpdateId(_id)
    }

    /**
     * This Effect is going to watch page and if changes
     * it will make a call to the api providing the new page and size
     */
    useEffect(() => {
        getJokes()
    },[pagination.page])

    /**
     * This Effect watches selectedType, if the admin wants to filter
     * all the jokes by its type, just change the select, it will reset
     * the pagination and also make a request, choose empty to no filter.
     */
    useEffect(() => {
        setPagination({ "page": 0, "size": 10 })
        getJokes()
    }, [selectedType])

    return(
        <div id="jokes">
            <h4>You can filter by type... 
                <SelectType 
                selectList={ selectList } 
                setSelectList={ setSelectList } 
                setSelectedType={ setSelectedType }
                selectedType={ selectedType } />
            </h4>

            <table>
                <thead>
                    <tr>
                        <th id="tb-joke">Joke</th>
                        <th id="tb-type">Type</th>
                        <th id="tb-opt">Options</th>
                        { updateId ? <th>Input</th> : null }
                    </tr>
                </thead>
                <tbody>
            { 
                jokes.map(joke => {
                    return (
                    <tr key={ joke._id }>
                        <td>{ joke.text }</td>
                        <td>{ joke._type.name }</td>
                        <td> 
                            <button className="delete" onClick={ () => removeJoke(joke._id) }>delete</button> | 
                            <button className="update" onClick={ () => showUpdateJoke(joke._id) }>update</button>
                        </td>
                        <td>
                            { 
                                updateId === joke._id ? 
                                <div id="update">
                                    <input 
                                        type="text" 
                                        onChange={ ev => setUpdatedText(ev.target.value) }/>
                                    <button className="save" onClick={ () => modifyJoke(updateId, joke._type._id) }>save</button>
                                </div>
                                : null
                            }
                        </td>
                    </tr>
                    )
                })
            }
                </tbody>
            </table>
            <div id="pagination">
                { pagination.page > 0 ?
                    <button className="pag" onClick={ () => goPage(pagination.page-1) }>previous page</button>
                    : null
                }
                <button className="pag" onClick={ () => goPage(pagination.page+1) }>next page</button>
            </div>
        </div>
    )
}

export default Jokes