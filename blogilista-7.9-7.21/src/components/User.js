import React from 'react'
import { useParams } from 'react-router-dom'

const User = ({ users, blogs }) => {
    const id = useParams().id
    const currentUser = users.find(u => String(u.user.id) === id)
    const renderBlogs = blogs.map(blog => String(blog.user.id) === id ? <ul key={blog.id}><li>{blog.title}</li></ul> : null)
    if(!currentUser){
        return null
    }
    return(
        <div>
            <h1>{currentUser.user.name}</h1>
            <br></br>
            <h3>added blogs</h3>
            {renderBlogs}
        </div>
    )
}

export default User