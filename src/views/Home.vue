<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <el-button type="primary">确定</el-button>
    <el-button type="warning">确定</el-button>
    <el-button type="danger">确定</el-button>
    <el-button type="info">确定</el-button>
    <el-button type="primary">确定</el-button>
    <ul>
      <li v-for="item in 100" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'Home'

}
</script>
