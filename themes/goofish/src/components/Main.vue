<script setup>
import { onMounted, ref } from 'vue'
import PostForm from './PostForm.vue'

const posts = ref({
  total: 0,
  comments: []
})

async function fetchPosts() {
  try {
    const response = await fetch('index.php?controller=post&action=list');
    const result = await response.json();
    posts.value = result.response;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

onMounted(() => {
  fetchPosts();
})
</script>
<template>
  <main>
    <div class="container flexbox flex-col">
      <div class="post-list flexbox flex-col">
        <div v-if="posts.total === 0" style="text-align: center;">
          <img src="../assets/empty.svg" width="200" />
          <p>暂无消息，请休息会儿吧</p>
        </div>
        <div class="post-item" v-for="{ id, uname, post_content, time, reply_id, reply_content, reply_time, b_username} in posts.comments" :key="id">
          <div class="messagedate">{{ time }}</div>
          <div class="message-row flexbox">
            <div class="message-container flexbox">
              <div class="username">{{ b_username || uname }}</div>
              <div class="messagecontent">{{ post_content }}</div>
            </div>
          </div>
          <template v-if="reply_id">
            <div class="messagedate">{{ reply_time }}</div>
            <div class="message-row flexbox flex-justify-end">
              <div class="message-container reply-container flexbox flex-justify-end">
                <div class="messagecontent">{{ reply_content }}</div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <PostForm @postSuccess="fetchPosts" />
    </div>
  </main>
</template>
<style scoped>
main {
  width: 1296px;
  margin: 0 auto;

  .container {
    max-width: 1090px;
    height: 85vh;
    background: #f5f5f5;
    border-radius: 16px;
    margin: 20px auto;
    padding: 16px;
    overflow: auto;

    .post-list {
      overflow: auto;
      height: calc(100% - 50px);
      gap: 16px;

      .message-container {
        width: 600px;
      }

      .post-item {
        padding: 5px 16px;
        border: 1px solid rgba(0, 0, 0, 0.88);
        border-radius: 10px;
        padding-bottom: 17px;

        .reply-container {
          width: 500px;

          .messagecontent {
            background-color: rgba(255, 230, 15, 0.3);
          }
        }

        .username {
          font-weight: 500;
          font-size: 16px;
          color: rgb(51, 51, 51);
          align-items: center;
          width: 100px;
          cursor: pointer;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .messagecontent {
          font-size: 14px;
          color: rgb(163, 163, 163);
          margin-top: 2px;
          line-height: 1.33333;
          cursor: pointer;
          background-color: white;
          flex: 1;
          padding: 14px;
          border-radius: 14px;
        }

        .messagedate {
          text-align: center;
          font-size: 12px;
          color: rgb(163, 163, 163);
          line-height: 1;
          cursor: pointer;
          margin: 10px auto;
        }

        &:hover {
          background-color: #eee;
        }
      }
    }
  }
}
</style>