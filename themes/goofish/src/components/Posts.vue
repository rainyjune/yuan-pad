<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="ID" width="50">
      <template #default="scope">
        {{ scope.row.id }}
      </template>
    </el-table-column>
    <el-table-column label="Name" width="180">
      <template #default="scope">
        {{ scope.row.b_username ?? scope.row.uname }}
      </template>
    </el-table-column>
    <el-table-column label="Message" width="400">
      <template #default="scope">
        {{ scope.row.post_content }}
      </template>
    </el-table-column>
    <el-table-column label="Date" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon><timer /></el-icon>
          <span style="margin-left: 10px">{{ scope.row.time }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Operations">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
          Edit
        </el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
        >
          Delete
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
const props = defineProps<{
  isActive: boolean
}>();

import { Timer } from '@element-plus/icons-vue'
import { onMounted, ref, watch } from 'vue';
import { getAllPosts } from '../dataProvider';

const handleEdit: PostDataRowFunction = (index, row) => {
  console.log(index, row)
}
const handleDelete: PostDataRowFunction = (index, row) => {
  console.log(index, row)
}

const tableData = ref([]);

const fetchData = async () => {
  try {
    const result = await getAllPosts();
    tableData.value = result.response.comments;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

watch(
  () => props.isActive,
  (newVal) => {
    if (newVal) {
      fetchData();
    }
  }
);

onMounted(() => {
  fetchData();
})
</script>