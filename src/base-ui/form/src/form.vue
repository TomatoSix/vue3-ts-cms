<template>
  <div class="hy-form">
    <!-- header插槽 -->
    <!-- 插槽的使用
      <template #header>
    -->
    <div class="header">
      <slot name="header"></slot>
    </div>
    <!-- 表单 -->
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
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                />
              </template>
              <!-- 下拉框 -->
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
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
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
// 需要引入PropType属性, 对props进行类型断言
import { defineComponent, PropType, ref, watch } from 'vue'
import { IFormItem } from '../types'

export default defineComponent({
  props: {
    // 对应绑定的值
    // modelValue是v-model绑定的属性名称,不能改变
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
  // update:modelValue 叫做更新触发函数, 是modelValue接收的方法
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // 方法一: 采用双向绑定
    // 浅拷贝，生成了一个新的对象放到formData中, modelValue的值修改, formData也会修改
    // const formData = ref({ ...props.modelValue })
    // // 监听formData的修改, 实现双向绑定
    // watch(
    //   formData,
    //   (newValue) => {
    //     emit('update: modelValue', newValue)
    //   },
    //   {
    //     deep: true
    //   }
    // )

    // 方法二, 采用:model-value直接绑定props中的modelValue
    const handleValueChange = function (value: any, field: string) {
      console.log(value, field, '111')

      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }
    return {
      handleValueChange
    }
  }
})
</script>

<style scoped lang="less">
.hy-form {
  padding-top: 22px;
}
</style>
