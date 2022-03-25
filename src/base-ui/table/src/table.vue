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
    <div class="footer">
      <slot name="footer">
        <el-pagination
          v-model:currentPage="currentPage4"
          v-model:page-size="pageSize4"
          :page-sizes="[100, 200, 300, 400]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
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
    title: {
      type: String,
      default: () => ''
    },
    listData: {
      type: Array,
      required: true
    },
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
    }
  },
  emits: ['selectionChange'],
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
    return {
      handleSelectionChange
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
