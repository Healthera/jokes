import React, { useState } from "react"
import { createJoke } from "../api"
import SelectType from "./select"

const CreateJoke = props => {
    const [textInput, setTextInput] = useState("")
    const [selectedType, setSelectedType] = useState("")
    const [selectList, setSelectList] = useState([])

    /**
     * Basically when save a joke the component will be destroyed,
     * if a joke is not saved, it will keep the component alive but
     * raising an error message to the client.
     */
    const saveJoke = async () => {
        if(!textInput || !selectedType) {
            alert("A very tiny bird told me that you should select a type and then write an amazing joke before hiting save")
        } else {
            try {
                const result = await createJoke(selectedType, textInput)
                if(result && result.status === 201)
                    props.close()
            } catch(err) {
                alert("Oh no :c we have an error saving this amazing joke")
                console.log(err)
            }
        }
    }

    return (
      <div id="create-joke">
          
          <SelectType 
            selectList={ selectList } 
            setSelectList={ setSelectList } 
            setSelectedType={ setSelectedType }
            selectedType={ selectedType } />

          <input 
            onChange={ev => setTextInput(ev.target.value)} 
            type="text" 
            placeholder="Write here your best joke">
          </input>
          <button className="save" onClick={saveJoke}>Save</button>
          <hr />
      </div>
    );
}

export default CreateJoke
