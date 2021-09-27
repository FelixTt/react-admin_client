import React, {Component} from 'react'
import {
  Card,
  Button,
  Table,
  Modal,
  message
} from 'antd'
import {PAGE_SIZE} from "../../utils/constants"
import {reqRoles, reqAddRole, reqUpdateRole} from '../../api'
import AddForm from './add-form'
import AuthForm from './auth-form'
import storage from '../../utils/storage'
import {formateDate} from '../../utils/dateUtils'

/*
角色路由
 */
export default class Role extends Component {

    myRef = React.createRef()
    auth = React.createRef()

    state = {
      roles: [], // 所有角色的列表
      role: {}, // 选中的role
      isShowAdd: false, // 是否显示添加界面
      isShowAuth: false, // 是否显示设置权限界面
    }
  
    initColumn = () => {
      this.columns = [
        {
          title: '角色名称',
          dataIndex: 'name'
        },
        {
          title: '创建时间',
          dataIndex: 'create_time',
          render: (create_time) => formateDate(create_time),
        },
        {
          title: '授权时间',
          dataIndex: 'auth_time',
          render: formateDate,
        },
        {
          title: '授权人',
          dataIndex: 'auth_name'
        },
      ]
    }
  
    getRoles = () => {
      reqRoles().then(result => {
        if (result.data.status===0) {
          const roles = result.data.data
          this.setState({
            roles
          })
        }
      })
    }

    // 设置行属性
    onRow = (record) => {
        return {
            onClick: event => { // 点击行
            // 将点击的记录放置到 state 中
            this.setState({
              record
            })
            },
        }
    }

    addRole = ()=> {
      this.form.validateFields().then(value => {
        // 隐藏确认框
        this.setState({
          isShowAdd: false
        })

        // 收集输入数据
        const {roleName} = value

        // 请求添加
        reqAddRole(roleName).then(result => {
          if(result.data.status === 0) {
            message.success('新增用户成功~')

            const role = result.data.data

            // 更新roles状态: 基于原本状态数据更新
            this.setState(state => ({
              roles: [...state.roles, role]
            }))
          } else {
            message.error('新增用户失败！')
          }
        })

      })
    }

    updateRole = ()=> {
      // 隐藏确认框
      this.setState({
        isShowAuth: false
      })

      const role = this.state.role
      // 得到最新的menus
      const menus = this.auth.current.getMenus()
      role.menus = menus
      role.auth_time = Date.now()
      role.auth_name = storage.getUser().username

      // 请求更新
      reqUpdateRole(role).then(result => {
        if (result.data.status===0) {
          // // this.getRoles()
          // // 如果当前更新的是自己角色的权限, 强制退出
          // if (role._id === storage.getUser().role_id) {
          //   storage.removeUser()
          //   storage.saveUser = {}
          //   this.props.history.replace('/login')
          //   message.success('当前用户角色权限成功')
          // } else {
          //   message.success('设置角色权限成功')
          //   this.setState({
          //     roles: [...this.state.roles]
          //   })
          // }

          message.success("当前用户角色权限成功")
        }
      })
    }
  
    componentWillMount () {
      this.initColumn()
    }
  
    componentDidMount () {
      this.getRoles()
    }
  
    render() {
  
      const {roles, role, isShowAdd, isShowAuth} = this.state
  
      const title = (
        <span>
          <Button type='primary'  onClick={() => this.setState({isShowAdd: true})}>创建角色</Button> &nbsp;&nbsp;
          <Button type='primary' disabled={!role._id} onClick={() => this.setState({isShowAuth: true})}>设置角色权限</Button>
        </span>
      )
  
      return (
        <Card title={title}>
          <Table
            bordered
            rowKey='_id'
            dataSource={roles}
            columns={this.columns}
            pagination={{defaultPageSize: PAGE_SIZE}}
            rowSelection={{
                type: 'radio',
                selectedRowKeys: [role._id],  // 判断数组里面是否有值，有的话表示选中
                onSelect: (role) => { // 选择某个radio时回调
                  this.setState({
                    role
                  })
                }
              }}
            onRow={this.onRow}
          />

          <Modal
            title="添加角色"
            visible={isShowAdd}
            onOk={this.addRole}
            destroyOnClose={true}
            onCancel={() => {
              this.setState({isShowAdd: false})
            }}>
            {/* 接收一个 form 挂载到 this 中，为了后期方便读取 */}
            <AddForm setForm={(form) => this.form = form} />
          </Modal>

          <Modal
            title="设置角色权限"
            visible={isShowAuth}
            destroyOnClose={true}
            onOk={this.updateRole}
            onCancel={() => {
              this.setState({isShowAuth: false})
            }}>
              <AuthForm ref={this.auth} role={role}/>
          </Modal>
        </Card>
      )
    }
  }
  