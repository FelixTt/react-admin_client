import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './index.css'

import menuList from '../../config/menuConfig'

import { Menu, Button } from 'antd';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';
const { SubMenu } = Menu;

class LeftNav extends Component {

    state = {
        collapsed: false,
      };
    
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    /*
    根据menu的数据数组生成对应的标签数组
    使用map() + 递归调用
    */
    getMenuNodes_map = (menuList) => {
        const path = this.props.location.pathname

        return menuList.map(item => {
        
        if(!item.children) {
            return (
            <Menu.Item key={item.key} icon={<PieChartOutlined />}>
                <Link to={item.key}></Link>
                <span>{item.title}</span>
            </Menu.Item>

            )
        } else {

            // 查找一个与当前请求路径匹配的子Item
            const cItem = item.children.find(cItem => cItem.key === path)
            // 如果存在
            if(cItem) {
                this.openKey = item.key
            }

            return (
                <SubMenu key={item.key} icon={<MailOutlined />} title={item.title}>
                    {this.getMenuNodes_map(item.children)}
                </SubMenu>
            )
        }

        })
    }

    /*
    根据menu的数据数组生成对应的标签数组
    使用reduce() + 递归调用
    */
    // getMenuNodes = (menuList) => {
    //     // 得到当前请求的路由路径
    //     const path = this.props.location.pathname

    //     return menuList.reduce((pre, item) => {

    //     // 如果当前用户有item对应的权限, 才需要显示对应的菜单项
    //     if (this.hasAuth(item)) {
    //         // 向pre添加<Menu.Item>
    //         if(!item.children) {
    //         pre.push((
    //             <Menu.Item key={item.key}>
    //             <Link to={item.key}>
    //                 <span>{item.title}</span>
    //             </Link>
    //             </Menu.Item>
    //         ))
    //         } else {

    //         // 查找一个与当前请求路径匹配的子Item
    //         const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
    //         // 如果存在, 说明当前item的子列表需要打开
    //         if (cItem) {
    //             this.openKey = item.key
    //         }


    //         // 向pre添加<SubMenu>
    //         pre.push((
    //             <SubMenu
    //             key={item.key}
    //             title={
    //                 <span>
    //             <span>{item.title}</span>
    //             </span>
    //             }
    //             >
    //             {this.getMenuNodes(item.children)}
    //             </SubMenu>
    //         ))
    //         }
    //     }

    //     return pre
    //     }, [])
    // }

    /*
    在第一次render()之前执行一次
    为第一个render()准备数据(必须同步的)
    */
    componentWillMount () {
        this.menuNodes = this.getMenuNodes_map(menuList)
    }


    
    render() {

        const path = this.props.location.pathname

        const openKey = this.openKey


        return (
            <div>
                <div className="left-nav">
                    <Link to='/' className="left-nav-header">
                        <h1>菜单栏</h1>
                    </Link>
                    <div style={{ width: 200 }}>
                        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                        </Button>
                        <Menu
                            defaultSelectedKeys={[path]}
                            defaultOpenKeys={[openKey]}
                            mode="inline"
                            theme="dark"
                            inlineCollapsed={this.state.collapsed}
                        >
                            {/* <Menu.Item key="1" icon={<PieChartOutlined />}>
                                <Link to='/home'></Link>
                                <span>首页</span>
                            </Menu.Item>
                            <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
                                <Menu.Item key="5">
                                    <Link to='/category'></Link>
                                    <span>商品分类</span>
                                </Menu.Item>
                                <Menu.Item key="6">
                                    <Link to='/products'></Link>
                                    <span>商品管理</span>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<MailOutlined />} title="图表分析">
                                <Menu.Item key="7">
                                    <Link to='/charts/line'></Link>
                                    <span>条状图</span>
                                </Menu.Item>
                                <Menu.Item key="8">
                                    <Link to='/charts/pie'></Link>
                                    <span>饼状图</span>
                                </Menu.Item>
                                <Menu.Item key="9">
                                    <Link to='/charts/bar'></Link>
                                    <span>条状图</span>
                                </Menu.Item>
                            </SubMenu>
                            <Menu.Item key="2" icon={<ContainerOutlined />}>
                            <Link to='/user'></Link>
                                <span>用户管理</span>
                            </Menu.Item>
                            <Menu.Item key="3" icon={<ContainerOutlined />}>
                            <Link to='/role'></Link>
                                <span>角色管理</span>
                            </Menu.Item> */}

                        {
                            this.menuNodes
                        }
                        </Menu>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(LeftNav)