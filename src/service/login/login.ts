import hyRequest from '../index'

import { IAccount, IDataType, ILoginResult } from './types'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', //users/1
  UserMenu = '/role/' // 用法：role/1/menu
}

// 登录
export function accountLoginRequest(account: IAccount) {
  return hyRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

// 请求用户数据
export function requestUserInfoById(id: number) {
  return hyRequest.get<IDataType<any>>({
    url: LoginAPI.LoginUserInfo + id
  })
}

// 获取用户菜单
export function requestUserMenuByRoleId(id: number) {
  return hyRequest.get<IDataType<any>>({
    url: LoginAPI.UserMenu + id + '/menu'
  })
}
