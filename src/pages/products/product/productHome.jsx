import LinkButton from '../../../components/link-button'
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../../api'
import { PAGE_SIZE } from '../../../utils/constants'

import React, { Component } from 'react'
import { Card, Select, Input, Button, Table, message } from 'antd'

const { Option } = Select;



export default class ProductHome extends Component {
    
    state = {
        total: 0,
        products: [],
        loading: false,
        searchName: '',  // 搜索的关键词
        searchType: 'productName',  // 根据哪个字段来收集
    }

    /*
        更新指定商品的状态
    */
    updateStatus =  (productId, status) => {
        reqUpdateStatus(productId, status).then(result => {
            if(result.data.status===0) {
                message.success('更新商品成功')
                this.getProducts(this.pageNum)
            }
        })
        
    }

    initColumns = () => {
        this.columns = [
            {
              title: '商品名称',
              dataIndex: 'name',
            },
            {
              title: '商品描述',
              dataIndex: 'desc',
            },
            {
              title: '价格',
              dataIndex: 'price',
              render: (price) => '￥' + price
            },
            {
                title: '状态',
                // dataIndex: 'status',
                render: (product) => {
                    // 上面注释之后，形参就变化了，这是为什么？？？？？
                    // console.log('product', product)
                    const {status, _id} = product
                    const newStatus = status===1 ? 2 : 1
                    return (
                      <span>
                        <span>{status===1 ? '在售' : '已下架'}</span>
                        <Button
                          type='primary'
                          onClick={() => this.updateStatus(_id, newStatus)}
                        >
                          {status===1 ? '下架' : '上架'}
                        </Button>
                      </span>
                    )
                  }
            },
            {
                title: '操作',
                render: (product) => {
                    return (
                        <span>
                            <span>
                                <LinkButton onClick={() => {this.props.history.push('/products/product/detail', { product })}}>详情</LinkButton>
                                <LinkButton onClick={() => {this.props.history.push('/products/product/addAndUpdate', product)}}>修改</LinkButton>
                            </span>
                        </span>
                    )
                }
            },
          ];
    }

    getProducts = (pageNum) => {
        this.pageNum = pageNum // 保存pageNum, 让其它方法可以看到
        this.setState({
            loading: true
        })

        const { searchName, searchType } = this.state
        let result
        if (searchName) {
            reqSearchProducts({pageNum, pageSize: PAGE_SIZE, searchName, searchType}).then(result => {
                if(result.data.status === 0) {
                    const { total, list } = result.data.data
                    this.setState({
                        total,
                        products: list
                    })
                }
            })
        } else {
            reqProducts(pageNum, PAGE_SIZE).then(result => {
                if(result.data.status === 0) {
                    const { total, list } = result.data.data
                    this.setState({
                        total,
                        products: list
                    })
                }
            })
        }
        this.setState({
            loading: false
        })
    }

    componentWillMount() {
        this.initColumns();
    }

    componentDidMount() {
        this.getProducts(4)
    }

    render() {
        const { products, total, loading, searchType, searchName } = this.state

       
            const title = (
                <span>
                    <Select value={searchType} style={{width:150}} onChange={value => this.setState({searchType:value})}>
                        <Option value='productName'>按名称搜索</Option>
                        <Option value='productDesc'>按描述搜索</Option>
                    </Select>
                    <Input placeholder="关键字" style={{width:200, margin: '0 15px'}} value={searchName} onChange={event => this.setState({searchName:event.target.value})}></Input>
                    <Button type="primary" onClick={() => {this.getProducts(1)}}>搜索</Button>
                </span>
            )
            const extra = (
                <Button>
                    <Button type="primary" onClick={() => {this.props.history.push('/products/product/addAndUpdate')}}>添加商品</Button>
                </Button>
            )
        return (
            <div>
                <Card title={title} extra={extra}></Card>
                <Table
                    rowKey='_id'
                    dataSource={products}
                    columns={this.columns}
                    bordered
                    loading={loading}
                    pagination={{
                        total, 
                        defaultPageSize: PAGE_SIZE, 
                        showQuickJumper: true,
                        onChange: this.getProducts,
                        // onChange: (pageNum) => {this.getProducts(pageNum)},
                    }}
                />
            </div>
        )
    }
}
