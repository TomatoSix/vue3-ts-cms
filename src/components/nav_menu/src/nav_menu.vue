<template>
  <div class="nav_menu">
    <div class="logo">
      <!-- template使用别名需要加~ -->
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span class="title">Vue3+TS</span>
    </div>
    <!-- 菜单设置 -->
    <el-menu
      :default-active="defaultValue"
      class="el-menu-vertical"
      :collapse="collapse"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <!-- 二级菜单的可以展开的标题 -->
          <el-submenu :index="item.id + ''">
            <template #title>
              <i v-if="item.icon" :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <!-- 遍历里面的item -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuItemClick(subitem)"
              >
                <i v-if="subitem.icon" :class="subitem.icon"></i>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'
import { pathMapToMenu } from '@/utils/map-menus'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    // 获取store
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    // 获取userMenus
    const userMenus = computed(() => {
      return store.state.login.userMenu
    })
    const currentPath = route.path
    const menu = pathMapToMenu(userMenus.value, currentPath)

    // 如何获取defaultValue, 刷新仍然可以对应路由
    // 根据url上的路径匹配menu,获取id
    const defaultValue = ref(menu.id + '')
    // 跳转到对应路由
    const handleMenuItemClick = (item: any) => {
      router.push({
        path: item.url ?? '/not-found'
      })
    }

    return {
      defaultValue,
      userMenus,
      handleMenuItemClick
    }
  }
})
</script>

<style scoped lang="less">
.nav_menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 28px;
    padding: 12px 10px 8px 10px;

    img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 600;
      color: white;
    }
  }
}
</style>
