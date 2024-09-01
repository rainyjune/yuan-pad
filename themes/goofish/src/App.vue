<script setup lang="ts">
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import Main from './components/Main.vue'
import ACP from './components/ACP.vue';
import { ref, watch } from 'vue';

const route = useRoute();
const currentMainComponent = ref("Main");
const components = {
  Main,
  ACP
}

watch(
  () => route.fullPath, // Watch the full URL path
  (newPath, oldPath) => {
    if (route.query?.action === 'control_panel') {
      currentMainComponent.value = "ACP";
    } else {
      currentMainComponent.value = "Main";
    }
  }
);
</script>

<template>
  <Header />

  <component :is="components[currentMainComponent]" />
</template>

<style scoped>

@media (min-width: 1024px) {

}
</style>
