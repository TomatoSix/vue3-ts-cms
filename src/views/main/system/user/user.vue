<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      class="search"
    ></page-search>
    <div class="content">
      <hy-table :data="userList" :propList="propList">
        <template #status="scope">{{
          scope.row.enable ? '启用' : '禁用'
        }}</template>
        <template #createAt="scope">{{ scope.row.createAt }}</template>
      </hy-table>
    </div>

    <!-- 总数为{{ userCount }} -->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import PageSearch from '@/components/page-search'
import { searchFormConfig } from './config/search.config'
import HyTable from '@/base-ui/table'
export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    HyTable
  },
  setup() {
    const store = useStore()
    store.dispatch('system/getPageListAction', {
      pageUrl: '/users/list',
      queryInfo: {
        offset: 0,
        size: 30
      }
    })
    // 从vuex中获取用户列表数据和列表总数
    const userList = computed(() => {
      console.log(store.state.system.userList)

      return store.state.system.userList
    })
    const userCount = computed(() => store.state.system.userCount)

    const propList = [
      { prop: 'name', label: '用户名', minWidth: '100' },
      { prop: 'realname', label: '真实姓名', minWidth: '100' },
      { prop: 'cellphone', label: '手机号码', minWidth: '200' },
      { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
      {
        prop: 'createAt',
        label: '创建时间',
        minWidth: '250',
        slotName: 'createAt'
      },
      {
        prop: 'updateAt',
        label: '更新时间',
        minWidth: '250',
        slotName: 'updateAt'
      }
    ]
    return {
      searchFormConfig,
      userList,
      userCount,
      propList
    }
  }
})
</script>

<style scoped lang="less">
.user {
  .content {
    padding: 0 20px;
  }
}
</style>
