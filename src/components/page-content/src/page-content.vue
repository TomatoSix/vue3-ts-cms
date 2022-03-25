<template>
  <div class="page-content">
    <hy-table
      :listData="dataList"
      v-bind="contentTableConfig"
      @selectionChange="selectionChange"
    >
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
      <template #handle>
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
import { defineComponent, computed } from 'vue'
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
    store.dispatch('system/getPageListAction', {
      // pageUrl: '/users/list',
      pageName: props.pageName,
      queryInfo: {
        offset: 0,
        size: 30
      }
    })
    // 从vuex中获取用户列表数据和列表总数
    const dataList = computed(() => {
      // console.log(store.state.system.userList)

      return store.getters[`system/pageListData`](props.pageName)
    })
    // const userCount = computed(() => store.state.system.roleList)

    const selectionChange = (data: any) => {
      console.log(data[0].name, 'id')
    }
    return {
      dataList,
      selectionChange
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
