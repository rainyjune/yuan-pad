<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { updateUser } from '../dataProvider';
import IconFishSmile from './icons/IconFishSmile.vue';
import IconFishQuestion from './icons/IconFishQuestion.vue';

const props = defineProps<{
  dialogVisible: boolean;
  userData: UserData | null
}>()

const form = reactive({
  uid: props.userData?.uid ?? '',
  user: props.userData?.username ?? '',
  email: props.userData?.email ?? '',
  pwd: ''
});

const localVisible = ref(props.dialogVisible)
const hasError = ref(false)

const emit = defineEmits<{
  updateVisible: [visible: boolean];
  updateSuccess: [];
}>()

watch(() => props.dialogVisible, (newVal) => {
  localVisible.value = newVal;
});

watch(() => props.userData, (newVal) => {
  if (newVal) {
    form.uid = newVal.uid;
    form.user = newVal.username;
    form.email = newVal.email;
  }
});

const postLoginData = async () => {
  try {
    const { response, statusCode } = updateUser(Object.fromEntries(
      Object.entries(form).map(([key, value]) => [key, String(value)])
    ));
    if (statusCode !== 200) {
      hasError.value = true;
      alert(response);
    } else {
      hasError.value = false;
      localVisible.value = false;
      emit('updateSuccess')
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const onSubmit = () => {
  postLoginData();
}

const onCloseDialog = () => {
  emit('updateVisible', false);
  form.pwd = '';
}
</script>
<template>
  <el-dialog
    v-model="localVisible"
    width="500"
    @close="onCloseDialog"
  >
    <template #header>
      <div class="my-header">
        <div v-if="hasError" class="fish-tip-container">
          <IconFishQuestion />
        </div>
        <div v-else class="fish-tip-container">
          <IconFishSmile />
        </div>
      </div>
    </template>
    
    <div class="login-form-container">
      <el-form :model="form" label-width="auto" style="max-width: 600px">
        <el-form-item label="用户名">
          <el-input v-model="form.user" readonly />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.pwd" type="password" placeholder="请输入登录密码" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" type="text" placeholder="请输入Email" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">更新</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<style scoped>
.fish-tip-container {
  width: 200px;
  height: 200px;
  position: absolute;
  left: 5px;
  bottom: -52px;
}

.login-form-container {
  z-index: 999;
}

.my-header {
  position: relative;
  min-height: 14px;
}
</style>