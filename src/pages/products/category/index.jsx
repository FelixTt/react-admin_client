import React, { Component } from 'react'

import { Card, Button, Table, Modal, message } from 'antd';

import LinkButton from '../../../components/link-button'
import {reqCategories, reqUpdateCategories, reqAddCategories } from '../../../api/index'
import AddForm from './add-form'
import UpdateForm from './update-form'

export default class Category extends Component {

  state = {
    loading: false,
    categories: [],  // 一级分类列表
    subCategories: [],  // 二级分类列表
    parentId: '0', 
    parentName: '',
    showStatus: 0,
  }

  initColumns = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width: 300,
        render: (category) => (
          <span>
              <LinkButton onClick={() => {this.showUpdate(category)}}>修改分类</LinkButton>
              {this.state.parentId === '0' ? <LinkButton onClick={() => {this.showSubCategories(category)}}>查看子分类</LinkButton> : null}
              
          </span>
        ),
      },
    ];
  }

  getCategories = async () => {
    this.setState({loading: true})
    reqCategories(this.state.parentId).then(result => {
      this.setState({loading: false})
      const categories = result.data.data
      if(result.data.status === 0) {
        if(this.state.parentId === '0') {
          this.setState({categories})
        } else {
          const subCategories = result.data.data
          this.setState({subCategories})
        }
      }
    })
  }

  showSubCategories = (category) => {
    this.setState({
      parentId:category._id,
      parentName: category.name
    }, () => {
      // 要注意！
      // console.log('parentId', this.state.parentId)
      this.getCategories()
    })
  }

  showFirstCategory = () => {
    this.setState({
      parentId: '0',
      parentName: '',
      subCategories: [],
    })
  }

  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }
  
  showUpdate = (category) => {
    this.category = category

    this.setState({
      showStatus: 2
    })
  }

  handleCancel = () => {
    this.setState({
      showStatus: 0,
    })
  }

  addCategory = async () => {
    this.form
      .validateFields()
      .then(async (values) => {
        // 1.隐藏弹框
        this.setState({
          showStatus: 0,
        });
        // 2.收集数据，发送请求
        const { parentId, categoryName } = values;
        // console.log(parentId);
        // console.log(categoryName);
        reqAddCategories(categoryName, parentId).then(result => {
          if (result.data.status === 0) {
            // 3.重新显示列表
            console.log('parentId', parentId)
            if (parentId === this.state.parentId) {
              // 如果添加的是当前分类下的列表，则刷新，其他分类的不刷新
              this.getCategories()
            } else if (parentId === "0") {
              // 在二级分类列表下添加一级分类，重新获取一级分类列表，但不需要显示
              
            }
          }
        })
        
        // 以下代码 会有问题，result 为 undefined
        // const result = await reqAddCategories(categoryName, parentId);
        // if (result.status === 0) {
        //   // 3.重新显示列表
        //   if (parentId === this.state.parentId) {
        //     // 如果添加的是当前分类下的列表，则刷新，其他分类的不刷新
        //     this.getCategories()
        //   } else if (parentId === "0") {
        //     // 在二级分类列表下添加一级分类，重新获取一级分类列表，但不需要显示
        //     this.getCategories("0");
        //   }
        // }
      })
      .catch((err) => {
        message.info("请输入分类名称");
      });
  }
  
  updateCategory = () => {

    this.form.validateFields().then(value => {
        // 隐藏弹出框
        this.setState({
          showStatus: 0,
        })

        // 发送更新列表(拿到数据，组装数据发送)
        const categoryId = this.category._id
        // const categoryName = this.form.getFieldValue('categoryName')
        const categoryName = value.categoryName

        reqUpdateCategories({categoryId, categoryName}).then(result => {
          if(result.data.status === 0) {
            // 重新展示
            this.getCategories()
          }
        })
    })

    

  }

  // 为第一次 render() 准备数据
  componentWillMount() {
    this.initColumns()
  }

  // 发送请求
  componentDidMount() {
    this.getCategories()
  }

  render() {

    const category = this.category || {}

    const title = this.state.parentId === '0' ? '一级分类列表' : (
      <span>
        <LinkButton onClick={this.showFirstCategory}>一级分类列表</LinkButton>
        <span>===》</span>
        <span>{this.state.parentName}</span>
      </span>
    )
    const extra = (
        <Button type='primary' onClick={this.showAdd}>
            Add
        </Button>
    )
    
    return (
        <div>
            <Card title={title} extra={extra}>
                <Table 
                    bordered
                    dataSource={this.state.parentId==='0' ? this.state.categories : this.state.subCategories}
                    columns={this.columns}
                    bordered
                    loading={this.state.loading}
                    pagination={{defaultPageSize: 10, showQuickJumper: true}}
                 />

                <Modal
                      title="添加分类"
                      visible={this.state.showStatus === 1}
                      centered
                      destroyOnClose={true}
                      onOk={this.addCategory}
                      onCancel={this.handleCancel}
                    >
                    <AddForm
                      categories={this.state.categories}
                      parentId={this.state.parentId}
                      setForm={(form) => {this.form = form}}
                    />
                </Modal>

                <Modal
                    title="修改分类"
                    visible={this.state.showStatus === 2}
                    centered
                    destroyOnClose={true}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}
                  >
                    <UpdateForm 
                      categoryName={category.name}
                      setForm={(form) => {this.form = form}}
                    />
                </Modal>
            </Card>
        </div>
    )
  }
}
