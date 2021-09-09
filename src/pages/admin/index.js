import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import storage from '../../utils/storage'

export default class Admin extends Component {    
    render() {
        const user = storage.getUser()
        if (!user || !user._id) {
            return <Redirect to='/login'></Redirect>
        }
        return (
            <div>
                hello, {user.username}
            </div>
        )
    }
}
