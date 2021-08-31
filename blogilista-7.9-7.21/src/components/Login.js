import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setErrorNotification } from '../reducers/errorReducer'


const LoginForm = ({ setUser }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem('loggeduser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            dispatch(setErrorNotification('wrong username or password', 5))
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <div>
                <h1>Log in to application</h1>
            </div>
            <div>
                username
                <input id="username" type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}></input>
            </div>
            <div>
                password
                <input id="password" type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}></input>
            </div>
            <button id="login" type="submit">Login</button>
        </form>
    )
}

LoginForm.propTypes = {
    setUser: propTypes.func.isRequired
}

export default LoginForm