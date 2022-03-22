<template>
  <div class="login">
    <h2>后台管理系统</h2>
    <el-tabs type="border-card" v-model="activeName" stretch>
      <!-- 账号登录 -->
      <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账号登录</span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <!-- 手机登录 -->
      <el-tab-pane name="phone">
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
        </template>
        <login-phone />
      </el-tab-pane>
    </el-tabs>
    <!-- 记住密码 -->
    <div class="remember">
      <el-checkbox v-model="isKeepPSW" label="记住密码"></el-checkbox>
      <el-link href="" :underline="false" type="primary">忘记密码?</el-link>
    </div>
    <div class="bottom">
      <el-button type="primary" @click="handleLogin">登录</el-button>
      <el-button type="primary" @click="handleLogin">注册</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import loginPhone from './login-phone.vue'
import loginAccount from './login-account.vue'

export default defineComponent({
  setup() {
    let activeName = ref('account')
    // 是否记住密码
    const isKeepPSW = ref(false)
    // <InstanceType<typeof loginAccount>> 获得组件loginAccount的类型
    const accountRef = ref<InstanceType<typeof loginAccount>>()

    /**
     * @desc 登录逻辑
     */
    const handleLogin = () => {
      console.log('已登录')
      if (activeName.value === 'account') {
        accountRef.value?.loginAction(isKeepPSW.value)
      } else {
        console.log('手机登录')
      }
    }

    return { activeName, isKeepPSW, handleLogin, accountRef }
  },
  components: {
    loginPhone,
    loginAccount
  }
})
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  width: 40%;

  margin: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .remember {
    width: 300px;
    margin: 20px 0;

    display: flex;
    justify-content: space-between;
  }
  .bottom {
    display: flex;
  }
}
</style>
