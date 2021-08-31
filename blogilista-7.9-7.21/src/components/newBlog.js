import React, { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { setErrorNotification } from '../reducers/errorReducer'
import { createNewBlog } from '../reducers/blogReducer'
import { TextField, Button  } from '@material-ui/core'

const Create = ({ dispatch, newCreated, setNewCreated }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [createNewVisible, setCreateNewVisible] = useState(false)

    const showWhenVisible = { display: createNewVisible ? '' : 'none' }
    const hideWhenVisible = { display: createNewVisible ? 'none' : '' }

    const handleSubmit = async e => {
        e.preventDefault()
        if (title === '' || author === '' || url === '') {
            dispatch(setErrorNotification('Missing title, author or url', 5))
            return
        }
        try {
            dispatch(createNewBlog({ title: title, author: author, url: url, likes: 0 }))
            setTitle('')
            setAuthor('')
            setUrl('')
            setCreateNewVisible(false)
            dispatch(setNotification(`a new blog ${title} by ${author} added`, 5))
            newCreated ? setNewCreated(false) : setNewCreated(true)
        } catch (error) {
            dispatch(setErrorNotification('Error', 5))
        }
    }


    return (
        <div>
            <Button variant="contained" style={hideWhenVisible} onClick={() => setCreateNewVisible(true)}>Create new blog</Button>
            <div style={showWhenVisible}>
                <form id="form" onSubmit={handleSubmit}>
                    <div>
                        <h1>Create new</h1>
                    </div>
                    <div>
                        <TextField label="title" id="title" type="text" value={title} onChange={({ target }) => setTitle(target.value)}></TextField>
                    </div>
                    <div>
                        <TextField label="author" id="author" type="text" value={author} onChange={({ target }) => setAuthor(target.value)}></TextField>
                    </div>
                    <div>
                        <TextField label="url" id="url" type="text" value={url} onChange={({ target }) => setUrl(target.value)}></TextField>
                    </div>
                    <Button variant="contained" id="create" type="submit">Create</Button>
                </form>
                <Button variant="contained" onClick={() => setCreateNewVisible(false)}>Cancel</Button>
            </div>
        </div>
    )
}

export default Create