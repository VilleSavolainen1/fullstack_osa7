import React from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {


    if (blog === undefined) {
        blog = []
    }
    return (
        <div>
            <div key={blog.id} className="blog">
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </div>
        </div>
    )
}

Blog.propTypes = {
    user: propTypes.object.isRequired,
}

export default Blog