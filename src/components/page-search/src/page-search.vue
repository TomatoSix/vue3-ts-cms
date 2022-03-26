<template>
  <div class="page-search">
    <hy-form
      v-bind="searchFormConfig"
      v-model="formData"
      @update:modelValue="modelValueChange"
    >
      <template #header>
        <h2>高级检索</h2>
      </template>
      <template #footer
        ><div class="handle-btns">
          <el-button icon="el-icon-refresh" @click="handleResetClick"
            >重置</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleQueryClick"
            >搜索</el-button
          >
        </div></template
      >
    </hy-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HyForm from '@/base-ui/form'
export default defineComponent({
  components: {
    HyForm
  },
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  emits: ['resetBtnClick', 'queryBtnClick'],

  setup(props, { emit }) {
    // reactive进行双向绑定存在问题
    // 1. 双向绑定的属性应该是由配置文件的field来决定
    const formItems = props.searchFormConfig.formItems ?? []

    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)
    // 就是如下
    // const formData = ref({
    //   name: '',
    //   password: '',
    //   sport: '',
    //   createTime: ''
    // })

    /**
     * @desc 重置按钮
     * @date 2022-03-24
     * @returns {any}
     */
    const handleResetClick = () => {
      // for (const key in formOriginData) {
      //   formData.value[`${key}`] = formOriginData[key]
      // }
      formData.value = formOriginData
      emit('resetBtnClick')
    }

    /**
     * @desc 搜索按钮
     * @date 2022-03-26
     * @returns {any}
     */
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }

    /**
     * @desc 监听数据修改
     * @date 2022-03-26
     * @param {any} data:any
     * @returns {any}
     */
    const modelValueChange = (data: any) => {
      console.log(data, 'data')
    }

    return {
      formData,
      handleResetClick,
      handleQueryClick,
      modelValueChange
    }
  }
})
</script>

<style scoped lang="less">
.header {
  color: red;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
