import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Blog from './components/Blog'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import userService from './services/users'
import { initializeBlogs } from './reducers/blogReducer'
import Create from './components/newBlog'
import Notification from './components/Notification'
import Error from './components/Error'
import './index.css'
import LoginForm from './components/Login'
import User from './components/User'
import Users from './components/Users'
import OneBlog from './components/OneBlog'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { initializeUsers } from './reducers/userReducer'
import { AppBar, Toolbar, Button } from '@material-ui/core'


const App = () => {

    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs).sort((a, b) => a.likes - b.likes).reverse()
    const users = useSelector(state => state.users)
    const [user, setUser] = useState(null)
    const [newCreated, setNewCreated] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            blogService.getAll().then(() => dispatch(initializeBlogs()))
        }, 2500)
    }, [dispatch, newCreated])

    useEffect(() => {
        userService.getAll().then(() => dispatch(initializeUsers))
    }, [])


    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggeduser')
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])


    const logout = () => {
        window.localStorage.clear()
        setUser(null)
    }


    if (user === null) {
        return (
            <div>
                <Error />
                <LoginForm setUser={setUser} />
            </div>
        )
    }


    return (
        <Container>
            <div>
                <Router>
                    <AppBar position="static">
                        <Toolbar>
                            <Button color="inherit" component={Link} to="/users">Users</Button>
                            <Button color="inherit" component={Link} to="/">Blogs</Button>
                            <p>{user.username} is logged in<Button color="inherit" onClick={() => logout()}>Logout</Button></p>
                        </Toolbar>
                    </AppBar>
                    <Notification />
                    <Error />
                    <Switch>
                        <Route path="/users/:id">
                            <User users={users} blogs={blogs} />
                        </Route>
                        <Route path="/blogs/:id">
                            <OneBlog blogs={blogs} dispatch={dispatch} user={user} newCreated={newCreated} setNewCreated={setNewCreated} />
                        </Route>
                        <Route path="/users">
                            <Users users={users} blogs={blogs} />
                        </Route>
                        <Route path="/">
                            <h1>Blogs</h1>
                            <Create
                                user={user}
                                dispatch={dispatch}
                                newCreated={newCreated}
                                setNewCreated={setNewCreated}
                            />
                            {blogs.map(blog => blog !== undefined ?
                                <Blog key={blog.id} blog={blog} user={user} dispatch={dispatch} />
                                : null)}
                        </Route>
                    </Switch>
                </Router>
            </div>
        </Container>
    )
}

export default App