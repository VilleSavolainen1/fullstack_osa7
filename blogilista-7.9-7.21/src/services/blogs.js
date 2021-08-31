import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const createNew = async credentials => {
    const config = {
        headers: { Authorization: token }
    }
    try {
        await axios
            .post(baseUrl, credentials, config)
    } catch (exception) {
        console.log(exception.message)
    }
}

const updateBlog = async credentials => {
    const config = {
        headers: { Authorization: token }
    }
    try {
        const res = await axios.put(`${baseUrl}/${credentials.id}`, credentials, config)
        return res
    } catch (exception) {
        console.log(exception.message)
    }
}

const deleteBlog = async credentials => {
    const config = {
        headers: { Authorization: token }
    }
    try {
        await axios
            .delete(`${baseUrl}/${credentials.id}`, config)
    } catch (exception) {
        console.log(exception.message)
    }
}

export default { getAll, setToken, createNew, updateBlog, deleteBlog }