<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { getUserInfo, logoutUser } from "../dataProvider.ts";
import Logo from "./Logo.vue"
import LoginModal from "./LoginModal.vue";
import UpdateModal from "./UpdateModal.vue";
import ProfileImg from "../assets/profile.png";
import LogoutImg from "../assets/logout.png";

const userInfo = ref<null | UserInfo>(null);
const dialogVisible = ref(false)
const updateDialogVisible = ref(false);

const router = useRouter();
const route = useRoute();

// Function to fetch data from the remote server
const fetchData = async () => {
  try {
    const data = await getUserInfo();
    userInfo.value = data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const logout = async () => {
  try {
    await logoutUser();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(() => {
  fetchData();
})

const handleLoginClick = () => {
  dialogVisible.value = true
}

const handleUpdateClick = () => {
  updateDialogVisible.value = true
};

const handleLogoutClick = async () => {
  await logout();
  await fetchData();
}

const handleACPClick = () => {
  router.replace({ query: { action : 'control_panel' } })
}

const goHome = () => {
  router.push({ path: route.path, query: {} });
}
</script>
<template>
  <header>
    <div class="container flexbox flex-justify-between">
      <div class="logo-container">
        <a @click="goHome"><Logo /></a>
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
        <a v-else>
          <el-popover
            placement="bottom"
            :width="100"
            trigger="hover"
          >
            <template #reference>
              {{ userInfo.username }}
            </template>
            <template #default>
              <ul class="user-menu-list">
                <li v-if="userInfo.user_type === 'regular'">
                  <a @click="handleUpdateClick" class="menu flexbox flex-align-item-center">
                    <img :src="ProfileImg" class="icon" />
                    更新用户
                  </a>
                </li>
                <li v-if="userInfo.user_type === 'admin'">
                  <a @click="handleACPClick" class="menu flexbox flex-align-item-center">
                    <img :src="ProfileImg" class="icon" />
                    管理面板
                  </a>
                </li>
                <li>
                  <a @click="handleLogoutClick" class="menu flexbox flex-align-item-center">
                    <img :src="LogoutImg" class="icon" />
                    退出登录
                  </a>
                </li>
              </ul>
            </template>
          </el-popover>
        </a>
      </div>
    </div>
  </header>
  <LoginModal
    :dialog-visible="dialogVisible"
    @update-visible="(arg) => dialogVisible = arg"
    @login-success="fetchData"
  />
  <UpdateModal
    :dialog-visible="updateDialogVisible"
    :user-data="userInfo"
    @update-visible="(arg) => updateDialogVisible = arg"
    @update-success="fetchData"
  />
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

.user-menu-list {
  padding: 0;

  .menu {
    height: 36px;

    .icon {
      object-fit: contain;
      width: 20px;
      height: 20px;
      margin-right: 6px;
      margin-left: 8px;
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
