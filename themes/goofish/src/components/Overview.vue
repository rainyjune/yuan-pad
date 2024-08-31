<template>
  <table>
    <tbody>
      <tr>
        <th>留言数量</th>
        <td>{{ info.commentsTotal }}</td>
      </tr>
      <tr>
        <th>回复数量</th>
        <td>{{ info.repliesTotal }}</td>
      </tr>
      <tr>
        <th>App 版本</th>
        <td>{{ info.appVersion }}</td>
      </tr>
      <tr>
        <th>PHP 版本</th>
        <td>{{ info.phpVersion }}</td>
      </tr>
      <tr>
        <th>GD 库版本</th>
        <td>{{ info.gdVersion }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
import { onMounted, reactive } from 'vue';


const info = reactive({
  appVersion: '',
  commentsTotal: 0,
  repliesTotal: 0,
  phpVersion: '',
  gdVersion: '',
});

const fetchData = async () => {
  try {
    const response = await fetch('index.php?controller=site&action=getSystemInformation');
    const result = await response.json();
    Object.assign(info, result.response)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(() => {
  fetchData()
})
</script>