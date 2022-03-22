<template>
  <div class="login">
    <login-panel></login-panel>
    <el-input v-model="input" placeholder="Please input" />
  </div>
</template>

<script lang="ts">
import loginPanel from './components/login-panel.vue'
import { defineComponent, ref } from '@vue/runtime-core'

export default defineComponent({
  components: { loginPanel },
  setup() {
    let input = ref('')
    return {
      input
    }
  }
})
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  // background: url('@/assets/img/login-bg.svg');
}
</style>
