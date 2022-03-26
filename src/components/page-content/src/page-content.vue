<template>
  <div class="page-content">
    <hy-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:pageInfo="pageInfo"
      @selectionChange="selectionChange"
      @update:pageInfo="pageInfoChange"
    >
      <!-- 插槽集合 -->
      <template #headerHandler>
        <el-button type="primary" size="medium">新建用户</el-button>
      </template>
      <template #status="scope">
        <el-button
          plain
          size="mini"
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler>
        <div class="handle-btns">
          <el-button size="mini" icon="el-icon-edit">编辑</el-button>
          <el-button size="mini" icon="el-icon-delete">删除</el-button>
        </div>
      </template>
      <!-- <template #footer>1222</template> -->
    </hy-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import HyTable from '@/base-ui/table'
import { useStore } from '@/store'

export default defineComponent({
  components: {
    HyTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const store = useStore()

    // 从vuex中获取用户列表数据和列表总数
    const dataList = computed(() => {
      // console.log(store.state.system.userList)
      return store.getters[`system/pageListData`](props.pageName)
    })
    const dataCount = computed(() => {
      return store.getters[`system/pageListCount`](props.pageName)
    })

    // 双向绑定pageInfo
    const pageInfo = ref({
      currentPage: 1,
      pageSize: 10
    })
    watch(pageInfo, () => getPageData(), { deep: true })

    /**
     * @desc 是否选中
     * @date 2022-03-26
     * @param {any} data:any
     * @returns {any}
     */
    const selectionChange = (data: any) => {
      console.log(data[0].name, 'id')
    }

    /**
     * @desc 获取用户数据
     * @date 2022-03-26
     * @returns {any}
     */
    const getPageData = (queryInfo: any = {}) => {
      store.dispatch('system/getPageListAction', {
        // pageUrl: '/users/list',
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    const pageInfoChange = () => {
      console.log(pageInfo, 'pageInfo')
    }
    return {
      dataList,
      dataCount,
      pageInfo,
      selectionChange,
      getPageData,
      pageInfoChange
    }
  }
})
</script>

<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
