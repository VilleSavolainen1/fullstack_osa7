import axios from 'axios'
import React, { useState, useEffect } from 'react'

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
    const [created, setCreated] = useState(false)

    useEffect(() => {
        axios.get(baseUrl)
            .then(res => setResources(res.data))
    }, [created])


    let token = null

    const setToken = newToken => {
        token = `bearer ${newToken}`
    }

    const create = async (resource) => {
        const config = {
            headers: { Authorization: token },
        }

        const response = await axios.post(baseUrl, resource, config)
        created ? setCreated(false) : setCreated(true)
        return response.data
    }


    const service = {
        create
    }

    return [
        resources, service
    ]
}


export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}