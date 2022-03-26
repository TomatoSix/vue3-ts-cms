<template>
  <div class="ht-table">
    <!-- 头部 -->
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <!-- 表格 -->
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <!-- 显示是否可选 -->
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
      ></el-table-column>
      <!-- 显示序号 -->
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        width="70"
        align="center"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center">
          <!-- 默认插槽，#default="scope"表示为作用域插槽， scope.row就表示一行数据 -->
          <template #default="scope">
            <!--
            :name="propItem.slotName" 动态给插槽设置名字，相当于<slot #slotName>
            :row="scope.row"会把row属性添加到scope中，从ope.row中获取属性
          -->
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
        <!-- 或者 -->
        <!-- <el-table-column
            :prop="propItem.prop"
            :label="propItem.label"
            :width="propItem.minWidth"
            align="center"
          /> -->
      </template>
    </el-table>
    <!-- 尾部分页器 -->
    <!-- currentPage就是当前第几页
         page-size就是一页几行数据,相当于size
    -->
    <div class="footer">
      <slot name="footer">
        <el-pagination
          :current-page="pageInfo.currentPage"
          :page-size="pageInfo.pageSize"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    // 标题
    title: {
      type: String,
      // 如果是对象的话，就要用函数返回
      default: ''
    },
    // 列表数据
    listData: {
      type: Array,
      required: true
    },
    // 数据总数
    listCount: {
      type: Number,
      default: 0
    },
    // 首行数据名称
    propList: {
      //例如{ prop: 'name', label: '用户名', minWidth: '100',slotName: 'status'  }
      type: Array,
      required: true
    },
    // 是否显示序号
    showIndexColumn: {
      type: Boolean,
      default: () => false
    },
    // 是否显示可选
    showSelectColumn: {
      type: Boolean,
      default: () => false
    },
    // 分页器数据
    pageInfo: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 })
    }
  },
  emits: ['selectionChange', 'update:pageInfo'],
  setup(props, { emit }) {
    /**
     * @desc 自定义可选触发事件
     * @date 2022-03-24
     * @param {any} value:any
     * @returns {any}
     */
    const handleSelectionChange = (selection: any) => {
      emit('selectionChange', selection)
    }
    const handleSizeChange = (pageSize: number) => {
      // 触发'update:pageInfo', 并重新返回pageInfo对象
      emit('update:pageInfo', { ...props.pageInfo, pageSize })
    }
    const handleCurrentChange = (currentPage: number) => {
      emit('update:pageInfo', { ...props.pageInfo, currentPage })
    }
    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 600;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
