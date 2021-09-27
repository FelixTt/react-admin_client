import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import menuList from '../../config/menuConfig'
import storage from '../../utils/storage'
import LinkButton from '../../components/link-button'
import './index.css'

class Header extends Component {

    logout = () => {
        Modal.confirm({
            title: '',
            icon: <ExclamationCircleOutlined />,
            content: '确定要退出登录吗?',
            onOk:  ()=> {
            //   return new Promise((resolve, reject) => {
            //     setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            //   }).catch(() => console.log('Oops errors!'));
                // 删除 user 数据
                storage.removeUser()
                storage.saveUser = {}
                // 跳转到 login
                this.props.history.replace('/login')
            },
            onCancel() {},
          })
    }

    getTitle = () => {
        const path = this.props.location.pathname
        let title
        menuList.forEach(item => {
            if (item.key === path) {
                title = item.title
            } else if(item.children) {
                const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
                if(cItem) {
                    title = cItem.title
                }
            }
        })
        return title
    }

    render() {

        const title = this.getTitle()
        const username = storage.getUser().username

        return (
            <div className="header">
                <div className="header-top">
                    <span>welcome, {username}</span>
                    <LinkButton href="javascript:" onClick={this.logout}>Logout</LinkButton>
                </div>
                <div className="header-bottom">
                     <div className="header-bottom-left">{title}</div>
                     <div className="header-bottom-right">
                         <span>2021-9-11</span>
                         <span>天气：晴天</span>
                     </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)