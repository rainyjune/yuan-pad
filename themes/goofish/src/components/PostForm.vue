<template>
  <el-form @submit.prevent="onSubmit" :model="form" label-width="auto" style="height: 50px; overflow: hidden; padding-top: 10px; padding-bottom: 10px;">
    <el-form-item>
      <el-input v-model="form.content" type="textarea" placeholder="请输入消息，按Ctrl + Enter键发送" @keyup.ctrl.enter.prevent="onSubmit" />
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { createPost } from '../dataProvider';

const emit = defineEmits<{
  postSuccess: []
}>()

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
    const { response, statusCode } = await createPost({
      user: form.user,
      ajax: String(form.ajax),
      valid_code: form.valid_code,
      content: form.content
    });
    if (statusCode !== 200) {
      alert(response);
    } else {
      form.content = '';
      emit('postSuccess');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
</script>