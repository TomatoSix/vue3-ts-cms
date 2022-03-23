import hyRequest from '../../index'
import { IDataType } from '@/service/types'

export function getPageListAction(url: string, queryInfo: any) {
  return hyRequest.post<IDataType<any>>({
    url,
    data: queryInfo
  })
}
