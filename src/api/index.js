import jsonp from 'jsonp'
import ajax from './ajax'

import { message } from 'antd'

// export function reqLogin(username, password) {
//     return ajax('/login', {username, password}, 'POST')
// }

// 登录
export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')

// 天气 jsonp 请求的接口请求函数
export const  reqWeather = (city) => {
    const url = ''
    jsonp(url, {}, (err,data) => {
        if(!err && data.status === 'success') {
            // data.result[0]
        } else {

        }
    })
    
}