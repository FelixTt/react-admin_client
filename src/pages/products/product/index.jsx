import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Detail from './detail.jsx'
import ProductAddAndUpdate from './addAndUpdate.jsx'
import ProductHome from './productHome.jsx'

export default class Products extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/products/product' component={ProductHome} exact></Route>
                    <Route path='/products/product/detail' component={Detail}></Route>
                    <Route path='/products/product/addAndUpdate' component={ProductAddAndUpdate}></Route>
                </Switch>
            </div>
        )
    }
}
