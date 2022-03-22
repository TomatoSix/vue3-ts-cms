<template>
  <div class="app">
    <router-link to="/login"></router-link>
    <router-link to="/main"></router-link>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>
