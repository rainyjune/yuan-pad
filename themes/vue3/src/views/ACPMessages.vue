<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { getAllPosts } from '../utils/dataProvider'
const props = defineProps<{}>()

const items = ref([]);

onMounted(() => {
  fetchPosts();
});

async function fetchPosts() {
  try {
    const response = await getAllPosts();
    items.value = (response.data?.response?.comments)
  } catch(e) {
    debugger;
  }
}
</script>

<template>
  <div class="greetings">
    <div v-for="item in items" class="post">
      <div><span class="author">{{ Number(item.uid) ? item.b_username : item.uname }}</span> said:</div>
      <div>{{ item.post_content }}</div>
      <div>{{ item.time }}</div>
      <div v-if="item.reply_id" class="reply">Admin replied: {{ item.reply_content }} at {{ item.reply_time }}</div>
    </div>
  </div>
</template>

<style scoped>
.reply {
  border: 1px solid green;
  margin-top: 1rem;
  margin-left: 3rem;
}
.post {
  border: 1px solid black;
  padding: .5rem 1rem;
}

.post .author {
  font-weight: bold;
}
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
