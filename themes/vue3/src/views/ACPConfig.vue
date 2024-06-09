<template>
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="Board name">
      <el-input v-model="form.board_name" />
    </el-form-item>
    <el-form-item label="Close site">
      <el-radio-group v-model="form.site_close">
        <el-radio value='0'>No</el-radio>
        <el-radio value='1'>Yes</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Close reason">
      <el-input v-model="form.close_reason" />
    </el-form-item>
    <el-form-item label="Admin Email">
      <el-input v-model="form.admin_email" />
    </el-form-item>
    <el-form-item label="Copyright Infor">
      <el-input v-model="form.copyright_info" />
    </el-form-item>
    <el-form-item label="Filter words">
      <el-input v-model="form.filter_words" />
    </el-form-item>
    <el-form-item label="Enable Captcha">
      <el-radio-group v-model="form.valid_code_open">
        <el-radio value='0'>No</el-radio>
        <el-radio value='1'>Yes</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Enable Pagination">
      <el-radio-group v-model="form.page_on">
        <el-radio value='0'>No</el-radio>
        <el-radio value='1'>Yes</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Numer of page">
      <el-input v-model="form.num_perpage" />
    </el-form-item>
    <el-form-item label="Activity zone">
      <el-select v-model="form.theme" placeholder="please select your theme">
        <el-option label="joys" value="joys" />
        <el-option label="spa" value="spa" />
        <el-option label="vue3" value="vue3" />
      </el-select>
    </el-form-item>
    <el-form-item label="Admin Password">
      <el-input v-model="form.admin" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item label="Language">
      <el-select v-model="form.lang" placeholder="please select your language">
        <el-option label="en" value="en" />
        <el-option label="zh" value="zh" />
      </el-select>
    </el-form-item>
    <el-form-item label="Timezone">
      <el-select v-model="form.timezone" placeholder="please select your timezone">
        <el-option label="8" value="8" />
        <el-option label="9" value="9" />
      </el-select>
    </el-form-item>
    <el-form-item label="Filter HTML tags">
      <el-radio-group v-model="form.filter_type">
        <el-radio value='1'>Strip disallowed tags</el-radio>
        <el-radio value='2'>Escape all tags</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Allowed tags">
      <el-input v-model="form.allowed_tags" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { getConfigAll, updateConfig } from '../utils/dataProvider';

const form = ref({
  "board_name": "",
  "site_close": 0,
  "close_reason": "",
  "admin_email": "",
  "copyright_info": "",
  "filter_words": "",
  "valid_code_open": 0,
  "page_on": 0,
  "num_perpage": 10,
  "theme": "spa",
  "admin": "root",
  "lang": "en",
  "timezone": 8,
  "filter_type": 1,
  "allowed_tags": ""
});

async function fetchConfig() {
  try {
    const response = await getConfigAll();
    //form
    console.log(`response.data?.response: `, response.data?.response)
    form.value = (response.data?.response)
    //form.value.site_close = parseInt(response.data?.response?.site_close)
  } catch(e) {
    debugger;
  }
}

onMounted(() => {
  fetchConfig();
});

const onSubmit = () => {
  debugger;
  console.log('submit!')
  updateConfig({
    board_name: form.value.board_name,
    site_close: Number(form.value.site_close),
    close_reason: form.value.close_reason,
    admin_email: form.value.admin_email,
    copyright_info: form.value.copyright_info,
    filter_words: form.value.filter_words,
    valid_code_open: Number(form.value.valid_code_open),
    page_on: Number(form.value.page_on),
    num_perpage: Number(form.value.num_perpage),
    theme: form.value.theme,
    timezone: form.value.timezone,
    lang: form.value.lang,
    password: form.value.admin,
    filter_type: form.value.filter_type,
    allowed_tags: form.value.allowed_tags
  })
  alert('Saved')
}
</script>