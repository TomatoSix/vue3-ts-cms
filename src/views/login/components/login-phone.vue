<template>
  <div class="box">
    <!-- 创建表单 -->
    <el-form
      ref="formRefP"
      :model="ruleForm"
      :rules="rulesPhone"
      label-width="90px"
    >
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="ruleForm.phone" />
      </el-form-item>
      <el-form-item label="验证码" prop="veriCode">
        <el-input v-model="ruleForm.veriCode" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { rulesPhone } from '../config/account-config'

export default defineComponent({
  setup() {
    const ruleForm = reactive({
      phone: '',
      veriCode: ''
    })

    return { ruleForm, rulesPhone }
  }
})
</script>

<style lang="less" scoped>
.box {
  width: 100%;
}
</style>
