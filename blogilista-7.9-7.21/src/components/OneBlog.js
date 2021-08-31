import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { initializeBlogs, like, newComment } from '../reducers/blogReducer'
import { setErrorNotification } from '../reducers/errorReducer'
import blogService from '../services/blogs'

const OneBlog = ({ blogs, dispatch, user, newCreated, setNewCreated }) => {
    const [comment, setComment] = useState('')
    const id = useParams().id
    const currentBlog = blogs.find(blog => blog === undefined ? blog = [] : String(blog.id) === id)
    if (!currentBlog) {
        return null
    }


    const newLike = () => {
        try {
            dispatch(like(currentBlog, user))
            newCreated ? setNewCreated(false) : setNewCreated(true)
        } catch (exception) {
            dispatch(setErrorNotification(exception.message))
        }
        dispatch(initializeBlogs())
    }


    const addComment = (e) => {
        e.preventDefault()
        if (comment.length < 1) return
        try {
            if(currentBlog.comments === null){
                currentBlog.comments = []
            }
            dispatch(newComment(currentBlog, comment, user))
            setComment('')
        } catch (exception) {
            dispatch(setErrorNotification(exception.message))
        }
        dispatch(initializeBlogs())
    }

    const deleteBlog = async (blog) => {
        let ask = window.confirm(`Remove blog ${blog.title}?`)
        if (ask) {
            try {
                await blogService.deleteBlog({
                    id: blog.id
                })
                dispatch(initializeBlogs())
            } catch (exception) {
                console.log(exception.message)
            }
        }
    }

    const renderComments = currentBlog.comments !== null ? currentBlog.comments.map(comment => {
        return <ul key={comment}><li>{comment}</li></ul>
    }) : null


    return (
        <div>
            <h1>{currentBlog.title}</h1>
            <a href={currentBlog.url}>{currentBlog.url}</a>
            <p>{currentBlog.likes} likes <button onClick={() => newLike()} >Like</button></p>
            <p>added by {currentBlog.user.name}</p>
            <button onClick={() => deleteBlog(currentBlog)}>Delete blog</button>
            <form onSubmit={addComment}>
                <input type="text" value={comment} onChange={(e) => setComment(e.target.value)}></input>
                <button type="submit">add comment</button>
            </form>
            <h3>comments</h3>
            {renderComments}
        </div>
    )
}

export default OneBlog