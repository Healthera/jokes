import axios from "axios"

const base = "http://localhost:3050"

export const createType = async name => {
    return await axios.post(`${base}/types/create/`, {
        "_id": "n/a",
        "name": name
    })
}

export const getManyTypes = async () => {
    return await axios.get(`${base}/types/get`)
}

export const getRandomJoke = async () => {
    return await axios.get(`${base}/jokes/random`)
}

export const getPaginatedJokes = async(page, size, type) => {
    if(!type)
        return await axios.get(`${base}/jokes/get/page/${page}/size/${size}`)
    else
        return await axios.get(`${base}/jokes/get/type/${type}/page/${page}/size/${size}`)
}

export const deleteJoke = async _id => {
    return await axios.delete(`${base}/jokes/delete`, { data: { "_id": _id } })
}

export const updateJoke = async (_id, _type, text) => {
    return await axios.put(`${base}/jokes/update`, {
        "_id": _id,
        "_type": _type,
        "text": text
    })
}

export const createJoke = async (_type, text) => {
    return await axios.post(`${base}/jokes/create`, {
        "_id": "n/a",
        "_type": _type,
        "text": text
    })
}