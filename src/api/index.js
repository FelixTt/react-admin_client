import jsonp from 'jsonp'
import ajax from './ajax'

import { message } from 'antd'

// export function reqLogin(username, password) {
//     return ajax('/login', {username, password}, 'POST')
// }

// 登录
export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')

// 天气 jsonp 请求的接口请求函数
// export const  reqWeather = (city) => {
//     const url = ''
//     jsonp(url, {}, (err,data) => {
//         if(!err && data.status === 'success') {
//             // data.result[0]
//         } else {

//         }
//     })
    
// }

// 添加用户
export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST')

//获取一级 / 二级分类
export const reqCategories = (parentId) => ajax('/manage/category/list', {parentId})

// 添加分类
export const reqAddCategories = (categoryName, parentId) => ajax('/manage/category/add', {categoryName, parentId}, 'POST')

// 更新分类
export const reqUpdateCategories = ({categoryId, categoryName}) => ajax('/manage/category/update', {categoryId, categoryName}, 'POST')

// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax('/manage/product/list', {pageNum, pageSize})

// 搜索商品分页列表
// export const reqSearchProductsByName = (pageNum, pageSize, searchName) => ajax('/manage/product/search', {
//     pageNum,
//     pageSize,
//     productName: searchName,
// })
// export const reqSearchProductsByDesc = (pageNum, pageSize, searchDesc) => ajax('/manage/product/search', {
//     pageNum,
//     pageSize,
//     productDesc: searchDesc,
// })
export const reqSearchProducts = ({pageNum, pageSize, searchName, searchType}) => ajax('/manage/product/search', {
    pageNum,
    pageSize,
    [searchType]: searchName,
})

// 获取一个分类
export const reqCategory = (categoryId) => ajax('/manage/category/info', {categoryId})

// 更新商品的状态(上架/下架)
export const reqUpdateStatus = (productId, status) => ajax('/manage/product/updateStatus', {productId, status}, 'POST')

// 添加/修改商品
export const reqAddOrUpdateProduct = (product) => ajax('/manage/product/' + ( product._id?'update':'add'), product, 'POST')

// 删除指定名称的图片
export const reqDeleteImg = (name) => ajax('/manage/img/delete', {name}, 'POST')

// 获取所有角色的列表
export const reqRoles = () => ajax('/manage/role/list')
// 添加角色
export const reqAddRole = (roleName) => ajax('/manage/role/add', {roleName}, 'POST')
// 添加角色
export const reqUpdateRole = (role) => ajax('/manage/role/update', role, 'POST')


// 获取所有用户的列表
export const reqUsers = () => ajax('/manage/user/list')
// 删除指定用户
export const reqDeleteUser = (userId) => ajax('/manage/user/delete', {userId}, 'POST')
// 添加/更新用户
export const reqAddOrUpdateUser = (user) => ajax('/manage/user/'+(user._id ? 'update' : 'add'), user, 'POST')