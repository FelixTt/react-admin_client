import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import storage from '../../utils/storage'
import Header from '../../components/header'
import LeftNav from '../../components/left-nav'

import Home from '../home'
import Products from '../products/product'
import Category from '../products/category'
import Role from '../role'
import User from '../user'
import Line from '../charts/line'
import Bar from '../charts/bar'
import Pie from '../charts/pie'


import { Layout } from 'antd';
const { Footer, Sider, Content } = Layout;


export default class Admin extends Component {    
    render() {
        const user = storage.getUser()
        if (!user || !user._id) {
            return <Redirect to='/login'></Redirect>
        }
        return (
            <Layout style={{height: '100%'}}>
                <Sider>
                    <LeftNav></LeftNav>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{margin: 20, backgroundColor: '#fff'}}>
                        <Switch>
                            <Route path="/home" component={Home}></Route>
                            <Route path="/products/category" component={Category}></Route>
                            <Route path="/products/product" component={Products}></Route>
                            <Route path="/role" component={Role}></Route>
                            <Route path="/user" component={User}></Route>
                            <Route path="/charts/bar" component={Bar}></Route>
                            <Route path="/charts/line" component={Line}></Route>
                            <Route path="/charts/pie" component={Pie}></Route>
                            
                            <Redirect to='/home'></Redirect>
                        </Switch>
                    </Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}
