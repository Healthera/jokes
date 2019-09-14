import React, { useEffect } from "react"
import { getManyTypes } from "../api"

const SelectType = props => {

    /**
     * This function is called everytime the component is created
     * This is not a good approach for a real world application since
     * its going to request data again and again. I did this way for the
     * simplicity.
     */
    const fillSelectType = async () => {
        try {
            const data = await getManyTypes()

            if(data && data.status === 200)
                props.setSelectList(data.data)
        } catch(err) {
            alert("Errors Errors Errors Everywhere :c check logs")
            console.log(err)
        }
    }

    useEffect(() => {
        fillSelectType()
    },[])

    return (
        <select id="select-type"
          value={props.selectedType}
          onChange={ ev => props.setSelectedType(ev.target.value) }> 

          <option value=""></option> 
          
          { 
            props.selectList.map(opt => {
                return <option key={opt._id} value={opt._id}>{opt.name}</option>
          }) }
          
          </select>
    )
}

export default SelectType