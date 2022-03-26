<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

import { usePageSearch } from '@/hooks/use-page-search'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    // 使用hook
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    // const pageContentRef = ref<InstanceType<typeof PageContent>>()

    // const handleResetClick = () => {
    //   pageContentRef.value?.getPageData()
    // }
    // const handleQueryClick = (queryInfo: any) => {
    //   pageContentRef.value?.getPageData(queryInfo)
    // }
    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped lang="less">
.user {
  .content {
    padding: 0 20px;

    .handle-btns {
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
