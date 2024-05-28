import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const items = ref([])
  const count = ref(0)
  const pageSize = ref(2)
  const currentPage = ref(0)
  const keyword = ref('')

  function setItems(data: any) {
    items.value = data
  }

  function setCount(newValue: number) {
    count.value = newValue
  }

  function setKeyword(newKeyword: string) {
    keyword.value = newKeyword
  }

  function setCurrentPage(newPage: number) {
    currentPage.value = newPage
  }

  return {
    items,
    count,
    keyword,
    pageSize,
    currentPage,
    setItems,
    setCount,
    setCurrentPage,
    setKeyword
  }
})
