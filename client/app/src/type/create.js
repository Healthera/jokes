import React, { useState } from "react"
import { createType } from "../api"

const CreateType = props => {
    const [nameInput, setNameInput] = useState("")

    const saveType = async () => {
        try {
            const result = await createType(nameInput)
            if(result && result.status === 201)
                props.close()
        } catch(err) {
            alert("I'm not calling the server without a name, she gets angry easily :c")
            console.log(err)
        }
    }

    return (
      <div id="create-type">
          <input 
            onChange={ev => setNameInput(ev.target.value)} 
            type="text"
            placeholder="Type name here" />
          <button className="save" onClick={ saveType }>Save</button>
          <hr />
      </div>
    )
}

export default CreateType
