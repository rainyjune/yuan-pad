<script setup>
import { onMounted, reactive, ref } from "vue";
import Logo from "./Logo.vue"
import LoginModal from "./LoginModal.vue";
const userInfo = ref(null);
const dialogVisible = ref(false)

// Function to fetch data from the remote server
const fetchData = async () => {
  try {
    const response = await fetch('index.php?controller=user&action=getUserInfo');
    const result = await response.json();
    userInfo.value = result.response;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
onMounted(() => {
  fetchData();
})

const handleLoginClick = (e) => {
  dialogVisible.value = true
}
</script>
<template>
  <header>
    <div class="container flexbox flex-justify-between">
      <div class="logo-container">
        <Logo />
      </div>
      <div class="user-container flexbox flex-align-item-center">
        <a v-if="userInfo === null">
          <el-skeleton animated loading style="font-size: 0;">
            <template #template>
              <el-skeleton-item variant="text" width="40px" height="20px" class="custom-skeleton-text" />
            </template>
          </el-skeleton>
        </a>
        <a v-else-if="userInfo.user_type === 'guest'" @click="handleLoginClick">登录</a>
        <a v-else>{{ userInfo.username }}</a>
      </div>
    </div>
  </header>
  <LoginModal :dialogVisible="dialogVisible" @updateVisible="(arg) => dialogVisible = arg" @loginSuccess="fetchData" />
</template>
<style scoped>
header {
  background-color: #333;

  .container {
    width: 1296px;
    margin: 0 auto;

    .logo-container {
      height: 72px;

      .logo {
        height: 100%;
      }
    }

    .user-container {
      padding: 0 20px;
      color: #fff;

      .custom-skeleton-text {
        --el-skeleton-text-width: 40px;
        --el-skeleton-text-height: 20px;
        width: var(--el-skeleton-text-width);
        height: var(--el-skeleton-text-height);
      }
    }
  }
}

@media (min-width: 1024px) {
  header {
  }

  .logo {
  }

  header .container {
  }
}
</style>
