<template>
  <div class="box">
    <!-- 创建表单 -->
    <el-form
      :model="ruleForm"
      :rules="rulesAccount"
      label-width="90px"
      ref="formRef"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { useStore } from 'vuex'

import { defineComponent, reactive, ref } from 'vue'
import { rulesAccount } from '../config/account-config'
import localCache from '@/utils/cache'

export default defineComponent({
  setup() {
    const store = useStore()

    const ruleForm = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })

    // ref<InstanceType<typeof ElForm>> 获取组件ElForm的类型
    const formRef = ref<InstanceType<typeof ElForm>>()

    /**
     * 描述 登录验证逻辑
     */
    const loginAction = (isKeepPSW: boolean) => {
      formRef.value?.validate((valid) => {
        if (!valid) return
        // 登录接口
        console.log(ruleForm.name, ruleForm.password, '11')
        // 判断是否需要记住密码
        if (isKeepPSW) {
          // 本地缓存-localStorage
          localCache.setCache('name', ruleForm.name)
          localCache.setCache('password', ruleForm.password)
        } else {
          localCache.deleteCache('name')
          localCache.deleteCache('password')
        }

        store.dispatch('login/accountLoginAction', { ...ruleForm })
      })
    }

    return { ruleForm, rulesAccount, loginAction, formRef }
  }
})
</script>

<style lang="less" scoped>
.box {
  width: 100%;
}
</style>
