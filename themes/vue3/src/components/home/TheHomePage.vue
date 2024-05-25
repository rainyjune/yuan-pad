<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import axios from "axios";
import PostList from "./PostList.vue"
import PostForm from "./PostForm.vue"
import SearchForm from "./SearchForm.vue"

const message = ref("hhahaha")
const items = ref([])
const count = ref(0)
const pageSize = ref(2)
const currentPage = ref(0)
const keyword = ref("")

onMounted(() => {
  fetchPosts();
})

function fetchPosts() {
  const url = keyword.value ? `index.php?controller=search` : `index.php?controller=post&action=list&page=${currentPage.value > 0 ? currentPage.value - 1 : 0 }`;
  const request = keyword.value ? axios.post(url, {
    s: keyword.value
  }, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }) : axios.get(url);
  request.then((response) => {
      // Handle the response data
      items.value = response.data?.response?.comments;
      count.value = response.data?.response?.total;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

const handlePosted = () => {
  fetchPosts();
}

function handleCurrentPageChanged(newPageNumber: number) {
  currentPage.value = newPageNumber;
}

function onKeywordUpdated(newKeyword: string) {
  keyword.value = newKeyword;
}

watch(currentPage, fetchPosts)
watch(keyword, fetchPosts)
</script>

<template>
  <SearchForm @updateKeyword="onKeywordUpdated" />
  <PostList :msg="message" :items="items" :count="count" :pageSize="pageSize" @currentPageChanged="handleCurrentPageChanged" />
  <hr />
  <PostForm :msg="message" :items="items" @posted="handlePosted" />
</template>
