<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="Default" name="default"><ACPDefault /></el-tab-pane>
    <el-tab-pane label="User" name="users" lazy><ACPUsers /></el-tab-pane>
    <el-tab-pane label="Config" name="config" lazy><ACPConfig /></el-tab-pane>
    <el-tab-pane label="Messages" name="messages" lazy><ACPMessages /></el-tab-pane>
    <el-tab-pane label="Bad IPs" name="badips" lazy><ACPBadIPs /></el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import ACPDefault from './ACPDefault.vue';
import ACPUsers from './ACPUsers.vue';
import ACPConfig from './ACPConfig.vue';
import ACPMessages from './ACPMessages.vue';
import ACPBadIPs from './ACPBadIPs.vue';

const activeName = ref('default')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
