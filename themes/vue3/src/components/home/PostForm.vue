<script setup lang="ts">
import axios from "axios";
import { ref } from 'vue'
defineProps<{
  msg: string,
  items: Array<any>
}>()

const username = ref<string>("");
const message = ref<string>("");
const emit = defineEmits(['posted']);

const onSubmit = () => {
  console.log('message:', message, username)
  axios.post("index.php?controller=post&action=create", {
    user: username.value,
    content: message.value
  }, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then((response) => {
    emit('posted');
    username.value = "";
    message.value = "";
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    
    <p>Username: <input type="text" v-model="username" /></p>
    <span>Content:</span>
    <textarea v-model="message" placeholder="add multiple lines"></textarea>
    <p><input type="submit" /></p>
  </form>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
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
