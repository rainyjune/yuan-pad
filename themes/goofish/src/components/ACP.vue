<template>
  <el-tabs v-model="activeName" class="acp-tabs">
    <el-tab-pane label="Overview" name="overview">
      <Overview />
    </el-tab-pane>
    <el-tab-pane label="Posts" name="posts" lazy>
      <Posts :is-active="activeName === 'posts'" />
    </el-tab-pane>
    <el-tab-pane label="Users" name="users">Task</el-tab-pane>
    <el-tab-pane label="Config" name="config">Config</el-tab-pane>
    <el-tab-pane label="IPs" name="ips">Task</el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Overview from './Overview.vue';
import Posts from './Posts.vue';

const activeName = ref<ACPTabName>('overview')
</script>

<style scoped>
.acp-tabs{
  width: 1296px;
  margin: 10px auto;
  min-height: 90vh;
  border-radius: 10px;
  background-color: white;
  padding: 16px;

  .el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
  }
}
</style>