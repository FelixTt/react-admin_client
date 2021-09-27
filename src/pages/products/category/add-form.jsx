import React, { Component } from 'react'
import {Form, Select, Input} from 'antd'
import PropTypes from 'prop-types'

// const Item = Form.Item
// const Iption = Select.Option

const { Item } = Form;
const { Option } = Select;

export default class AddForm extends Component {

    formRef = React.createRef();

    static propTypes = {
        categories: PropTypes.array.isRequired, // 一级分类数组
        parentId: PropTypes.string.isRequired, // 父分类的Id
        setForm: PropTypes.func,
    }

    componentDidMount() {
        this.props.setForm(this.formRef.current);
    }

    render() {
        const { categories, parentId } = this.props;
        return (
            // <Form>
            //     <Item name='parentId' initialValue='0'>
            //         <Select>
            //             <option value='0'>一级分类</option>
            //             <option value='1'>电脑</option>
            //             <option value='2'>图书</option>
            //         </Select>
            //     </Item>
            //     <Item name='categoryName' initialValue=''>
            //         <Input placeholder='请输入分类名称'></Input>
            //     </Item>
            // </Form>
            <Form ref={this.formRef}>
              <Item name="parentId" initialValue={parentId}>
                <Select>
                  <Option value="0">一级分类</Option>
                  {categories.map((item) => {
                    return (
                      <Option key={item._id} value={item._id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Item>
              <Item
                name="categoryName"
                rules={[{ required: true, message: "请输入分类名称" }]}
              >
                <Input placeholder="请输入分类名称" />
              </Item>
          </Form>
        )
    }
}