<template>
  <el-form @submit.prevent="onSubmit" :model="form" label-width="auto" style="height: 50px; overflow: hidden; padding-top: 10px; padding-bottom: 10px;">
    <el-form-item>
      <el-input v-model="form.content" type="textarea" placeholder="请输入消息，按Ctrl + Enter键发送" @keyup.ctrl.enter.prevent="onSubmit" />
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref, reactive } from 'vue';

const emit = defineEmits(['postSuccess'])

const form = reactive({
  user: 'anonymous',
  ajax: true,
  valid_code: '',
  content: '',
})

const onSubmit = () => {
  console.log('submit!', form)
  savePost();
}

async function savePost() {
  try {
    const urlEncodedData = new URLSearchParams({
        user: form.user,
        ajax: form.ajax,
        valid_code: form.valid_code,
        content: form.content
      }).toString();

    const serverResponse = await fetch('index.php?controller=post&action=create', {
      method: 'POST', // Specify the request method as POST
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded' // Specify the content type
      },
      body: urlEncodedData // Convert the data object to a JSON string
    });
    const { response, statusCode } = await serverResponse.json();
    if (statusCode !== 200) {
      alert(response)
    } else {
      form.content = '';
      emit('postSuccess');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
</script>