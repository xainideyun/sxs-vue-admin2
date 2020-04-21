<template>
  <div class="layout">
    <el-button type="primary" @click="handleLogout">退出</el-button>
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Layout',
  methods: {
    ...mapActions('user', ['logout']),
    handleLogout() {
      this.logout().then(() => {
        this.$router.push({ name: 'login', query: { redirect: this.$route.path } })
      })
    }
  }
}
</script>

<style>
</style>
