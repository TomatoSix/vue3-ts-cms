<template>
  <div class="hy-form">
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <!-- 响应式布局 -->
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <!-- 判断form表单的类型 -->
              <!-- input框 -->
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  v-model="formData[`${item.field}`]"
                />
              </template>
              <!-- 下拉框 -->
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    >{{ option.label }}</el-option
                  >
                </el-select>
              </template>
              <!-- 日期选择器 -->
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
// 需要引入PropType属性, 对props进行类型断言
import { defineComponent, PropType, computed } from 'vue'
import { IFormItem } from '../types'

export default defineComponent({
  props: {
    // 对应绑定的值
    modelValue: {
      type: Object,
      required: true
    },
    // 元素
    formItems: {
      // 把array断言成PropType, PropType 接收一个泛型
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    // form表单左侧标题宽度
    labelWidth: {
      type: String,
      default: '100px'
    },
    // style设置
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    // 响应式, 随着屏幕的改变而改变
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ['update: modelValue'],
  setup(props, { emit }) {
    const formData = computed({
      get: () => {
        return props.modelValue
      },
      set: (newValue) => {
        emit('update: modelValue', newValue)
      }
    })
    return {
      formData
    }
  }
})
</script>

<style scoped lang="less">
.hy-form {
  padding-top: 22px;
}
</style>
