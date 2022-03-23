<template>
  <el-table :data="listData" border style="width: 100%">
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
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    listData: {
      type: Array,
      required: true
    },
    propList: {
      //例如{ prop: 'name', label: '用户名', minWidth: '100',slotName: 'status'  }
      type: Array,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
