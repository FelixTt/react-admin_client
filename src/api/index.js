import ajax from './ajax'

// export function reqLogin(username, password) {
//     return ajax('/login', {username, password}, 'POST')
// }

// 登录
export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')
