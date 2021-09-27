import React, { Component } from 'react'

import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './index.css'
import { reqLogin } from '../../api/index'
import storage from '../../utils/storage'

export default class Login extends Component {

    onFinish = (values) => {
        const {username, password, remember} = values;
        reqLogin(username, password).then(response => {
            const result = response.data;
            if (result.status === 0) {
                message.success("login success!")

                const user = result.data
                storage.saveUser(user)

                console.log("===", this.props.history)
                
                this.props.history.replace('/admin')
            } else {
                message.error(result.msg)
            }
        })
      };

    render() {
        return (
            <div className="login">
                <header className="login-header">欢迎~</header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                        name="username"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your Username!',
                            },{
                                min: 4,
                                message: '用户名最少四个字符！'
                            },{
                                max: 12,
                                message: '用户名最多十二个字符！'
                            }
                        ]}
                        >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                        name="password"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your Password!',
                            },{
                            min: 3,
                            message: '密码必须大于2位！',
                            },
                        ]}
                        >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                        </Form.Item>
                        <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                        </Form.Item>

                        <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <a href="">register now!</a>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
