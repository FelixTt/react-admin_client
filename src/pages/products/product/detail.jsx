import React, { Component } from 'react'
import {BASE_IMG_URL} from '../../../utils/constants'
import { Card, List } from 'antd'
import LinkButton from '../../../components/link-button'
import {reqCategory} from '../../../api'
import './index.css'

const Item = List.Item

export default class Detail extends Component {
    
    state = {
        cName1: '', // 一级分类名称
        cName2: '', // 二级分类名称
    }

    componentDidMount() {
        // 得到当前商品的分类ID
        const {pCategoryId, categoryId} = this.props.location.state.product
        if(pCategoryId==='0') { // 一级分类下的商品
            reqCategory(categoryId).then(result => {
                const cName1 = result.data.name
                this.setState({cName1})
            })
        } else { // 二级分类下的商品
            /*
            //通过多个await方式发多个请求: 后面一个请求是在前一个请求成功返回之后才发送
            const result1 = await reqCategory(pCategoryId) // 获取一级分类列表
            const result2 = await reqCategory(categoryId) // 获取二级分类
            const cName1 = result1.data.name
            const cName2 = result2.data.name
            */

            // 一次性发送多个请求, 只有都成功了, 才正常处理
            Promise.all([reqCategory(pCategoryId), reqCategory(categoryId)]).then(results => {
                const cName1 =results[0].data.data.name
                const cName2 = results[1].data.data.name
                this.setState({
                    cName1,
                    cName2
                })
            })
        
        }
    }

    render() {

        const {name, desc, price, detail, imgs} = this.props.location.state.product
        const {cName1, cName2} = this.state

        const title = (
            <span>
                <LinkButton onClick={() => {this.props.history.goBack()}}>《=== </LinkButton>
                <span>商品详情</span>
            </span>
        )
        return (
            <div>
                <Card title={title} className='products-detail'>
        <List>
          <Item>
            <span className="left">商品名称:</span>
            <span>{name}</span>
          </Item>
          <Item>
            <span className="left">商品描述:</span>
            <span>{desc}</span>
          </Item>
          <Item>
            <span className="left">商品价格:</span>
            <span>{price}元</span>
          </Item>
          <Item>
            <span className="left">所属分类:</span>
            <span>{cName1} {cName2 ? ' --> '+cName2 : ''}</span>
          </Item>
          <Item>
            <span className="left">商品图片:</span>
            <span>
              {
                imgs.map(img => (
                  <img
                    key={img}
                    src={BASE_IMG_URL + img}
                    className="products-img"
                    alt="img"
                  />
                ))
              }
            </span>
          </Item>
          <Item>
            <span className="left">商品详情:</span>
            {/* 下面的span有内容就会报错？ */}
            <span dangerouslySetInnerHTML={{__html: detail}}>
            </span>
          </Item>

        </List>
      </Card>
            </div>
        )
    }
}
