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