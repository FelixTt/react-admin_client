import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input,
  Tree
} from 'antd'
import menuList from '../../config/menuConfig'

const Item = Form.Item
const { TreeNode } = Tree;

export default class AuthForm extends PureComponent {

  state = {
    CheckedKeys: []
  }

  static propTypes = {
    role: PropTypes.object
  }

  /*
  为父组件提交获取最新menus数据的方法
   */
  getMenus = () => this.state.checkedKeys


  // 选中某个node时的回调
  onCheck = (checkedKeys, e) => {
    console.log('onCheck', checkedKeys, e);
    this.setState({
      checkedKeys
    })
  };

  render() {
    const {role} = this.props
    const formItemLayout = {
      labelCol: { span: 4 },  // 左侧label的宽度
      wrapperCol: { span: 15 }, // 右侧包裹的宽度
    }

    return (
      <div>
        <Item label='角色名称' {...formItemLayout}>
          <Input value={role.name} disabled/>
        </Item>

        <Tree
          checkable
          defaultExpandAll={true}
          defaultCheckedKeys={role.menus}
          onCheck={this.onCheck}
          treeData={menuList}
        />
      </div>
    )
  }
}