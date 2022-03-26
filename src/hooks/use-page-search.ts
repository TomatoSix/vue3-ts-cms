import { ref } from 'vue'
import PageContent from '@/components/page-content'

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()

  /**
   * @desc 重置按钮
   * @date 2022-03-26
   * @returns {any}
   */
  const handleResetClick = () => {
    pageContentRef.value?.getPageData()
  }

  /**
   * @desc 参数查询
   * @date 2022-03-26
   * @param {any} queryInfo:any
   * @returns {any}
   */
  const handleQueryClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo)
  }

  return [pageContentRef, handleResetClick, handleQueryClick]
}
