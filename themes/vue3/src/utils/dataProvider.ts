import axios from 'axios'

export function getPosts({ keyword, currentPage }: { keyword?: string; currentPage?: number }) {
  const url = keyword
    ? `index.php?controller=search`
    : `index.php?controller=post&action=list&page=${currentPage && currentPage > 0 ? currentPage - 1 : 0}`
  const request = keyword
    ? axios.post(
        url,
        {
          s: keyword
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
    : axios.get(url)
  return request
}
