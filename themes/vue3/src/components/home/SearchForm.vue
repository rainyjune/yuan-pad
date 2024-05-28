<script setup lang="ts">
import { ref } from 'vue'
const keyword = ref("")
const emit = defineEmits(['updateKeyword'])
const onSubmit = () => {
  emit('updateKeyword', keyword.value);
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <input type="text" v-model="keyword" /> <input type="submit" />
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
