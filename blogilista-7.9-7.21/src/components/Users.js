import React from 'react'
import { Link } from 'react-router-dom'

const Users = ({ users, blogs }) => {

    const filterUsers = users.filter((elem, index) => {
        return users.findIndex(obj => obj.user.name === elem.user.name) === index
    })

    const renderUsers = filterUsers.map(user => {
        let count = 0
        blogs.forEach(blog => blog.user.name === user.user.name ? count++ : null)
        return <tr key={user.user.id}><td><Link to={`/users/${user.user.id}`}>{user.user.name}</Link></td><td><h4>{count}</h4></td></tr>
    })

    return (
        <div>
            <h1>Users</h1>
            <table>
                <tbody>
                    <tr>
                        <td>&nbsp;</td>
                        <td><h4>blogs created</h4></td>
                    </tr>
                    {renderUsers}
                </tbody>
            </table>
        </div>
    )
}

export default Users