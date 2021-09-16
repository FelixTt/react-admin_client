import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {Form, Input} from 'antd'

const Item = Form.Item

export default class updateForm extends Component {

    formRef = React.createRef();

    static propTypes = {
        categoryName: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.setForm(this.formRef.current)
    }    

    render() {
        return (
            <Form ref={this.formRef}>
                <Item name='categoryName' initialValue={this.props.categoryName}>
                    <Input placeholder='请输入分类名称'></Input>
                </Item>
            </Form>
        )
    }
}