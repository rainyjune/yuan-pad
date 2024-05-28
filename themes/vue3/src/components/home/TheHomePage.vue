<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { getPosts } from '../../utils/dataProvider'
import PostList from "./PostList.vue"
import PostForm from "./PostForm.vue"
import SearchForm from "./SearchForm.vue"
import { useCounterStore } from '../../stores/posts'
import { storeToRefs } from 'pinia'

const store = useCounterStore()
const { items, count, keyword, pageSize, currentPage } = storeToRefs(store)
const { setItems, setCount, setCurrentPage, setKeyword } = store

onMounted(() => {
  fetchPosts();
})

async function fetchPosts() {
  try {
    const response = await getPosts({
      keyword: keyword.value,
      currentPage: currentPage.value
    });
    setItems(response.data?.response?.comments)
    setCount(response.data?.response?.total);
  } catch(e) {
    debugger;
  }
}

const handlePosted = () => {
  fetchPosts();
}

function handleCurrentPageChanged(newPageNumber: number) {
  setCurrentPage(newPageNumber)
}

function onKeywordUpdated(newKeyword: string) {
  setKeyword(newKeyword)
}

watch(currentPage, fetchPosts)
watch(keyword, fetchPosts)
</script>

<template>
  <SearchForm @updateKeyword="onKeywordUpdated" />
  <PostList :items="items" :count="count" :pageSize="pageSize" @currentPageChanged="handleCurrentPageChanged" />
  <hr />
  <PostForm :items="items" @posted="handlePosted" />
</template>
