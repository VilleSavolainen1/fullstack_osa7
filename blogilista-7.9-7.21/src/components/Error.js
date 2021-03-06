import React from 'react'
import { useSelector } from 'react-redux'

const Error = () => {
    const message = useSelector(state => state.error)
    if(message === null){
        return null
    }
    return (
        <div className="error">
            {message}
        </div>
    )
}

export default Error