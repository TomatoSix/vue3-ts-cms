import { ILoginState } from './login/types'

export interface IRootState {
  name: string
  age: number
}

export interface IRootWithModule {
  login: ILoginState
}

// 把上面两个结合起来
export type IStoreType = IRootState & IRootWithModule
