import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    switch (action.type) {
    case 'new':
        return [...state, action.data]
    case 'like':
        return [...state, action.data]
    case 'comment':
        return [...state, action.data]
    case 'init':
        return action.data
    default:
        return state
    }
}

export const like = (blog, user) => {
    return async dispatch => {
        const newBlog = await blogService.updateBlog({
            id: blog.id,
            user: user.id,
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1
        })
        dispatch({
            type: 'like',
            id: newBlog.id
        })
    }
}

export const newComment = (blog, comment, user) => {
    return async dispatch => {
        const newBlog = await blogService.updateBlog({
            id: blog.id,
            user: user.id,
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes,
            comments: blog.comments.concat(comment)
        })
        dispatch({
            type: 'comment',
            id: newBlog.id
        })
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'init',
            data: blogs
        })
    }
}

export const createNewBlog = (content) => {
    return async dispatch => {
        const newBlog = await blogService.createNew(content)
        dispatch({
            type: 'new',
            data: newBlog
        })
    }
}

export default blogReducer